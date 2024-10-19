const IP_RATE_LIMIT = new Map<string, { count: number; timestamp: number }>();

// Define rate limit options
const RATE_LIMIT_WINDOW_MS = 10 * 1000; // 10 seconds
const MAX_REQUESTS = 10; // Max 5 requests per window

export default function rateLimit(reqIP:string|undefined) {
  const ip = reqIP ?? '127.0.0.1';
  const currentTime = Date.now();

  if (!IP_RATE_LIMIT.has(ip)) {
    // First request from the IP
    IP_RATE_LIMIT.set(ip, { count: 1, timestamp: currentTime });
    return true;
  }

  const { count, timestamp } = IP_RATE_LIMIT.get(ip)!;

  // If current time exceeds the window, reset the counter and timestamp
  if (currentTime - timestamp > RATE_LIMIT_WINDOW_MS) {
    IP_RATE_LIMIT.set(ip, { count: 1, timestamp: currentTime });
    return true;
  }

  // Increment the request count
  if (count < MAX_REQUESTS) {
    IP_RATE_LIMIT.set(ip, { count: count + 1, timestamp });
    return true;
  }

  // If the request count exceeds the max limit
  return false;
}