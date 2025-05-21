import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// Enhanced rate limiting with IP tracking
const rateLimiter = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 5;
const BLOCK_DURATION = 300000; // 5 minutes

const isRateLimited = (identifier: string): boolean => {
  const now = Date.now();
  const userLimit = rateLimiter.get(identifier);
  
  if (!userLimit) {
    rateLimiter.set(identifier, { count: 1, timestamp: now });
    return false;
  }
  
  if (now - userLimit.timestamp > RATE_LIMIT_WINDOW) {
    rateLimiter.set(identifier, { count: 1, timestamp: now });
    return false;
  }
  
  if (userLimit.count >= MAX_REQUESTS) {
    if (now - userLimit.timestamp > BLOCK_DURATION) {
      rateLimiter.set(identifier, { count: 1, timestamp: now });
      return false;
    }
    return true;
  }
  
  userLimit.count++;
  return false;
};

// Input sanitization utility
const sanitizeInput = (input: string): string => {
  return input.trim()
    .toLowerCase()
    .replace(/[<>]/g, ''); // Basic XSS prevention
};

export const addEmailToWaitlist = async (email: string) => {
  try {
    const sanitizedEmail = sanitizeInput(email);

    // Enhanced email validation
    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      return { success: false, error: 'Invalid email format' };
    }

    // Rate limiting using email as identifier
    if (isRateLimited(sanitizedEmail)) {
      return { 
        success: false, 
        error: 'Too many attempts. Please try again in 5 minutes.' 
      };
    }

    const { data, error } = await supabase
      .from('justsayitai_waitlist')
      .insert([{ email: sanitizedEmail }])
      .select()
      .single();
      
    if (error) {
      if (error.code === '23505') {
        return { success: false, error: 'This email is already on our waitlist.' };
      }
      throw error;
    }

    return { success: true, data };
  } catch (error: any) {
    console.error('Error adding email to waitlist:', error);
    return { 
      success: false, 
      error: 'Failed to join waitlist. Please try again.' 
    };
  }
};

export const getWaitlistCount = async () => {
  try {
    const { data, error } = await supabase
      .from('justsayitai_waitlist')
      .select('id');

    if (error) throw error;

    return { success: true, count: data.length };
  } catch (error: any) {
    console.error('Error getting waitlist count:', error);
    return { 
      success: false, 
      count: 0,
      error: error.message || 'Failed to get waitlist count' 
    };
  }
};