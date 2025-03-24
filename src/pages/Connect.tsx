
import { useState, useEffect } from "react";
import { streamingServices, StreamingService, connectService } from "@/utils/streamingData";
import ServiceCard from "@/components/ServiceCard";
import ConnectService from "@/components/ConnectService";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlusCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const Connect = () => {
  const [services, setServices] = useState(streamingServices);
  const [selectedService, setSelectedService] = useState<StreamingService | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Derive filtered services based on search and category
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
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
  
  // Group services by connected status and then by category
  const connectedServices = filteredServices.filter(service => service.connected);
  
  // Group disconnected services by category
  const popularServices = filteredServices.filter(service => !service.connected && service.popular);
  const otherServices = filteredServices.filter(service => !service.connected && !service.popular);
  
  // Get unique categories for filter dropdown
  const categories = ["all", ...new Set(services.map(service => service.category || "other"))];
  
  return (
    <div className="min-h-screen pt-24 pb-16 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center mb-8 gap-4">
        <Button asChild variant="ghost" size="sm" className="mr-4 w-fit">
          <Link to="/dashboard">
            <ArrowLeft size={16} />
            <span className="ml-1">Back</span>
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight headline-underline">Streaming Services</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-2xl">
            Connect your streaming services to track your shows and get personalized recommendations
          </p>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {connectedServices.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gradient">Connected Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
      
      {popularServices.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gradient">Popular Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {popularServices.map(service => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                onConnect={handleServiceConnect}
              />
            ))}
          </div>
        </section>
      )}
      
      {otherServices.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-gradient">More Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {otherServices.map(service => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                onConnect={handleServiceConnect}
              />
            ))}
          </div>
        </section>
      )}
      
      {filteredServices.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h3 className="text-xl font-medium mb-2">No streaming services found</h3>
          <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
          <Button variant="outline" onClick={() => {
            setSearchQuery("");
            setSelectedCategory("all");
          }}>
            Clear filters
          </Button>
        </div>
      )}
      
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
