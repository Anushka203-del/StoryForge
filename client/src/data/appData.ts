// app/data/appData.ts
import { AppData } from "../components/types";

const appData: AppData = {
    currentUser: {
        id: 2,
        username: "StoryMaster",
        role: "writer",
        points: 890,
        streak: 8,
        reputation: 0,
        avatar: "✍️",
    },
    storyBlocks: {
        characters: [
            {
                id: "char_1",
                title: "The Reluctant Hero",
                description:
                    "A character who never wanted adventure but finds themselves at the center of world-changing events. Often an ordinary person thrust into extraordinary circumstances.",
                tags: ["protagonist", "reluctant", "everyman"],
                color: "#4F46E5",
            },
            {
                id: "char_2",
                title: "The Wise Mentor",
                description:
                    "An experienced guide who possesses crucial knowledge but harbors dark secrets from their past. May sacrifice themselves for the hero's growth.",
                tags: ["mentor", "wise", "mysterious"],
                color: "#4F46E5",
            },
            {
                id: "char_3",
                title: "The Shapeshifter",
                description:
                    "A character whose loyalties and nature change throughout the story. Could be an ally who becomes an enemy or vice versa.",
                tags: ["unpredictable", "complex", "dynamic"],
                color: "#4F46E5",
            },
            {
                id: "char_4",
                title: "The Innocent",
                description:
                    "A pure-hearted character who sees good in everyone and everything. Their unwavering faith often saves the day in unexpected ways.",
                tags: ["pure", "optimistic", "naive"],
                color: "#4F46E5",
            },
            {
                id: "char_5",
                title: "The System Rebel",
                description:
                    "Someone who fights against established order and authority. Questions everything and refuses to accept the status quo.",
                tags: ["rebellious", "independent", "fighter"],
                color: "#4F46E5",
            },
        ],
        settings: [
            {
                id: "set_1",
                title: "Underground Sanctuary",
                description:
                    "A hidden refuge beneath the city where forbidden knowledge or outlawed people find safety from the surface world's oppression.",
                tags: ["hidden", "sanctuary", "underground"],
                color: "#10B981",
            },
            {
                id: "set_2",
                title: "Floating Sky City",
                description:
                    "A magnificent metropolis suspended among the clouds, accessible only by airship or ancient magic. Home to advanced civilization.",
                tags: ["aerial", "advanced", "isolated"],
                color: "#10B981",
            },
            {
                id: "set_3",
                title: "Time-Locked Library",
                description:
                    "An ancient library where time moves differently. Books write themselves, and visitors can witness history unfold through living texts.",
                tags: ["temporal", "mystical", "knowledge"],
                color: "#10B981",
            },
            {
                id: "set_4",
                title: "Digital Realm",
                description:
                    "A virtual world with its own physics and rules. Reality bends to code, and consciousness can exist in pure data form.",
                tags: ["virtual", "technological", "malleable"],
                color: "#10B981",
            },
            {
                id: "set_5",
                title: "Abandoned Space Station",
                description:
                    "A derelict orbital facility drifting in the void. Contains forgotten technology and the echoes of its vanished crew.",
                tags: ["space", "abandoned", "mysterious"],
                color: "#10B981",
            },
        ],
        plotPoints: [
            {
                id: "plot_1",
                title: "The Discovery",
                description:
                    "The moment when the protagonist realizes their ordinary world is built on extraordinary lies. Everything they believed is questioned.",
                tags: ["revelation", "turning-point", "awakening"],
                color: "#F59E0B",
            },
            {
                id: "plot_2",
                title: "The Betrayal",
                description:
                    "A trusted ally reveals their true nature or ulterior motives. The protagonist's faith in others is shattered.",
                tags: ["betrayal", "shock", "trust-broken"],
                color: "#F59E0B",
            },
            {
                id: "plot_3",
                title: "The Sacrifice",
                description:
                    "A character gives up something precious - love, power, life itself - to achieve a greater good or save others.",
                tags: ["sacrifice", "noble", "loss"],
                color: "#F59E0B",
            },
            {
                id: "plot_4",
                title: "The Hidden Truth",
                description:
                    "A long-buried secret is revealed that changes the entire understanding of the conflict and characters' motivations.",
                tags: ["secret", "revelation", "game-changer"],
                color: "#F59E0B",
            },
            {
                id: "plot_5",
                title: "The Final Stand",
                description:
                    "The last chance to save everything. Heroes must use all they've learned and risk everything in one climactic confrontation.",
                tags: ["climax", "final-battle", "all-or-nothing"],
                color: "#F59E0B",
            },
        ],
        conflicts: [
            {
                id: "conf_1",
                title: "Humanity vs. Technology",
                description:
                    "The struggle between human nature and artificial intelligence or advanced technology that threatens to replace or control humanity.",
                tags: ["technology", "ai", "humanity"],
                color: "#EF4444",
            },
            {
                id: "conf_2",
                title: "Tradition vs. Innovation",
                description:
                    "Old ways clash with new ideas. Conservative forces resist change while progressives push for advancement.",
                tags: ["change", "tradition", "progress"],
                color: "#EF4444",
            },
            {
                id: "conf_3",
                title: "Individual vs. Society",
                description:
                    "Personal freedom and desires conflict with collective good and social expectations. What's right for one vs. many.",
                tags: ["freedom", "society", "collective"],
                color: "#EF4444",
            },
            {
                id: "conf_4",
                title: "Nature vs. Nurture",
                description:
                    "Are we defined by our born nature or shaped by our experiences? Genetic destiny versus learned behavior.",
                tags: ["identity", "genetics", "environment"],
                color: "#EF4444",
            },
            {
                id: "conf_5",
                title: "Order vs. Chaos",
                description:
                    "Structured civilization struggles against unpredictable forces that threaten stability and known ways of life.",
                tags: ["order", "chaos", "stability"],
                color: "#EF4444",
            },
        ],
        themes: [
            {
                id: "theme_1",
                title: "Power Corrupts",
                description:
                    "Exploration of how authority and influence change people, often for the worse. Even good intentions can lead to tyranny.",
                tags: ["power", "corruption", "authority"],
                color: "#8B5CF6",
            },
            {
                id: "theme_2",
                title: "Redemption Through Love",
                description:
                    "The transformative power of genuine connection and compassion. Love as the force that can save even the most lost souls.",
                tags: ["love", "redemption", "transformation"],
                color: "#8B5CF6",
            },
            {
                id: "theme_3",
                title: "Knowledge vs. Ignorance",
                description:
                    "The burden and blessing of knowing truth. Sometimes ignorance is bliss, but knowledge brings both power and responsibility.",
                tags: ["knowledge", "truth", "responsibility"],
                color: "#8B5CF6",
            },
            {
                id: "theme_4",
                title: "Identity Crisis",
                description:
                    "Characters questioning who they really are. The search for authentic self in a world of expectations and illusions.",
                tags: ["identity", "authenticity", "self-discovery"],
                color: "#8B5CF6",
            },
            {
                id: "theme_5",
                title: "Hope Against Despair",
                description:
                    "Maintaining faith and optimism in the face of overwhelming darkness. The light that shines brightest in the deepest night.",
                tags: ["hope", "perseverance", "faith"],
                color: "#8B5CF6",
            },
        ],
    },
    savedCombinations: [
        {
            id: "combo_1",
            name: "Digital Awakening",
            blocks: ["char_1", "set_4", "plot_1", "conf_1", "theme_3"],
            description: "Reluctant hero discovers the digital realm and questions reality",
            lastModified: "2024-08-29",
            rating: 4.5,
        },
        {
            id: "combo_2",
            name: "Underground Rebellion",
            blocks: ["char_5", "set_1", "plot_2", "conf_3", "theme_1"],
            description: "System rebel leads resistance from hidden sanctuary",
            lastModified: "2024-08-28",
            rating: 4.2,
        },
    ],
    abstracts: [
        {
            id: 1,
            title: "The Last Library",
            description:
                "In a world where books are forbidden, one librarian guards humanity's final collection of stories.",
        },
        {
            id: 2,
            title: "Digital Dreams",
            description:
                "A programmer discovers their code can alter reality, but each change comes with unexpected consequences.",
        },
    ],
    generatedChapters: [
        {
            id: "gen_1",
            title: "The Awakening Protocol",
            content:
                "Maya stared at the lines of code flickering across her screen, unaware that each keystroke was rewriting the fabric of reality itself...",
            wordCount: 156,
            estimatedReadTime: "1 min",
            basedOnBlocks: ["char_1", "set_4", "plot_1", "conf_1", "theme_3"],
        },
    ],
};

export default appData;
