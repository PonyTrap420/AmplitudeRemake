'use server'

import { z } from 'zod';
import { prisma } from '@/lib/prisma'
import argon2 from 'argon2';
import rateLimit from '@/lib/ratelimit';
import { headers } from 'next/headers';
import { createSession } from '@/lib/session';

const registerUserSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    username: z.string().min(2, { message: 'Username must be at least 2 characters long' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    dateOfBirth: z.date({ required_error: 'Date of birth is required' }),
    displayName: z.string().min(2, { message: 'Username must be at least 2 characters long' }).optional(),
  });

  export async function registerUser(userData: { email: string; username: string; password: string; dateOfBirth: Date; displayName?: string }) {
    try {
      
      const ip = headers().get("x-forwarded-for") ?? "unknown";
      const isRateLimited = rateLimit(ip);
      
      if (!isRateLimited) {
        return { errors: { general: "rate limited"} };
      }

    // Validate the input data using Zod
    const validatedData = registerUserSchema.parse(userData);

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email: validatedData.email } });
    if (existingUser) {
      return { errors: { email: 'Email already in use' } };
    }

    // Hash the password using Argon2
    const hashedPassword = await argon2.hash(validatedData.password);

    // Create the user in the database
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        username: validatedData.username,
        password: hashedPassword,
        dateOfBirth: validatedData.dateOfBirth,
        ...(validatedData.displayName && { displayName: validatedData.displayName }),
    },
    });
    
    await createSession(user.id)

    return { user };
  } catch (error) {
    // Check if it's a Zod validation error
    if (error instanceof z.ZodError) {
      // Return field-specific validation errors
      const errors = error.errors.reduce((acc: Record<string, string>, err) => {
        acc[err.path[0]] = err.message;
        return acc;
      }, {});

      return { errors };
    }

    console.error('Error registering user:', error);
    return { errors: { email: 'Something went wrong. Try again.' } };
  }
}