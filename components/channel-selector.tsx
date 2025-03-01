"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

type Channel = {
  id: string
  name: string
  // Add other channel properties as needed
}

export function ChannelSelector({ channels }: { channels: Channel[] }) {
  const [selectedChannels, setSelectedChannels] = useState<string[]>([])
  const [open, setOpen] = useState(false)

  const toggleChannel = (channelId: string) => {
    setSelectedChannels((current) =>
      current.includes(channelId) ? current.filter((id) => id !== channelId) : [...current, channelId],
    )
  }

  const handleSelectAll = () => {
    if (selectedChannels.length === channels.length) {
      setSelectedChannels([])
    } else {
      setSelectedChannels(channels.map((channel) => channel.id))
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between">
              {selectedChannels.length > 0
                ? `${selectedChannels.length} channel${selectedChannels.length > 1 ? "s" : ""} selected`
                : "Select channels"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <Command>
              <CommandInput placeholder="Search channels..." />
              <CommandList>
                <CommandEmpty>No channels found.</CommandEmpty>
                <CommandGroup>
                  <div className="px-2 py-1.5 border-b">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="select-all"
                        checked={selectedChannels.length === channels.length && channels.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                      <label
                        htmlFor="select-all"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {selectedChannels.length === channels.length && channels.length > 0
                          ? "Deselect all"
                          : "Select all"}
                      </label>
                    </div>
                  </div>
                  {channels.map((channel) => (
                    <CommandItem
                      key={channel.id}
                      onSelect={() => toggleChannel(channel.id)}
                      className="flex items-center space-x-2 px-2 py-1.5"
                    >
                      <Checkbox
                        id={`channel-${channel.id}`}
                        checked={selectedChannels.includes(channel.id)}
                        onCheckedChange={() => toggleChannel(channel.id)}
                      />
                      <label htmlFor={`channel-${channel.id}`} className="flex-1 text-sm">
                        {channel.name}
                      </label>
                      {selectedChannels.includes(channel.id) && <Check className="h-4 w-4 ml-auto" />}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {selectedChannels.length > 0 && (
          <Button variant="ghost" size="sm" onClick={() => setSelectedChannels([])}>
            Clear
          </Button>
        )}
      </div>

      {/* Display selected channels */}
      <div className="flex flex-wrap gap-2 mb-4">
        {selectedChannels.map((id) => {
          const channel = channels.find((c) => c.id === id)
          return channel ? (
            <Badge key={id} variant="secondary" className="px-3 py-1">
              {channel.name}
            </Badge>
          ) : null
        })}
      </div>

      {/* Display channel content */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {channels
          .filter((channel) => selectedChannels.includes(channel.id))
          .map((channel) => (
            <Card key={channel.id}>
              <CardContent className="p-4">
                <h3 className="font-medium">{channel.name}</h3>
                <p className="text-sm text-muted-foreground">Channel ID: {channel.id}</p>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}