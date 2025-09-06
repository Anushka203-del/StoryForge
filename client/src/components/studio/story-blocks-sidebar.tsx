// components/studio/story-blocks-sidebar.tsx
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { api } from "@/lib/api"
import type { StoryBlock } from "@/lib/types"
import { Search, Plus, ChevronUp, ChevronDown, X, Loader2, GripVertical } from "lucide-react"
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

interface StoryBlocksSidebarProps {
  onAddBlock: (block: StoryBlock) => void
}

export function StoryBlocksSidebar({ onAddBlock }: StoryBlocksSidebarProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedCategories, setExpandedCategories] = useState(["characters", "plot-points", "themes"])
  const [storyBlocks, setStoryBlocks] = useState<StoryBlock[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [creating, setCreating] = useState(false)

  // New block form state
  type BlockType = "characters" | "settings" | "plot-points" | "conflicts" | "themes" | "custom";
  const [newBlock, setNewBlock] = useState({
    title: "",
    block_text: "",
    tags: "",
    block_type: "characters" as BlockType
  })

  useEffect(() => {
    loadStoryBlocks()
  }, [])

  const loadStoryBlocks = async () => {
    try {
      setLoading(true)
      const response = await api.getAllBlocks()
      setStoryBlocks(response.data)
    } catch (error) {
      toast.error('Failed to load story blocks')
      console.error('Error loading story blocks:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateBlock = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newBlock.title.trim() || !newBlock.block_text.trim()) {
      toast.error('Title and description are required')
      return
    }

    try {
      setCreating(true)
      const blockData = {
        ...newBlock,
        tags: newBlock.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      }

      await api.addBlock(blockData)
      toast.success('Story block created successfully')

      // Reset form
      setNewBlock({
        title: "",
        block_text: "",
        tags: "",
        block_type: "characters"
      })
      setIsDialogOpen(false)

      // Reload blocks
      loadStoryBlocks()
    } catch (error) {
      toast.error('Failed to create story block')
      console.error('Error creating story block:', error)
    } finally {
      setCreating(false)
    }
  }

  const categories = Array.from(new Set(storyBlocks.map((block) => block.block_type)))

  const filteredBlocks = storyBlocks.filter(
    (block) =>
      block.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      block.block_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      block.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    )
  }

  const getColorClasses = (blockType: string) => {
    const colorMap = {
      characters: "border-blue-500 bg-blue-900/30 text-blue-300",
      settings: "border-purple-500 bg-purple-900/30 text-purple-300",
      "plot-points": "border-yellow-500 bg-yellow-900/30 text-yellow-300",
      conflicts: "border-red-500 bg-red-900/30 text-red-300",
      themes: "border-orange-500 bg-orange-900/30 text-orange-300",
      custom: "border-gray-500 bg-gray-900/30 text-gray-300"
    }
    return colorMap[blockType as keyof typeof colorMap] || colorMap.custom
  }

  const getCategoryIcon = (category: string) => {
    const iconMap = {
      characters: "👥",
      settings: "🏰",
      "plot-points": "📝",
      conflicts: "⚔️",
      themes: "🎭",
      custom: "📑"
    }
    return iconMap[category as keyof typeof iconMap] || "📑"
  }

  const handleDragStart = (e: React.DragEvent, block: StoryBlock) => {
    const transferBlock = {
      ...block,
      position: { x: 0, y: 0 } // Initial position will be set by canvas
    }
    e.dataTransfer.setData('application/json', JSON.stringify(transferBlock))
    e.dataTransfer.effectAllowed = 'copy'
  }

  if (loading) {
    return (
      <div className="w-80 bg-gray-900 border-r border-gray-800 p-6 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    )
  }

  return (
    <div className="w-80 bg-gray-900 border-r border-gray-800 flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Story Blocks</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Block
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-700">
              <DialogHeader>
                <DialogTitle className="text-white">Create Story Block</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Add a new element to your story collection
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateBlock} className="space-y-4">
                <div>
                  <Input
                    placeholder="Block title"
                    value={newBlock.title}
                    onChange={(e) => setNewBlock(prev => ({ ...prev, title: e.target.value }))}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Select
                    onValueChange={(value: BlockType) => setNewBlock(prev => ({ ...prev, block_type: value }))}
                  // onValueChange={(value: string) => setNewBlock(prev => ({ ...prev, block_type: value }))}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="characters">Characters</SelectItem>
                      <SelectItem value="settings">Settings</SelectItem>
                      <SelectItem value="plot-points">Plot Points</SelectItem>
                      <SelectItem value="conflicts">Conflicts</SelectItem>
                      <SelectItem value="themes">Themes</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Textarea
                    placeholder="Block description"
                    value={newBlock.block_text}
                    onChange={(e) => setNewBlock(prev => ({ ...prev, block_text: e.target.value }))}
                    className="bg-gray-800 border-gray-700 text-white min-h-20"
                  />
                </div>
                <div>
                  <Input
                    placeholder="Tags (comma separated)"
                    value={newBlock.tags}
                    onChange={(e) => setNewBlock(prev => ({ ...prev, tags: e.target.value }))}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={creating}>
                    {creating && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    Create Block
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search blocks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700 text-white"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {categories.map((category) => {
          const categoryBlocks = filteredBlocks.filter((block) => block.block_type === category)
          if (categoryBlocks.length === 0) return null

          return (
            <div key={category} className="space-y-2">
              <button
                onClick={() => toggleCategory(category)}
                className="flex items-center justify-between w-full text-left text-gray-300 hover:text-white transition-colors"
              >
                <span className="flex items-center gap-2 font-medium">
                  <span>{getCategoryIcon(category)}</span>
                  <span className="capitalize">{category.replace('-', ' ')}</span>
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded-full">
                    {categoryBlocks.length}
                  </span>
                </span>
                {expandedCategories.includes(category) ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>

              {expandedCategories.includes(category) && (
                <div className="space-y-2 ml-6">
                  {categoryBlocks.map((block) => (
                    <div
                      key={block._id}
                      className={`p-3 rounded-lg border cursor-pointer hover:bg-opacity-50 transition-all ${getColorClasses(block.block_type)}`}
                      onClick={() => onAddBlock(block)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium truncate">{block.title}</h4>
                        <Plus className="h-4 w-4 flex-shrink-0 ml-2" />
                      </div>
                      <p className="text-sm opacity-80 line-clamp-2">
                        {block.block_text}
                      </p>
                      {block.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {block.tags.slice(0, 3).map((tag, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs bg-gray-700 text-gray-300"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {block.tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                              +{block.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}

        {filteredBlocks.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            <p>No story blocks found</p>
            {searchTerm && (
              <p className="text-sm mt-2">Try adjusting your search terms</p>
            )}
          </div>
        )}
      </div>

      {filteredBlocks.length > 0 && (
        <div className="p-6 border-t border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-4">All Blocks</h3>
          {filteredBlocks.map((block) => (
            <div
              key={block._id}
              draggable
              onDragStart={(e) => handleDragStart(e, block)}
              className="flex items-center gap-2 p-3 hover:bg-gray-800 cursor-grab active:cursor-grabbing"
            >
              <GripVertical className="w-4 h-4 text-gray-500" />
              <div className={`flex-1 p-2 rounded-md ${getColorClasses(block.block_type)}`}>
                <h3 className="font-medium">{block.title}</h3>
                <p className="text-sm text-gray-400 truncate">{block.block_text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
