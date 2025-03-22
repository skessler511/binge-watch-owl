
import { useState, useEffect } from "react";
import ShowCard from "@/components/ShowCard";
import UpcomingCard from "@/components/UpcomingCard";
import { shows, getUpcomingEpisodes } from "@/utils/streamingData";
import { Button } from "@/components/ui/button";
import { PlusCircle, TrendingUp, Clock, CalendarDays, Zap, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const [mounted, setMounted] = useState(false);
  const upcomingEpisodes = getUpcomingEpisodes();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return null;
  }
  
  return (
    <div className="min-h-screen">
      <div className="pt-24 pb-10 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Track your shows and upcoming episodes
            </p>
          </div>
          
          <div className="mt-4 sm:mt-0 flex gap-3">
            <Button variant="ghost" size="sm" className="gap-1">
              <Filter size={16} />
              <span>Filter</span>
            </Button>
            
            <Button asChild variant="outline" size="sm" className="gap-1">
              <Link to="/connect">
                <PlusCircle size={16} />
                <span>Add Service</span>
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Upcoming Episodes Section */}
        <section 
          className={cn(
            "mb-10",
            upcomingEpisodes.length === 0 ? "hidden" : ""
          )}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CalendarDays size={20} className="text-primary" />
              <h2 className="text-xl font-semibold">Upcoming Episodes</h2>
            </div>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          
          <div className="grid gap-4">
            {upcomingEpisodes.map(({show, episode}) => (
              <UpcomingCard key={episode.id} show={show} episode={episode} />
            ))}
          </div>
        </section>
        
        {/* Continue Watching Section */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-primary" />
              <h2 className="text-xl font-semibold">Continue Watching</h2>
            </div>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shows.slice(0, 3).map(show => (
              <ShowCard key={show.id} show={show} />
            ))}
          </div>
        </section>
        
        {/* Explore Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap size={20} className="text-primary" />
              <h2 className="text-xl font-semibold">Explore</h2>
            </div>
          </div>
          
          <Tabs defaultValue="trending" className="space-y-6">
            <TabsList className="grid grid-cols-2 sm:w-[400px]">
              <TabsTrigger value="trending" className="gap-1">
                <TrendingUp size={16} />
                <span>Trending Now</span>
              </TabsTrigger>
              <TabsTrigger value="recommended" className="gap-1">
                <Zap size={16} />
                <span>Recommended</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="trending" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {shows.slice(0, 6).map(show => (
                  <ShowCard key={show.id} show={show} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="recommended" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {shows.slice(0, 6).reverse().map(show => (
                  <ShowCard key={show.id} show={show} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
