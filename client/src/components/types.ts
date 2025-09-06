// app/types.ts

export interface StoryBlock {
    id: string;
    title: string;
    description: string;
    tags: string[];
    color: string;
}

export interface SavedCombination {
    id: string;
    name: string;
    blocks: string[];
    description: string;
    lastModified: string;
    rating: number;
}

export interface Abstract {
    id: number;
    title: string;
    description: string;
}

export interface GeneratedChapter {
    id: string;
    title: string;
    content: string;
    wordCount: number;
    estimatedReadTime: string;
    basedOnBlocks: string[];
}

export interface CurrentUser {
    id: number;
    username: string;
    role: string;
    points: number;
    streak: number;
    reputation: number;
    avatar: string;
}

export interface AppData {
    currentUser: CurrentUser;
    storyBlocks: {
        characters: StoryBlock[];
        settings: StoryBlock[];
        plotPoints: StoryBlock[];
        conflicts: StoryBlock[];
        themes: StoryBlock[];
    };
    savedCombinations: SavedCombination[];
    abstracts: Abstract[];
    generatedChapters: GeneratedChapter[];
}
