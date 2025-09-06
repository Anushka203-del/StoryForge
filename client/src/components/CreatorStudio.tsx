"use client";

import React, { useState, useEffect } from "react";
import appData from "../data/appData"; // Extract your appData object from app.js into a TS/JS file
import { StoryBlock, SavedCombination } from "./types"; // define interfaces for clarity

export default function CreatorStudio() {
    const [canvasBlocks, setCanvasBlocks] = useState<StoryBlock[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedCategories, setExpandedCategories] = useState<string[]>([
        "characters",
        "settings",
        "plotPoints",
        "conflicts",
        "themes",
    ]);
    const [previewText, setPreviewText] = useState("");
    const [savedCombinations, setSavedCombinations] = useState<SavedCombination[]>(appData.savedCombinations);

    // Toggle expand/collapse
    const toggleCategory = (category: string) => {
        setExpandedCategories((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
        );
    };

    // Drag + Drop
    const onDragStart = (block: StoryBlock) => (e: React.DragEvent) => {
        e.dataTransfer.setData("blockId", block.id);
    };

    const onDrop = (e: React.DragEvent) => {
        const blockId = e.dataTransfer.getData("blockId");
        const block = findBlockById(blockId);
        if (block) setCanvasBlocks((prev) => [...prev, block]);
    };

    const findBlockById = (id: string) => {
        return Object.values(appData.storyBlocks)
            .flat()
            .find((b) => b.id === id);
    };

    // Generate Chapter (demo)
    const generateChapter = () => {
        if (!canvasBlocks.length) return;
        const titles = canvasBlocks.map((b) => b.title).join(", ");
        setPreviewText(`Generated Chapter using: ${titles}`);
    };

    return (
        <div className="flex h-screen bg-[var(--bg-primary)] text-white">
            {/* Sidebar (icons only) */}
            <aside className="w-20 bg-black/50 flex flex-col items-center py-6 space-y-8 z-20">
                <div className="font-display text-3xl font-bold text-[var(--accent)]">CS</div>
                <nav className="flex flex-col items-center space-y-6">
                    {["dashboard", "layers", "biotech", "save"].map((icon, i) => (
                        <button
                            key={i}
                            className="p-3 bg-[var(--bg-tertiary)] rounded-lg text-[var(--accent)]"
                        >
                            <span className="material-symbols-outlined">{icon}</span>
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Layout */}
            <main className="flex flex-1 overflow-hidden">
                {/* Story Blocks Library */}
                <aside className="w-96 bg-[var(--bg-secondary)] p-6 flex flex-col border-r border-gray-800">
                    <h2 className="font-display text-4xl font-semibold">Story Blocks</h2>
                    <input
                        type="text"
                        placeholder="Search blocks..."
                        className="w-full bg-[var(--bg-tertiary)] mt-4 rounded-lg py-2 px-3"
                        onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                    />
                    <div className="flex-1 overflow-y-auto mt-4 space-y-4">
                        {Object.entries(appData.storyBlocks).map(([category, blocks]) => (
                            <div key={category}>
                                <button
                                    onClick={() => toggleCategory(category)}
                                    className="w-full flex justify-between items-center p-3 rounded-lg bg-[var(--bg-tertiary)]"
                                >
                                    <span className="capitalize">{category}</span>
                                    <span className="material-symbols-outlined">
                                        {expandedCategories.includes(category) ? "expand_less" : "expand_more"}
                                    </span>
                                </button>
                                {expandedCategories.includes(category) && (
                                    <div className="mt-2 space-y-2">
                                        {blocks
                                            .filter((b) => b.title.toLowerCase().includes(searchQuery))
                                            .map((block) => (
                                                <div
                                                    key={block.id}
                                                    className="bg-[var(--bg-tertiary)] p-3 rounded-lg border-l-4 cursor-grab"
                                                    draggable
                                                    onDragStart={onDragStart(block)}
                                                    style={{ borderColor: block.color }}
                                                >
                                                    <h3 className="font-bold" style={{ color: block.color }}>
                                                        {block.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-400">{block.description}</p>
                                                </div>
                                            ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Story Canvas */}
                <section className="flex-1 bg-[var(--bg-primary)] p-6 flex flex-col">
                    <div className="flex justify-between mb-4">
                        <h2 className="font-display text-4xl">Story Canvas</h2>
                        <div className="flex space-x-2">
                            <button className="btn-secondary" onClick={() => setCanvasBlocks([])}>
                                Clear All
                            </button>
                            <button className="btn-primary" onClick={generateChapter}>
                                Generate Chapter
                            </button>
                        </div>
                    </div>
                    <div
                        className="flex-1 border-2 border-dashed border-gray-800 rounded-lg p-4 canvas-bg"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={onDrop}
                    >
                        {!canvasBlocks.length ? (
                            <p className="text-gray-500">Drag story blocks here…</p>
                        ) : (
                            <div className="space-y-4">
                                {canvasBlocks.map((b, i) => (
                                    <div
                                        key={i}
                                        className="bg-black/40 border rounded-lg p-3"
                                        style={{ borderColor: b.color }}
                                    >
                                        <h3 style={{ color: b.color }}>{b.title}</h3>
                                        <p className="text-sm text-gray-300">{b.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {previewText && (
                        <div className="mt-4 bg-[var(--bg-tertiary)] p-4 rounded-lg">
                            <h3 className="font-bold text-[var(--accent)]">Preview</h3>
                            <p>{previewText}</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
