export interface User {
    id: string
    username: string
    displayName: string
    email: string
    avatar?: string
    createdAt: string
}

export interface Book {
    id: string
    title: string
    description: string
    genre: string
    coverImage: string
    status: "ongoing" | "completed" | "hiatus"
    totalChapters: number
    contributingWriters: number
    createdAt: string
    updatedAt: string
    stats: {
        views: number
        likes: number
        bookmarks: number
    }
}

export interface Chapter {
    id: string
    bookId: string
    chapterNumber: number
    title: string
    content: string
    authorId: string
    authorName: string
    votes: number
    status: "published" | "voting" | "draft"
    createdAt: string
    stats: {
        views: number
        likes: number
        dislikes: number
        comments: number
    }
}

export interface StoryBlock {
    _id: string;
    author_id: string;
    title: string;
    block_text: string;
    tags: string[];
    block_type: 'characters' | 'settings' | 'plot-points' | 'conflicts' | 'themes' | 'custom';
    created_at: string;
    // Frontend-only properties for canvas
    id?: string;
    category?: string;
    description?: string;
    color?: string;
    position?: { x: number; y: number };
    connections?: string[];
}

export interface Submission {
    id: string
    bookId: string
    chapterNumber: number
    title: string
    content: string
    authorId: string
    authorName: string
    votes: number
    createdAt: string
}

export interface MiniBite {
    id: string
    content: string
    bookTitle: string
    authorName: string
    backgroundImage: string
    stats: {
        likes: number
        bookmarks: number
        shares: number
    }
}

export interface GenerationResult {
    newChunk: string;
    fullText: string;
}

export interface ApiResponse<T> {
    statusCode: number;
    data: T;
    message: string;
    success: boolean;
}
