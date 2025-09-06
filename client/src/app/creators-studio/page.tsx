// app/studio/page.tsx
"use client"

import { useState, useEffect } from "react"
import { StoryBlocksSidebar } from "@/components/studio/story-blocks-sidebar"
import { StoryCanvas } from "@/components/studio/story-canvas"
import { StoryPreview } from "@/components/studio/story-preview"
import type { StoryBlock } from "@/lib/types"
import { Toaster } from "sonner"

export default function StudioPage() {
    const [selectedBlocks, setSelectedBlocks] = useState<StoryBlock[]>([])
    const [showGrid, setShowGrid] = useState(true)

    // Check authentication
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            // Redirect to login or show authentication modal
            console.warn('No authentication token found')
        }
    }, [])

    const addBlock = (block: StoryBlock) => {
        setSelectedBlocks(prev => {
            // If block exists, don't add duplicate
            if (prev.some(b => b._id === block._id)) {
                return prev
            }
            // Add new block
            return [...prev, block]
        })
    }

    const removeBlock = (blockId: string) => {
        setSelectedBlocks(prev => prev.filter(block => block._id !== blockId))
    }

    const clearAll = () => {
        setSelectedBlocks([])
    }

    return (
        <>
            <div className="h-screen flex bg-gray-950">
                <StoryBlocksSidebar onAddBlock={addBlock} />
                <StoryCanvas
                    selectedBlocks={selectedBlocks}
                    onRemoveBlock={removeBlock}
                    onClearAll={clearAll}
                    showGrid={showGrid}
                    onToggleGrid={() => setShowGrid(!showGrid)}
                />
                <StoryPreview selectedBlocks={selectedBlocks} />
            </div>
            <Toaster theme="dark" />
        </>
    )
}
