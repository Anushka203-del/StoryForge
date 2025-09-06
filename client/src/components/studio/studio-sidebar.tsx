"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  Layers,
  FlaskConical,
  Save,
  Settings
} from "lucide-react"

type Tab = {
  id: string
  icon: keyof typeof iconMap
  label: string
}

const iconMap = {
  dashboard: <LayoutDashboard size={20} />,
  layers: <Layers size={20} />,
  biotech: <FlaskConical size={20} />, // using flask as biotech
  save: <Save size={20} />,
}


export function StudioSidebar() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const tabs: Tab[] = [
    { id: "dashboard", icon: "dashboard", label: "Dashboard" },
    { id: "blocks", icon: "layers", label: "Blocks" },
    { id: "canvas", icon: "biotech", label: "Canvas" },
    { id: "saved", icon: "save", label: "Saved" },
  ]

  return (
    <aside className="w-20 bg-black/50 flex flex-col items-center py-6 space-y-8 z-20 border-r border-border">
      <div className="text-3xl font-bold text-primary">CS</div>

      <nav className="flex flex-col items-center space-y-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`p-3 rounded-lg transition-colors duration-200 group relative ${activeTab === tab.id
                ? "bg-secondary text-primary"
                : "text-muted-foreground hover:bg-secondary hover:text-primary"
              }`}
          >
            {iconMap[tab.icon]}
            <span className="absolute left-full ml-4 w-max px-2 py-1 bg-black/80 text-white text-xs rounded-md invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300">
              {tab.label}
            </span>
          </button>
        ))}
      </nav>

      <div className="mt-auto">
        <button className="p-3 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors duration-200">
          <Settings size={20} />
        </button>
      </div>
    </aside>
  )
}
