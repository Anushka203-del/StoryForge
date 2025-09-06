// hooks/useAuth.ts
import { useState, useEffect } from 'react'

interface User {
    _id: string
    display_name: string
    username: string
    email: string
    level: number
    coins: number
}

export function useAuth() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            // Verify token and fetch user info
            fetchUser()
        } else {
            setLoading(false)
        }
    }, [])

    const fetchUser = async () => {
        try {
            // Implement user fetch logic
            setLoading(false)
        } catch (error) {
            localStorage.removeItem('token')
            setLoading(false)
        }
    }

    const login = (token: string, userData: User) => {
        localStorage.setItem('token', token)
        setUser(userData)
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    return { user, loading, login, logout }
}
