"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, Loader2, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ToastAction } from "@/components/ui/toast";

type Channel = {
  id: string;
  name: string;
};

type ChannelSelectorProps = {
  channels: Channel[];
  preSelected?: string[];
  serverId: string;
  saveAction: (
    serverId: string,
    channelIds: string[]
  ) => Promise<{ success: boolean; message?: string }>;
};

export function ChannelSelector({
  channels,
  preSelected = [],
  serverId,
  saveAction,
}: ChannelSelectorProps) {
  const { toast } = useToast();
  const [selectedChannels, setSelectedChannels] =
    useState<string[]>(preSelected);
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Consolidated channel selection logic
  const updateChannelSelection = (channelId: string) => {
    setSelectedChannels((current) =>
      current.includes(channelId)
        ? current.filter((id) => id !== channelId)
        : [...current, channelId]
    );
  };

  // Handles select/deselect all functionality
  const toggleSelectAll = () => {
    setSelectedChannels(
      selectedChannels.length === channels.length
        ? []
        : channels.map((channel) => channel.id)
    );
  };

  // Save handler with improved error handling
  const handleSave = () => {
    startTransition(async () => {
      try {
        const result = await saveAction(serverId, selectedChannels);

        toast({
          title: result.success ? "Channels Saved" : "Save Failed",
          description: result.success
            ? `Successfully saved ${selectedChannels.length} channel(s).`
            : result.message || "An error occurred while saving channels.",
          variant: result.success ? "default" : "destructive",
          ...(result.success
            ? {}
            : {
                action: (
                  <ToastAction altText="Try again">Try again</ToastAction>
                ),
              }),
        });
      } catch (error) {
        console.log(error);
        toast({
          title: "Unexpected Error",
          description: "An unexpected error occurred while saving channels.",
          variant: "destructive",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="justify-between"
              >
                {selectedChannels.length > 0
                  ? `${selectedChannels.length} / ${channels.length} channel${
                      selectedChannels.length > 1 ? "s" : ""
                    } selected`
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
                    <div className="px-2 py-1.5 border-b flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="select-all"
                          checked={
                            selectedChannels.length === channels.length &&
                            channels.length > 0
                          }
                          onCheckedChange={toggleSelectAll}
                        />
                        <label
                          htmlFor="select-all"
                          className="text-sm font-medium"
                        >
                          {selectedChannels.length === channels.length &&
                          channels.length > 0
                            ? "Deselect all"
                            : "Select all"}
                        </label>
                      </div>
                    </div>
                    {channels.map((channel) => (
                      <CommandItem
                        key={channel.id}
                        onSelect={() => updateChannelSelection(channel.id)}
                        className="flex items-center space-x-2 px-2 py-1.5"
                      >
                        <Checkbox
                          id={`channel-${channel.id}`}
                          checked={selectedChannels.includes(channel.id)}
                          onCheckedChange={() =>
                            updateChannelSelection(channel.id)
                          }
                        />
                        <label
                          htmlFor={`channel-${channel.id}`}
                          className="flex-1 text-sm"
                        >
                          {channel.name}
                        </label>
                        {selectedChannels.includes(channel.id) && (
                          <Check className="h-4 w-4 ml-auto" />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {selectedChannels.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedChannels([])}
              className="flex items-center gap-1"
            >
              <X className="h-4 w-4" /> Clear
            </Button>
          )}
        </div>
      </div>

      {/* Channel Preview */}
      <div className="space-y-4">
        {selectedChannels.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {channels
              .filter((channel) => selectedChannels.includes(channel.id))
              .map((channel) => (
                <Card key={channel.id}>
                  <CardContent className="p-4 flex justify-between">
                    <h3 className="font-semibold line-clamp-1"># {channel.name}</h3>
                    <Badge
                      variant="destructive"
                      className="py-1 cursor-pointer"
                      onClick={() => updateChannelSelection(channel.id)}
                    >
                      <X className="h-3 w-3" />
                    </Badge>
                  </CardContent>
                </Card>
              ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            No channels selected. Select channels to see a preview.
          </p>
        )}
      </div>
      
      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={
            isPending ||
            JSON.stringify(preSelected) === JSON.stringify(selectedChannels)
          }
          className="gap-2"
        >
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
  );
}
