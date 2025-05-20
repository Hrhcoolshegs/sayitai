// src/WaitlistForm.tsx
import React, { useState } from 'react'
import { addToWaitlist } from './supabase'

export default function WaitlistForm() {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!email) {
            setMessage('Please enter an email address')
            setIsSuccess(false)
            return
        }

        setIsLoading(true)
        setMessage('')

        const result = await addToWaitlist(email)

        if (result.success) {
            setMessage(result.message)
            setIsSuccess(true)
            setEmail('')
        } else {
            setMessage(result.error)
            setIsSuccess(false)
        }

        setIsLoading(false)
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Join Our Waitlist</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={isLoading}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Adding...' : 'Join Waitlist'}
                </button>
            </form>

            {message && (
                <div className={`mt-4 p-3 rounded-md ${
                    isSuccess 
                        ? 'bg-green-100 text-green-800 border border-green-200' 
                        : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                    {message}
                </div>
            )}
        </div>
    )
}