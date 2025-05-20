// src/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export async function addToWaitlist(email: string) {
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format')
        }

        const { data, error } = await supabase
            .from('waitlist')
            .insert([{ email }])
            .select()

        if (error) {
            if (error.code === '23505') {
                throw new Error('This email is already on the waitlist')
            }
            if (error.code === '42501') {
                throw new Error('Access denied. Please check your database permissions.')
            }
            throw new Error(`Database error: ${error.message}`)
        }

        return {
            success: true,
            data: data?.[0],
            message: 'Successfully added to waitlist!'
        }
    } catch (error) {
        console.error('Error adding email to waitlist:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        }
    }
}

export default supabase