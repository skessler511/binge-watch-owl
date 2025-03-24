
import { StreamingService, connectService } from "@/utils/streamingData";
import { Button } from "@/components/ui/button";
import { Plus, Check, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface ServiceCardProps {
  service: StreamingService;
  onConnect: (serviceId: string) => void;
}

const ServiceCard = ({ service, onConnect }: ServiceCardProps) => {
  const handleConnect = () => {
    // Call the API service
    connectService(service.id);
    // Notify parent component
    onConnect(service.id);
  };
  
  // Custom color mapping for Tailwind
  const getColorClasses = (color: string) => {
    // Handle built-in colors
    if (color.startsWith('bg-')) {
      return color.replace('bg-', 'from-') + ' to-' + color.replace('bg-', '');
    }
    
    // Handle named services
    switch(color) {
      case 'netflix': return 'from-red-600 to-red-700';
      case 'hulu': return 'from-green-500 to-green-600';
      case 'prime': return 'from-blue-400 to-blue-500';
      case 'disney': return 'from-blue-600 to-blue-700';
      case 'hbo': return 'from-purple-600 to-purple-700';
      case 'apple': return 'from-gray-500 to-gray-600';
      // Handle color strings directly
      default: 
        if (color.includes('-')) {
          const [hue, shade] = color.split('-');
          return `from-${hue}-${parseInt(shade) - 100} to-${color}`;
        }
        return 'from-gray-400 to-gray-500';
    }
  };
  
  return (
    <div className="rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm hover:shadow-md transition-all duration-300 feature-card-hover">
      <div 
        className={cn(
          "h-24 flex items-center justify-center bg-gradient-to-r p-4",
          getColorClasses(service.color)
        )}
      >
        {service.logo && (
          <img 
            src={service.logo} 
            alt={service.name} 
            className="h-full max-w-full object-contain" 
            loading="eager"
            onError={(e) => {
              // Fallback for image load errors
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = 'placeholder.svg';
            }}
          />
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-medium mb-2">{service.name}</h3>
        
        <div className="flex justify-end">
          {service.connected ? (
            <Button 
              variant="outline" 
              className="gap-1"
              disabled
            >
              <Check size={16} className="text-green-500" />
              <span>Connected</span>
            </Button>
          ) : (
            <Button 
              variant="default" 
              onClick={handleConnect}
              className="gap-1"
            >
              <LinkIcon size={16} />
              <span>Connect</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
