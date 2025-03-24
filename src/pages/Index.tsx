import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden hero-gradient">
        <div className="absolute inset-0 opacity-20 pattern-grid-lg"></div>
        
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-64 top-32 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -left-20 top-1/3 w-72 h-72 bg-blue-400 rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 h-full flex flex-col justify-center relative z-10 pt-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }}
            className="max-w-3xl"
          >
            <h1 className="text-6xl md:text-7xl font-extrabold leading-tight tracking-tight mb-6 text-white text-shadow">
              All your shows, <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-500 text-glow headline-underline">all in one place</span>
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed">
              Keep track of what you're watching across all your streaming services, get notified about new episodes, and never miss a show again.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                size="lg" 
                className="text-md font-bold gap-2 h-12 px-8 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 btn-pulse"
              >
                <Link to="/dashboard">
                  <span>Get Started</span>
                  <ArrowRight size={18} />
                </Link>
              </Button>
              
              <Button 
                asChild
                size="lg" 
                variant="outline" 
                className="text-md font-bold gap-2 h-12 px-8 border-2 border-white text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <Link to="/connect">
                  <Play size={18} />
                  <span>Connect Services</span>
                </Link>
              </Button>
              
              <Button 
                asChild
                size="lg" 
                variant="secondary" 
                className="text-md font-bold gap-2 h-12 px-8 transition-all duration-300 transform hover:scale-105"
              >
                <Link to="/calendar">
                  <Calendar size={18} />
                  <span>Show Calendar</span>
                </Link>
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.165, 0.84, 0.44, 1] }}
            className="mt-16 relative w-full max-w-6xl mx-auto"
          >
            <div className="rounded-2xl shadow-2xl overflow-hidden border-4 border-white/20 bg-black/30 backdrop-blur-lg p-1">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80" 
                  alt="Person confused while scrolling through shows" 
                  className="w-full rounded-xl object-cover aspect-[16/9]"
                />
                <div className="absolute inset-0 flex items-center justify-center p-8 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                  <div className="text-center text-white max-w-lg">
                    <h3 className="text-3xl font-bold mb-4">Tired of endless scrolling?</h3>
                    <p className="text-lg">StreamSync helps you find what to watch without the frustration</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-blue-400 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 headline-underline">One app for all your streaming needs</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              StreamSync connects with all major streaming platforms, giving you a unified viewing experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              title="Unified Watchlist" 
              description="Track what you're watching across Netflix, Hulu, Disney+, HBO Max, and more in one place."
              icon="📋"
            />
            <FeatureCard 
              title="Episode Alerts" 
              description="Get notifications when new episodes of your favorite shows are available."
              icon="🔔"
            />
            <FeatureCard 
              title="Service Tracking" 
              description="See which streaming service offers the shows and movies you want to watch."
              icon="🔍"
            />
            <FeatureCard 
              title="Watch Progress" 
              description="Keep track of your progress through seasons and pick up right where you left off."
              icon="📈"
            />
            <FeatureCard 
              title="Personalized Calendar" 
              description="View a calendar of upcoming episodes for all your followed shows."
              icon="📅"
            />
            <FeatureCard 
              title="Easy Discovery" 
              description="Find new shows and movies based on what you already love."
              icon="✨"
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative hero-gradient text-white">
        <div className="absolute inset-0 opacity-10 pattern-grid-lg"></div>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Ready to organize your streaming life?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start tracking your favorite shows across all platforms and never miss an episode again.
          </p>
          <Button 
            asChild
            size="lg" 
            className="text-md font-bold gap-2 h-12 px-8 bg-white text-purple-700 hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            <Link to="/dashboard">
              <span>Get Started Today</span>
              <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-500">
                StreamSync
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Your streaming services, unified.
              </p>
            </div>
            
            <div className="flex gap-6">
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link to="/connect" className="text-gray-400 hover:text-white transition-colors">
                Services
              </Link>
              <Link to="/calendar" className="text-gray-400 hover:text-white transition-colors">
                Calendar
              </Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} StreamSync. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-500 feature-card-hover">
      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 text-2xl shadow-lg">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
};

export default Index;
