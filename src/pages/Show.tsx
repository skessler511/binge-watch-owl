
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getShowById, getServiceById, Show } from "@/utils/streamingData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Play, MoreHorizontal, Clock, CalendarDays } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const Show = () => {
  const { id } = useParams<{ id: string }>();
  const [show, setShow] = useState<Show | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!id) {
      navigate("/dashboard");
      return;
    }
    
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const foundShow = getShowById(id);
      if (foundShow) {
        setShow(foundShow);
      } else {
        navigate("/dashboard");
      }
      setLoading(false);
    }, 500);
  }, [id, navigate]);
  
  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
          <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
        </div>
      </div>
    );
  }
  
  if (!show) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Show not found</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            The show you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  const service = getServiceById(show.service);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section with Backdrop */}
      <div className="relative h-[50vh] lg:h-[60vh] w-full">
        <div className="absolute inset-0">
          <img 
            src={show.backdrop} 
            alt={show.title} 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        </div>
        
        <div className="absolute top-0 left-0 w-full p-6 pt-24">
          <Button asChild variant="ghost" size="sm" className="bg-black/20 text-white hover:bg-black/30">
            <Link to="/dashboard">
              <ArrowLeft size={16} />
              <span className="ml-1">Back</span>
            </Link>
          </Button>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col sm:flex-row items-start sm:items-end gap-6">
          <div className="w-32 h-48 sm:w-40 sm:h-60 rounded-lg overflow-hidden shadow-lg border border-white/10 -mt-16 sm:-mb-12 z-10 relative">
            <img 
              src={show.poster} 
              alt={show.title} 
              className="h-full w-full object-cover"
            />
          </div>
          
          <div className="flex-1 z-10">
            <div 
              className={cn(
                "inline-block px-2 py-1 rounded text-xs font-medium text-white mb-2",
                `bg-${service?.color || 'gray-500'}`
              )}
            >
              {service?.name}
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              {show.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm text-white/80 mb-3">
              <div className="flex items-center">
                <span className="text-yellow-400 mr-1">★</span>
                <span>{show.rating.toFixed(1)}</span>
              </div>
              <span>|</span>
              <span>{show.releaseYear}</span>
              <span>|</span>
              <span>{show.status === 'continuing' ? 'Ongoing' : 'Ended'}</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {show.genres.map(genre => (
                <Badge key={genre} variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
                  {genre}
                </Badge>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-3 mt-4">
              <Button className="gap-1">
                <Play size={16} />
                <span>Continue Watching</span>
              </Button>
              <Button variant="outline" className="gap-1 bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white">
                <MoreHorizontal size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="episodes">Episodes</TabsTrigger>
                <TabsTrigger value="similar">Similar</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6 pt-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Synopsis</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {show.description}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Your Progress</h3>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">
                        Season {show.progress.season}, Episode {show.progress.episode}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {show.progress.percentage}% Complete
                      </span>
                    </div>
                    <Progress value={show.progress.percentage} className="h-2" />
                    
                    <Button className="w-full mt-4 gap-1">
                      <Play size={16} />
                      <span>Continue Watching</span>
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="episodes" className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Episodes</h3>
                  <select className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 text-sm">
                    <option>Season 1</option>
                    <option>Season 2</option>
                    <option>Season 3</option>
                    <option>Season 4</option>
                  </select>
                </div>
                
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map(num => (
                    <div 
                      key={num} 
                      className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden flex flex-col sm:flex-row"
                    >
                      <div className="sm:w-48 h-32 bg-gray-200 dark:bg-gray-800 relative">
                        <img 
                          src={`https://placehold.co/400x225/f0f4ff/d1d5db?text=Episode+${num}`}
                          alt={`Episode ${num}`}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Button variant="ghost" size="icon" className="rounded-full bg-black/50 text-white hover:bg-black/70 hover:scale-110 transition-all">
                            <Play />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-4 flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">Episode {num}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">42 min</p>
                          </div>
                          <Badge variant="outline" className="ml-2">Watched</Badge>
                        </div>
                        
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="similar" className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Similar Shows</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map(num => (
                    <div 
                      key={num} 
                      className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="h-40 bg-gray-200 dark:bg-gray-800">
                        <img 
                          src={`https://placehold.co/600x300/f0f4ff/d1d5db?text=Similar+Show+${num}`}
                          alt={`Similar Show ${num}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold">Similar Show {num}</h4>
                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                          <span className="text-yellow-500">★</span>
                          <span>8.{num}</span>
                          <span>|</span>
                          <span>202{num}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 sticky top-24">
              {show.nextEpisode ? (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <CalendarDays size={18} className="text-primary" />
                    <h3 className="text-lg font-semibold">Next Episode</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="font-medium">
                      S{show.nextEpisode.season} E{show.nextEpisode.episode}: {show.nextEpisode.title}
                    </p>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {show.nextEpisode.description}
                    </p>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Calendar size={14} className="mr-1" />
                        <span>{new Date(show.nextEpisode.airDate).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Clock size={14} className="mr-1" />
                        <span>{show.nextEpisode.runtime} min</span>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full mt-2">
                      Set Reminder
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar size={40} className="mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium mb-2">No Upcoming Episodes</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {show.status === 'ended' 
                      ? "This series has ended."
                      : "No scheduled episodes at this time."}
                  </p>
                </div>
              )}
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-4">Available On</h3>
                {service && (
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="w-12 h-8 relative">
                      <img 
                        src={service.logo} 
                        alt={`${service.name} logo`}
                        className="object-contain h-full"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Subscription Required</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Show;
