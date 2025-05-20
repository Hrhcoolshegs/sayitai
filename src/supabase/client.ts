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
  },
  global: {
    headers: {
      'x-application-name': 'say-it',
      'x-application-version': '1.0.0'
    }
  }
});

// Rate limiting helper
const rateLimiter = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 5;

const isRateLimited = (email: string): boolean => {
  const now = Date.now();
  const userRequests = rateLimiter.get(email) || 0;
  
  if (userRequests >= MAX_REQUESTS) {
    return true;
  }
  
  rateLimiter.set(email, userRequests + 1);
  setTimeout(() => rateLimiter.delete(email), RATE_LIMIT_WINDOW);
  
  return false;
};

export const addEmailToWaitlist = async (email: string) => {
  try {
    // Input validation
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return { success: false, error: 'Invalid email format' };
    }

    // Rate limiting
    if (isRateLimited(email)) {
      return { success: false, error: 'Too many attempts. Please try again later.' };
    }

    // Sanitize input
    const sanitizedEmail = email.toLowerCase().trim();

    const { data, error } = await supabase
      .from('waitlist')
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
      error: error.message || 'Failed to join waitlist. Please try again.' 
    };
  }
};

export const getWaitlistCount = async () => {
  try {
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;
    return { success: true, count };
  } catch (error: any) {
    console.error('Error getting waitlist count:', error);
    return { 
      success: false, 
      count: 0,
      error: error.message || 'Failed to get waitlist count' 
    };
  }
};