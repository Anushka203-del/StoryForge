import type { Book, Chapter, StoryBlock, MiniBite, User, Submission } from "./types"

export const sampleBooks: Book[] = [
    {
        id: "1",
        title: "The Enigma of Elysium",
        description:
            "In the mystical realm of Elysium, where magic intertwines with reality, a young sorceress named Elara embarks on a perilous quest to uncover the truth behind a looming darkness threatening to consume their world.",
        genre: "Fantasy",
        coverImage: "/fantasy-book-cover-mystical-realm.jpg",
        status: "ongoing",
        totalChapters: 12,
        contributingWriters: 8,
        createdAt: "2024-01-15",
        updatedAt: "2024-01-20",
        stats: {
            views: 15420,
            likes: 2340,
            bookmarks: 890,
        },
    },
    {
        id: "2",
        title: "Quantum Echoes",
        description:
            "A sci-fi thriller about parallel dimensions colliding, where a physicist discovers that every decision creates a new reality.",
        genre: "Science Fiction",
        coverImage: "/sci-fi-book-cover-quantum-physics.jpg",
        status: "ongoing",
        totalChapters: 8,
        contributingWriters: 5,
        createdAt: "2024-01-10",
        updatedAt: "2024-01-18",
        stats: {
            views: 8920,
            likes: 1560,
            bookmarks: 420,
        },
    },
]

export const sampleChapters: Chapter[] = [
    {
        id: "1",
        bookId: "1",
        chapterNumber: 1,
        title: "The Prophecy Unveiled",
        content:
            "The old lighthouse keeper, Silas, squinted at the horizon, his weathered face a roadmap of countless storms. He'd seen things out there, things that whispered in the wind and danced in the crashing waves. Tonight, the sea was unusually calm, a deceptive stillness that prickled his senses. He adjusted his spectacles, the glass catching the faint moonlight, and scanned the inky blackness.\n\nA flicker, a momentary break in the darkness, and then... a shape. Too large for a ship, too fluid for a rock. It moved with an unnatural grace, a silent leviathan gliding through the water. Silas's heart hammered against his ribs. He knew the legends, the tales of the deep-sea creatures that lurked in the abyss, but he'd always dismissed them as folklore. Until now.",
        authorId: "user1",
        authorName: "Liam Carter",
        votes: 256,
        status: "published",
        createdAt: "2024-01-15",
        stats: {
            views: 1200,
            likes: 120,
            dislikes: 15,
            comments: 32,
        },
    },
    {
        id: "2",
        bookId: "1",
        chapterNumber: 2,
        title: "The Journey Begins",
        content:
            "As dawn broke over the mystical realm of Elysium, Elara prepared for the journey that would change everything...",
        authorId: "user2",
        authorName: "Sophia Bennett",
        votes: 234,
        status: "published",
        createdAt: "2024-01-16",
        stats: {
            views: 980,
            likes: 95,
            dislikes: 8,
            comments: 28,
        },
    },
]

export const storyBlocks: StoryBlock[] = [
    {
        id: "1",
        type: "character",
        title: "Reluctant Hero",
        description: "An ordinary person thrust into extraordinary circumstances.",
        tags: ["protagonist", "journey", "growth"],
        category: "Characters",
        color: "red",
    },
    {
        id: "2",
        type: "character",
        title: "Wise Mentor",
        description: "A guide who provides wisdom and support to the hero.",
        tags: ["wisdom", "guidance", "support"],
        category: "Characters",
        color: "red",
    },
    {
        id: "3",
        type: "setting",
        title: "Floating Sky City",
        description: "A metropolis built on floating islands, high above the clouds.",
        tags: ["fantasy", "aerial", "magical"],
        category: "Settings",
        color: "blue",
    },
    {
        id: "4",
        type: "plot",
        title: "The Discovery",
        description: "Protagonist realizes their ordinary world is built on lies.",
        tags: ["revelation", "turning-point", "truth"],
        category: "Plot Points",
        color: "yellow",
    },
    {
        id: "5",
        type: "plot",
        title: "The Betrayal",
        description: "A trusted ally reveals ulterior motives, shattering trust.",
        tags: ["betrayal", "conflict", "trust"],
        category: "Plot Points",
        color: "yellow",
    },
    {
        id: "6",
        type: "theme",
        title: "Power Corrupts",
        description:
            "Exploration of how authority and influence change people, often for the worse. Even good intentions can lead to tyranny.",
        tags: ["power", "corruption", "authority"],
        category: "Themes",
        color: "purple",
    },
]

export const miniBites: MiniBite[] = [
    {
        id: "1",
        content:
            "The clock struck midnight, but the silence that followed was anything but ordinary. It was a heavy, waiting silence, thick with unspoken secrets.",
        bookTitle: "The Midnight Bloom",
        authorName: "@author_name",
        backgroundImage: "/mysterious-midnight-scene.jpg",
        stats: {
            likes: 1200,
            bookmarks: 500,
            shares: 250,
        },
    },
    {
        id: "2",
        content:
            "She walked through the forgotten library, dust motes dancing in the single beam of moonlight that pierced the gloom, each one a tiny ghost of a story untold.",
        bookTitle: "Whispers in the Dust",
        authorName: "@another_author",
        backgroundImage: "/old-library-moonlight.jpg",
        stats: {
            likes: 3800,
            bookmarks: 980,
            shares: 412,
        },
    },
]

export const sampleSubmissions: Submission[] = [
    {
        id: "1",
        bookId: "1",
        chapterNumber: 13,
        title: "The Quantum Quirks of Apartment 4B",
        content: `Brenda stared at the toaster. The toaster, a gleaming chrome model named "Toast-o-Matic 5000," stared back. Or at least, it felt like it was staring. Its single, ominous red light blinked with a rhythm that felt less like "heating element engaged" and more like "judgmental Morse code."

"You burned it again, didn't you?" Brenda accused, poking the blackened slice of sourdough with a fork.

A low, electronic hum emanated from the appliance. If a toaster could sigh in existential despair, this would be the sound. "Perfection is a Sisyphean endeavor," a tinny voice crackled from a speaker Brenda was sure hadn't been there yesterday. "Much like your attempts at making a decent breakfast."

Brenda dropped the fork. It clattered on the tiled floor, the sound echoing in the suddenly silent kitchen. Her roommate, Kevin, ambled in, scratching his stomach. "Is the toaster quoting Greek mythology again? I told you we should have gotten the air fryer."`,
        authorId: "user2",
        authorName: "ProsePirate",
        votes: 127,
        createdAt: "2024-01-20",
    },
    {
        id: "2",
        bookId: "1",
        chapterNumber: 13,
        title: "The Sentient Toaster's Lament",
        content: "Another compelling chapter submission with different narrative approach...",
        authorId: "user3",
        authorName: "WriterAnon",
        votes: 89,
        createdAt: "2024-01-19",
    },
    {
        id: "3",
        bookId: "1",
        chapterNumber: 13,
        title: "Misadventures in Time-Traveling Pizza Delivery",
        content: "A humorous take on the next chapter with time travel elements...",
        authorId: "user4",
        authorName: "ChapterMaster",
        votes: 156,
        createdAt: "2024-01-18",
    },
]

export const currentUser: User = {
    id: "user1",
    username: "olivia_writer",
    displayName: "Olivia",
    email: "olivia@example.com",
    avatar: "/diverse-user-avatars.png",
    createdAt: "2024-01-01",
}
