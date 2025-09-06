import { Button } from "@/components/ui/button"
import type { StoryBlock } from "@/lib/types"

interface StoryPreviewProps {
  selectedBlocks: StoryBlock[]
}

export function StoryPreview({ selectedBlocks }: StoryPreviewProps) {
  const estimatedWordCount = selectedBlocks.length * 200
  const estimatedReadingTime = Math.ceil(estimatedWordCount / 200)

  const getBlockTypeColor = (blockType: string) => {
    const colorMap: Record<string, string> = {
      characters: "text-blue-400",
      settings: "text-purple-400",
      "plot-points": "text-yellow-400",
      conflicts: "text-red-400",
      themes: "text-orange-400",
      custom: "text-gray-400"
    }
    return colorMap[blockType] || colorMap.custom
  }

  return (
    <aside className="w-96 bg-card p-6 flex flex-col space-y-4 border-l border-border">
      <div className="flex items-center space-x-2">
        <Button className="flex-1 bg-primary hover:bg-primary/90">Preview</Button>
        <Button variant="outline" className="flex-1 bg-transparent">
          Saved
        </Button>
      </div>

      <div className="bg-background rounded-lg p-6 flex-1 flex flex-col">
        <h3 className="text-3xl font-semibold text-foreground tracking-wide mb-4">Story Preview</h3>

        <div className="text-muted-foreground space-y-6 text-base leading-relaxed flex-1 overflow-y-auto">
          {selectedBlocks.length === 0 ? (
            <p className="text-center py-8">Add story blocks to see your narrative preview here.</p>
          ) : (
            selectedBlocks.map((block, index) => (
              <div key={block._id || index}>
                <p>
                  <strong
                    className={`font-semibold block text-lg ${getBlockTypeColor(block.block_type)}`}
                  >
                    {block.block_type.charAt(0).toUpperCase() + block.block_type.slice(1)}: {block.title}
                  </strong>
                  {block.block_text}
                </p>
              </div>
            ))
          )}

          {selectedBlocks.length > 0 && (
            <p className="text-sm text-muted-foreground italic">
              This combination creates a compelling narrative structure ready for chapter generation.
            </p>
          )}
        </div>

        <div className="mt-6 border-t border-border pt-4">
          <h4 className="text-2xl font-semibold text-foreground mb-3">Metrics</h4>
          <div className="flex justify-between items-center text-muted-foreground">
            <span className="text-sm">Projected Word Count:</span>
            <span className="font-bold text-xl text-foreground tracking-wider">
              ~{estimatedWordCount.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center text-muted-foreground mt-2">
            <span className="text-sm">Est. Reading Time:</span>
            <span className="font-bold text-xl text-foreground tracking-wider">~{estimatedReadingTime} MIN</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
