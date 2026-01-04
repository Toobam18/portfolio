'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Command, ArrowRight, X } from 'lucide-react'
import { commands, type CommandItem } from '@/lib/commands'

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.name.toLowerCase().includes(search.toLowerCase()) ||
      cmd.keywords?.some((k) => k.toLowerCase().includes(search.toLowerCase()))
  )

  const executeCommand = useCallback((command: CommandItem) => {
    setIsOpen(false)
    setSearch('')
    setSelectedIndex(0)

    if (command.action) {
      command.action()
    } else if (command.href) {
      if (command.href.startsWith('#')) {
        const element = document.getElementById(command.href.slice(1))
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        window.open(command.href, '_blank')
      }
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open command palette with Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
        return
      }

      if (!isOpen) return

      // Close with Escape
      if (e.key === 'Escape') {
        setIsOpen(false)
        setSearch('')
        setSelectedIndex(0)
        return
      }

      // Navigate with arrow keys
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : 0
        )
        return
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredCommands.length - 1
        )
        return
      }

      // Execute with Enter
      if (e.key === 'Enter') {
        e.preventDefault()
        if (filteredCommands[selectedIndex]) {
          executeCommand(filteredCommands[selectedIndex])
        }
        return
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filteredCommands, selectedIndex, executeCommand])

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0)
  }, [search])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setIsOpen(false)
              setSearch('')
            }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg mx-4 z-[101]"
          >
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-200 dark:border-zinc-800">
                <Search className="w-5 h-5 text-zinc-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search commands..."
                  className="flex-1 bg-transparent text-zinc-900 dark:text-white placeholder-zinc-400 outline-none"
                />
                <button
                  onClick={() => {
                    setIsOpen(false)
                    setSearch('')
                  }}
                  className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <X className="w-4 h-4 text-zinc-400" />
                </button>
              </div>

              {/* Commands List */}
              <div className="max-h-80 overflow-y-auto py-2">
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((command, index) => (
                    <button
                      key={command.id}
                      onClick={() => executeCommand(command)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                        index === selectedIndex
                          ? 'bg-primary-50 dark:bg-primary-900/20'
                          : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          index === selectedIndex
                            ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                        }`}
                      >
                        <command.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-zinc-900 dark:text-white">
                          {command.name}
                        </div>
                        {command.description && (
                          <div className="text-sm text-zinc-500 dark:text-zinc-400">
                            {command.description}
                          </div>
                        )}
                      </div>
                      {index === selectedIndex && (
                        <ArrowRight className="w-4 h-4 text-primary-500" />
                      )}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-zinc-500 dark:text-zinc-400">
                    No commands found for &quot;{search}&quot;
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-2 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-700 rounded text-[10px]">
                      ↑↓
                    </kbd>
                    Navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-700 rounded text-[10px]">
                      ↵
                    </kbd>
                    Select
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-700 rounded text-[10px]">
                      esc
                    </kbd>
                    Close
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-zinc-400">
                  <Command className="w-3 h-3" />
                  <span>Command Palette</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

