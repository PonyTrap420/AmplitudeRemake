import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { put } from "@vercel/blob";

// Directory where files will be saved locally if Blob Storage is not configured
const uploadDir = path.join(process.cwd(), "public/uploads");

// Ensure uploaded file is an image
const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

export async function POST(req: NextRequest) {
    try {
        // Ensure content type is multipart/form-data
        if (!req.headers.get("content-type")?.includes("multipart/form-data")) {
            return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
        }

        // Parse form data
        const formData = await req.formData();
        const files = formData.getAll("files") as File[];

        if (!files.length) {
            return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
        }

        // Store file URLs to return
        const fileUrls: string[] = [];

        for (const file of files) {
            if (!allowedMimeTypes.includes(file.type)) {
                return NextResponse.json({ error: "Only images are allowed!" }, { status: 400 });
            }

            if (file.size > MAX_FILE_SIZE) {
                return NextResponse.json({ error: "File size must not exceed 2MB!" }, { status: 400 });
            }

            const fileExtension = path.extname(file.name);
            const uniqueFilename = `${randomUUID()}${fileExtension}`;

            if (process.env.BLOB_READ_WRITE_TOKEN) {
                // Use Vercel Blob Storage
                const blob = await put(uniqueFilename, file, {
                    access: "public",
                    addRandomSuffix: false, // We're already using UUID
                });
                fileUrls.push(blob.url);
            } else {
                // Fallback to local storage
                const filePath = path.join(uploadDir, uniqueFilename);
                const fileBuffer = Buffer.from(await file.arrayBuffer());
                await writeFile(filePath, fileBuffer);
                fileUrls.push(`/uploads/${uniqueFilename}`);
            }
        }

        return NextResponse.json({
            message: "Files uploaded successfully",
            fileUrls,
        });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Error uploading files" }, { status: 500 });
    }
}
