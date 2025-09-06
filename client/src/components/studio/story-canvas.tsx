// components/studio/story-canvas.tsx
"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { api } from "@/lib/api"
import type { StoryBlock, GenerationResult } from "@/lib/types"
import {
  Grid,
  X,
  Wand2,
  Copy,
  Download,
  Loader2,
  RotateCcw,
  Plus
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"

interface StoryCanvasProps {
  selectedBlocks: StoryBlock[]
  onRemoveBlock: (blockId: string) => void
  onClearAll: () => void
  showGrid: boolean
  onToggleGrid: () => void
}

export function StoryCanvas({
  selectedBlocks,
  onRemoveBlock,
  onClearAll,
  showGrid,
  onToggleGrid
}: StoryCanvasProps) {
  const [bookId, setBookId] = useState("")
  const [generatedText, setGeneratedText] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [customPrompt, setCustomPrompt] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleGenerate = async () => {
    if (!bookId.trim()) {
      toast.error('Please enter a Book ID')
      return
    }

    if (selectedBlocks.length === 0) {
      toast.error('Please select at least one story block')
      return
    }

    try {
      setIsGenerating(true)
      const blockIds = selectedBlocks.map(block => block._id)
      const customBlocks = customPrompt ? [{
        title: "Custom Instructions",
        block_text: customPrompt,
        tags: [] as string[],
        block_type: "custom" as const
      }] : []

      const response = await api.generateChapterSegment({
        bookId,
        blockIds,
        customBlocks,
        textSoFar: generatedText
      })

      setGeneratedText(response.data.fullText)
      toast.success('Chapter segment generated successfully')
    } catch (error) {
      toast.error('Failed to generate chapter segment')
      console.error('Error generating chapter:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleContinueGeneration = async () => {
    if (!generatedText.trim()) {
      toast.error('No text to continue from')
      return
    }

    await handleGenerate()
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedText)
      toast.success('Text copied to clipboard')
    } catch (error) {
      toast.error('Failed to copy text')
    }
  }

  const downloadText = () => {
    const blob = new Blob([generatedText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `chapter-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const resetGeneration = () => {
    setGeneratedText("")
    setCustomPrompt("")
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-950">
      {/* Header */}
      <div className="border-b border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-white">Story Canvas</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleGrid}
              className="border-gray-700 text-gray-300"
            >
              <Grid className="h-4 w-4 mr-2" />
              {showGrid ? 'Hide Grid' : 'Show Grid'}
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Input
              placeholder="Enter Book ID"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              className="w-48 bg-gray-800 border-gray-700 text-white"
            />

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-white">Generate Chapter Segment</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Configure your AI generation settings
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      Selected Story Blocks ({selectedBlocks.length})
                    </label>
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 bg-gray-800 rounded">
                      {selectedBlocks.map((block) => (
                        <Badge key={block._id} variant="secondary" className="bg-gray-700 text-gray-200">
                          {block.title}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      Custom Instructions (Optional)
                    </label>
                    <Textarea
                      placeholder="Add any specific instructions for the AI..."
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      rows={3}
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleGenerate} disabled={isGenerating}>
                    {isGenerating && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    Generate
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {selectedBlocks.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClearAll}
                className="border-gray-700 text-gray-300"
              >
                Clear All
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Canvas Area */}
        <div className="flex-1 relative p-6">
          {showGrid && (
            <div className="absolute inset-0 opacity-20">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage: 'radial-gradient(circle, #374151 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}
              />
            </div>
          )}

          {/* Selected Blocks Display */}
          {selectedBlocks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
              {selectedBlocks.map((block) => (
                <div
                  key={block._id}
                  className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-white truncate">{block.title}</h3>
                    <button
                      onClick={() => onRemoveBlock(block._id)}
                      className="text-gray-400 hover:text-red-400 transition-colors ml-2"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="text-sm text-gray-300 mb-3 line-clamp-3">
                    {block.block_text}
                  </p>

                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="border-gray-600 text-gray-400">
                      {block.block_type.replace('-', ' ')}
                    </Badge>

                    {block.tags.length > 0 && (
                      <div className="flex gap-1">
                        {block.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} className="text-xs bg-gray-700 text-gray-300">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center">
                  <Plus className="h-8 w-8" />
                </div>
                <p className="text-lg font-medium mb-2">Drag story blocks here</p>
                <p className="text-sm">Build your experimental narrative by adding story elements</p>
              </div>
            </div>
          )}
        </div>

        {/* Generation Output Panel */}
        {generatedText && (
          <div className="w-96 bg-gray-900 border-l border-gray-800 flex flex-col">
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-white">Generated Content</h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={downloadText}>
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={resetGeneration}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {generatedText}
                </p>
              </div>
            </div>

            <div className="p-4 border-t border-gray-800">
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={handleContinueGeneration}
                disabled={isGenerating}
              >
                {isGenerating && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Continue Generation
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
