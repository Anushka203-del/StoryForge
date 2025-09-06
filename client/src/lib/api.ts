// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

class ApiClient {
    private getAuthToken(): string | null {
        return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGJiYThiMWYxMDk0MGNjYWNmZjhiYTQiLCJkaXNwbGF5X25hbWUiOiJLcmlzaG5hIEFnZ2Fyd2FsIiwidXNlcm5hbWUiOiJrcmlzaG5hLjAxMjM0NSIsImVtYWlsIjoia3Jpc2huYWFnZ2Fyd2FsMzM1QGdtYWlsLmNvbSIsIndhbGxldF9hZGRyZXNzIjoiMHgxMjMiLCJpYXQiOjE3NTcxMjg5NTEsImV4cCI6MTc1NzIxNTM1MX0.YJWBPoAZxmYp7BAfmtk-GhrFxBY8EupvE6zH4k0izLw"
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('token') || sessionStorage.getItem('token');
    }

    private async request(endpoint: string, options: RequestInit = {}) {
        const token = this.getAuthToken();

        const config: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

            // Handle authentication errors
            if (response.status === 401) {
                this.clearAuthToken();
                throw new Error('Authentication failed. Please login again.');
            }

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            return response.json();
        } catch (error) {
            if (error instanceof TypeError && error.message.includes('fetch')) {
                throw new Error('Network error. Please check your connection.');
            }
            throw error;
        }
    }

    private clearAuthToken() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            // Optionally redirect to login
            window.location.href = '/login';
        }
    }

    // Auth methods
    setAuthToken(token: string, persistent: boolean = true) {
        if (typeof window !== 'undefined') {
            const storage = persistent ? localStorage : sessionStorage;
            storage.setItem('token', token);
        }
    }

    clearAuth() {
        this.clearAuthToken();
    }

    isAuthenticated(): boolean {
        return !!this.getAuthToken();
    }

    // Story Blocks API
    async getAllBlocks() {
        return this.request('/creator-studio/get-all-blocks');
    }

    async addBlock(blockData: {
        title: string;
        block_text: string;
        tags: string[];
        block_type: 'characters' | 'settings' | 'plot-points' | 'conflicts' | 'themes' | 'custom';
    }) {
        return this.request('/creator-studio/add-block', {
            method: 'POST',
            body: JSON.stringify(blockData),
        });
    }

    async generateChapterSegment(data: {
        bookId: string;
        blockIds?: string[];
        customBlocks?: {
            title: string;
            block_text: string;
            tags: string[];
            block_type: 'characters' | 'settings' | 'plot-points' | 'conflicts' | 'themes' | 'custom';
        }[];
        textSoFar?: string;
    }) {
        return this.request('/creator-studio/generate-chapter-segment', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
}

export const api = new ApiClient();
