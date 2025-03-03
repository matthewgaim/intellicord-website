"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, Loader2, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useTransition } from "react"

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ToastAction } from "@/components/ui/toast"

type Channel = {
  id: string
  name: string
  // Add other channel properties as needed
}

type SaveChannelSelectionsFunction = (
  serverId: string,
  channelIds: string[],
) => Promise<{ success: boolean; message?: string }>

export function ChannelSelector({
  channels,
  preSelected = [],
  serverId,
  saveAction,
}: {
  channels: Channel[]
  preSelected?: string[]
  serverId: string
  saveAction: SaveChannelSelectionsFunction
}) {
  const { toast } = useToast()
  const [selectedChannels, setSelectedChannels] = useState<string[]>(preSelected)
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

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

  const handleSave = () => {
    startTransition(async () => {
      try {
        const result = await saveAction(serverId, selectedChannels)

        if (result.success) {
          toast({
            title: "Channels saved",
            description: `Successfully saved ${selectedChannels.length} channel selections.`,
            variant: "default",
          })
        } else {
          toast({
            title: "Failed to save",
            description: result.message || "An error occurred while saving your channel selections.",
            variant: "destructive",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          })
        }
      } catch (error) {
        console.log(error)
        toast({
          title: "Error",
          description: "An unexpected error occurred.",
          variant: "destructive",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
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
        {selectedChannels.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {selectedChannels.map((id) => {
              const channel = channels.find((c) => c.id === id)
              return channel ? (
                <Badge key={id} variant="secondary" className="px-3 py-1 flex items-center gap-1">
                  {channel.name}
                  <button
                    className="ml-1 rounded-full hover:bg-muted p-0.5"
                    onClick={() => toggleChannel(id)}
                    aria-label={`Remove ${channel.name}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6 6 18"></path>
                      <path d="m6 6 12 12"></path>
                    </svg>
                  </button>
                </Badge>
              ) : null
            })}
          </div>
        )}
      </div>

      <Separator />

      {/* Channel preview */}
      {selectedChannels.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Channel Preview</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {channels
              .filter((channel) => selectedChannels.includes(channel.id))
              .map((channel) => (
                <Card key={channel.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-semibold text-primary text-sm">{channel.name[0]}</span>
                      </div>
                      <div>
                        <h3 className="font-medium">{channel.name}</h3>
                        <p className="text-xs text-muted-foreground">ID: {channel.id}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <p>No channels selected. Select channels to see a preview.</p>
        </div>
      )}

      <Separator />

      {/* Save button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isPending || preSelected === selectedChannels} className="gap-2">
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Channel Selections
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

