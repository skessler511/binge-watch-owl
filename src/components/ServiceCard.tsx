
import { Button } from "@/components/ui/button";
import { StreamingService, connectService } from "@/utils/streamingData";
import { Check, Link as LinkIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface ServiceCardProps {
  service: StreamingService;
  onConnect: (serviceId: string) => void;
}

const ServiceCard = ({ service, onConnect }: ServiceCardProps) => {
  const [connecting, setConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(service.connected);
  const { toast } = useToast();

  const handleConnect = () => {
    if (isConnected) return;
    
    setConnecting(true);
    
    // Simulate API connection
    setTimeout(() => {
      connectService(service.id);
      setIsConnected(true);
      setConnecting(false);
      onConnect(service.id);
      
      toast({
        title: "Service Connected",
        description: `Your ${service.name} account has been successfully linked.`,
        duration: 3000,
      });
    }, 1500);
  };
  
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-xl transition-all duration-300 animate-scale-in",
        "border border-gray-200 dark:border-gray-800",
        isConnected 
          ? "bg-white dark:bg-gray-900" 
          : "bg-gray-50 dark:bg-gray-950"
      )}
    >
      <div 
        className={cn(
          "absolute inset-0 opacity-10",
          `bg-${service.color}`
        )}
        style={{ 
          background: `linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-to))`,
          '--tw-gradient-from': `var(--tw-colors-${service.color})`,
          '--tw-gradient-to': 'transparent',
         }}
      />
      
      <div className="p-6 flex flex-col h-full">
        <div className="mb-4 flex items-center justify-between">
          <div className="h-10 w-24 relative">
            <img 
              src={service.logo} 
              alt={`${service.name} logo`}
              className="object-contain h-full"
            />
          </div>
          
          {isConnected && (
            <span className={`text-xs font-medium px-2 py-1 rounded-full bg-${service.color}/10 text-${service.color}`}>
              Connected
            </span>
          )}
        </div>
        
        <div className="mt-auto">
          <Button
            variant={isConnected ? "outline" : "default"}
            className={cn(
              "w-full mt-4 rounded-lg",
              isConnected 
                ? "border-gray-200 dark:border-gray-800" 
                : `bg-${service.color} hover:bg-${service.color}/90`
            )}
            disabled={connecting}
            onClick={handleConnect}
          >
            {connecting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connecting...
              </span>
            ) : isConnected ? (
              <span className="flex items-center">
                <Check size={16} className="mr-2" />
                Connected
              </span>
            ) : (
              <span className="flex items-center">
                <LinkIcon size={16} className="mr-2" />
                Connect Account
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
