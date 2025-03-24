
import React, { useState, useEffect } from "react";
import { format, addMonths, isSameDay, isSameMonth } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getUpcomingEpisodes, getEpisodesByDate, Episode, Show } from "@/utils/streamingData";
import CalendarEvent from "@/components/CalendarEvent";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import UpcomingCard from "@/components/UpcomingCard";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [view, setView] = useState<"day" | "week" | "month">("day");
  const [selectedEvents, setSelectedEvents] = useState<Array<{show: Show, episode: Episode}>>([]);
  const [showExportPopover, setShowExportPopover] = useState(false);
  const [mounted, setMounted] = useState(false);
  const upcomingEpisodes = getUpcomingEpisodes();
  
  // Find days with episodes to highlight on calendar
  const getEpisodeDates = () => {
    return upcomingEpisodes.map(({ episode }) => new Date(episode.airDate));
  };
  
  useEffect(() => {
    setMounted(true);
    // Get episodes based on the selected date and view
    updateSelectedEvents();
  }, [selectedDate, view]);
  
  const updateSelectedEvents = () => {
    setSelectedEvents(getEpisodesByDate(selectedDate, view));
  };
  
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    }
  };
  
  const handleExportEvents = () => {
    setShowExportPopover(false);
  };
  
  if (!mounted) return null;
  
  return (
    <div className="min-h-screen">
      <div className="pt-24 pb-10 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Show Calendar</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Track premiere dates and schedule your viewing
            </p>
          </div>
          
          <div className="mt-4 sm:mt-0 flex gap-3">
            <Button variant="ghost" size="sm" className="gap-1">
              <Filter size={16} />
              <span>Filter</span>
            </Button>
            
            <Popover 
              open={showExportPopover} 
              onOpenChange={setShowExportPopover}
            >
              <PopoverTrigger asChild>
                <Button size="sm" className="gap-1">
                  <Download size={16} />
                  <span>Export</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h3 className="font-medium">Export Events</h3>
                  <p className="text-sm text-gray-500">
                    Create a calendar event with the selected shows
                  </p>
                  <div className="space-y-2">
                    <CalendarEvent 
                      events={selectedEvents} 
                      onClick={handleExportEvents}
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-lg border bg-card p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium flex items-center gap-2">
                  <CalendarIcon size={18} className="text-primary" />
                  <span>Calendar</span>
                </h2>
                <div className="flex space-x-1">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSelectedDate(new Date())}
                    className="h-7 w-7"
                  >
                    <span className="sr-only">Today</span>
                    <span className="text-xs">Today</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSelectedDate(prev => addMonths(prev, -1))}
                    className="h-7 w-7"
                  >
                    <span className="sr-only">Previous month</span>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSelectedDate(prev => addMonths(prev, 1))}
                    className="h-7 w-7"
                  >
                    <span className="sr-only">Next month</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                className="rounded-md border"
                modifiers={{
                  hasEpisode: getEpisodeDates(),
                }}
                modifiersClassNames={{
                  hasEpisode: "border-2 border-primary rounded-full",
                }}
                showOutsideDays
              />
              
              <div className="mt-4 flex border rounded-lg overflow-hidden">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger 
                    value="day" 
                    onClick={() => setView("day")}
                    data-state={view === "day" ? "active" : "inactive"}
                  >
                    Day
                  </TabsTrigger>
                  <TabsTrigger 
                    value="week" 
                    onClick={() => setView("week")}
                    data-state={view === "week" ? "active" : "inactive"}
                  >
                    Week
                  </TabsTrigger>
                  <TabsTrigger 
                    value="month" 
                    onClick={() => setView("month")}
                    data-state={view === "month" ? "active" : "inactive"}
                  >
                    Month
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
          </div>
          
          {/* Events List Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-lg border p-4 bg-card">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">
                  {format(selectedDate, "MMMM d, yyyy")} ({view})
                </h2>
                <span className="text-sm text-muted-foreground">
                  {selectedEvents.length} shows
                </span>
              </div>
              
              {selectedEvents.length > 0 ? (
                <div className="space-y-4">
                  {selectedEvents.map(({show, episode}) => (
                    <UpcomingCard key={episode.id} show={show} episode={episode} />
                  ))}
                </div>
              ) : (
                <div className="py-10 text-center border border-dashed rounded-lg">
                  <p className="text-muted-foreground">No shows scheduled for this {view}</p>
                </div>
              )}
            </div>
            
            {upcomingEpisodes.length > 0 && (
              <div className="rounded-lg border p-4 bg-card">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">
                    Upcoming Premieres
                  </h2>
                </div>
                <div className="space-y-4">
                  {upcomingEpisodes.slice(0, 3).map(({show, episode}) => (
                    <UpcomingCard key={episode.id} show={show} episode={episode} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
