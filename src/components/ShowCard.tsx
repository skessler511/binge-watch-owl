
import { Show, getServiceById } from "@/utils/streamingData";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Calendar, Clock } from "lucide-react";

interface ShowCardProps {
  show: Show;
  compact?: boolean;
}

const ShowCard = ({ show, compact = false }: ShowCardProps) => {
  const service = getServiceById(show.service);
  
  if (compact) {
    return (
      <Link 
        to={`/show/${show.id}`} 
        className="group flex items-center space-x-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:bg-white/50 dark:hover:bg-gray-900/50 transition-all duration-300"
      >
        <div className="relative h-16 w-12 flex-shrink-0 overflow-hidden rounded-md shadow-md">
          <img 
            src={show.poster} 
            alt={show.title} 
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-sm group-hover:text-primary transition-colors duration-300">{show.title}</h3>
          <div className="flex items-center mt-1">
            <div 
              className={`w-2 h-2 rounded-full mr-2 bg-${service?.color || 'gray-400'}`}
            ></div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{service?.name}</p>
          </div>
        </div>
      </Link>
    );
  }
  
  return (
    <Link 
      to={`/show/${show.id}`}
      className="group block overflow-hidden rounded-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:shadow-md"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <img 
          src={show.backdrop} 
          alt={show.title} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 p-4 w-full">
          <div className="flex items-center justify-between">
            <div 
              className={`px-2 py-1 rounded-md text-xs font-medium bg-${service?.color || 'gray-500'} text-white`}
            >
              {service?.name}
            </div>
            <div className="flex items-center text-white space-x-2">
              <div className="flex items-center">
                <span className="text-xs">{show.rating.toFixed(1)}</span>
                <span className="text-yellow-400 ml-1">★</span>
              </div>
              <span className="text-xs">|</span>
              <span className="text-xs">{show.releaseYear}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-300">{show.title}</h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{show.description}</p>
        
        <div className="mt-4 space-y-2">
          {show.nextEpisode ? (
            <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
              <Calendar size={14} />
              <span>
                Next: S{show.nextEpisode.season}:E{show.nextEpisode.episode} - {new Date(show.nextEpisode.airDate).toLocaleDateString()}
              </span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
              <Clock size={14} />
              <span>
                {show.status === 'ended' ? 'Series Completed' : 'No upcoming episodes announced'}
              </span>
            </div>
          )}
          
          <div className="relative h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <div 
              className={cn(
                "absolute left-0 top-0 h-full rounded-full",
                `bg-${service?.color || 'blue-500'}`
              )}
              style={{ width: `${show.progress.percentage}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>S{show.progress.season}:E{show.progress.episode}</span>
            <span>{show.progress.percentage}% complete</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ShowCard;
