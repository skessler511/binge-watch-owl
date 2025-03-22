
import { useState } from "react";
import { streamingServices, StreamingService, connectService } from "@/utils/streamingData";
import ServiceCard from "@/components/ServiceCard";
import ConnectService from "@/components/ConnectService";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Connect = () => {
  const [services, setServices] = useState(streamingServices);
  const [selectedService, setSelectedService] = useState<StreamingService | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleServiceConnect = (serviceId: string) => {
    // Update local state
    setServices(prevServices => 
      prevServices.map(service => 
        service.id === serviceId 
          ? { ...service, connected: true } 
          : service
      )
    );
  };
  
  const openConnectDialog = (service: StreamingService) => {
    setSelectedService(service);
    setDialogOpen(true);
  };
  
  const closeConnectDialog = () => {
    setDialogOpen(false);
    setSelectedService(null);
  };
  
  const connectedServices = services.filter(service => service.connected);
  const disconnectedServices = services.filter(service => !service.connected);
  
  return (
    <div className="min-h-screen pt-24 pb-10 px-6 max-w-7xl mx-auto">
      <div className="flex items-center mb-8">
        <Button asChild variant="ghost" size="sm" className="mr-4">
          <Link to="/dashboard">
            <ArrowLeft size={16} />
            <span className="ml-1">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Streaming Services</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Connect your streaming services to track your shows
          </p>
        </div>
      </div>
      
      {connectedServices.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Connected Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {connectedServices.map(service => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                onConnect={handleServiceConnect}
              />
            ))}
          </div>
        </section>
      )}
      
      <section>
        <h2 className="text-xl font-semibold mb-6">Available Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {disconnectedServices.map(service => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              onConnect={handleServiceConnect}
            />
          ))}
        </div>
      </section>
      
      {selectedService && (
        <ConnectService 
          service={selectedService}
          open={dialogOpen}
          onClose={closeConnectDialog}
          onConnect={handleServiceConnect}
        />
      )}
    </div>
  );
};

export default Connect;
