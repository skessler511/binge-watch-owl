
import React from "react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar, Download } from "lucide-react";
import { Episode, Show } from "@/utils/streamingData";

interface CalendarEventProps {
  events: Array<{show: Show, episode: Episode}>;
  onClick: () => void;
}

const CalendarEvent = ({ events, onClick }: CalendarEventProps) => {
  const createCalendarEvent = () => {
    if (events.length === 0) return;
    
    // Sort events by date
    const sortedEvents = [...events].sort((a, b) => 
      new Date(a.episode.airDate).getTime() - new Date(b.episode.airDate).getTime()
    );
    
    // Create event title
    const title = events.length === 1 
      ? `${events[0].show.title} - ${events[0].episode.title}`
      : `TV Shows: ${events.map(e => e.show.title).join(", ")}`;
    
    // Get the earliest and latest date
    const startDate = new Date(sortedEvents[0].episode.airDate);
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 1); // Default 1 hour duration
    
    // Create description with list of shows
    let description = "Shows to watch:\n\n";
    events.forEach(({show, episode}) => {
      const airDate = new Date(episode.airDate);
      description += `${show.title} - S${episode.season}:E${episode.episode} - ${episode.title}\n`;
      description += `Air date: ${format(airDate, "PPP 'at' p")}\n\n`;
    });
    
    // Create the calendar event URL
    const calendarUrl = createCalendarUrl(title, description, startDate, endDate);
    
    // Create a temporary link element and trigger click
    const link = document.createElement('a');
    link.href = calendarUrl;
    link.setAttribute('download', 'tv_shows_calendar.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Call the onClick handler
    onClick();
  };
  
  const createCalendarUrl = (title: string, description: string, start: Date, end: Date) => {
    // Format dates for iCalendar format
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, '');
    };
    
    // Create iCalendar content
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'CALSCALE:GREGORIAN',
      'PRODID:-//BingeWatch//Calendar//EN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DTSTART:${formatDate(start)}`,
      `DTEND:${formatDate(end)}`,
      `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
      'STATUS:CONFIRMED',
      'SEQUENCE:0',
      'TRANSP:OPAQUE',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
    
    // Create data URL
    return `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Selected Shows:</p>
        <ul className="text-sm space-y-1">
          {events.length > 0 ? (
            events.map(({show, episode}) => (
              <li key={episode.id} className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-primary"></span>
                <span>{show.title} - {episode.title}</span>
              </li>
            ))
          ) : (
            <li className="text-muted-foreground">No shows selected</li>
          )}
        </ul>
      </div>
      
      <Button 
        onClick={createCalendarEvent} 
        className="w-full gap-2"
        disabled={events.length === 0}
      >
        <Calendar size={16} />
        <span>Add to Calendar</span>
        <Download size={16} />
      </Button>
      
      <p className="text-xs text-muted-foreground text-center">
        This will download an .ics file you can import into your calendar app
      </p>
    </div>
  );
};

export default CalendarEvent;
