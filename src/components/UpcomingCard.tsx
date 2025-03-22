
import { Episode, Show, getServiceById } from "@/utils/streamingData";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";

interface UpcomingCardProps {
  show: Show;
  episode: Episode;
}

const UpcomingCard = ({ show, episode }: UpcomingCardProps) => {
  const service = getServiceById(show.service);
  const airDate = new Date(episode.airDate);
  const now = new Date();
  const timeUntil = airDate.getTime() - now.getTime();
  const daysUntil = Math.floor(timeUntil / (1000 * 60 * 60 * 24));
  
  return (
    <Link
      to={`/show/${show.id}`}
      className="group rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-md"
    >
      <div className="p-4 flex gap-4">
        <div className="relative flex-shrink-0 h-24 w-16 rounded-md overflow-hidden shadow-sm">
          <img
            src={show.poster}
            alt={show.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div 
              className={`w-2 h-2 rounded-full bg-${service?.color || 'gray-400'}`}
            ></div>
            <span className="text-xs text-gray-500 dark:text-gray-400">{service?.name}</span>
          </div>
          
          <h3 className="font-medium mt-1 group-hover:text-primary transition-colors duration-300">
            {show.title}
          </h3>
          
          <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">
            S{episode.season}:E{episode.episode} - {episode.title}
          </p>
          
          <div className="mt-2 flex items-center gap-4">
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Calendar size={12} className="mr-1" />
              <span>{airDate.toLocaleDateString()}</span>
            </div>
            
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Clock size={12} className="mr-1" />
              <span>{airDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
          </div>
        </div>
        
        <div className="flex-shrink-0 flex flex-col items-center justify-center">
          <div 
            className={cn(
              "text-2xl font-bold",
              daysUntil <= 0 
                ? "text-green-500" 
                : daysUntil <= 7 
                  ? "text-amber-500" 
                  : "text-gray-400"
            )}
          >
            {daysUntil <= 0 ? 'Today' : daysUntil}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {daysUntil <= 0 ? '' : daysUntil === 1 ? 'day' : 'days'}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UpcomingCard;
