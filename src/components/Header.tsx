
import { Link, useLocation } from 'react-router-dom';
import { Bell, Calendar, Menu, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { getUpcomingEpisodes } from '@/utils/streamingData';

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const upcomingEpisodes = getUpcomingEpisodes();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6",
      scrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
            StreamSync
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" label="Home" active={location.pathname === '/'} />
          <NavLink to="/dashboard" label="Dashboard" active={location.pathname === '/dashboard'} />
          <NavLink to="/connect" label="Services" active={location.pathname === '/connect'} />
          <NavLink to="/calendar" label="Calendar" active={location.pathname === '/calendar'} />
        </nav>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Button variant="ghost" size="icon" className="rounded-full w-10 h-10">
              <Bell size={20} className="text-gray-700 dark:text-gray-300" />
              {upcomingEpisodes.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-medium">
                  {upcomingEpisodes.length}
                </span>
              )}
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full w-10 h-10">
            <User size={20} className="text-gray-700 dark:text-gray-300" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full w-10 h-10 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={20} className="text-gray-700 dark:text-gray-300" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass p-4 animate-slide-down">
          <nav className="flex flex-col space-y-4">
            <MobileNavLink to="/" label="Home" onClick={() => setMobileMenuOpen(false)} />
            <MobileNavLink to="/dashboard" label="Dashboard" onClick={() => setMobileMenuOpen(false)} />
            <MobileNavLink to="/connect" label="Services" onClick={() => setMobileMenuOpen(false)} />
            <MobileNavLink to="/calendar" label="Calendar" onClick={() => setMobileMenuOpen(false)} />
          </nav>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  active?: boolean;
}

const NavLink = ({ to, label, active }: NavLinkProps) => (
  <Link 
    to={to} 
    className={cn(
      "text-sm font-medium relative py-2 transition-colors hover:text-primary",
      active 
        ? "text-primary" 
        : "text-gray-700 dark:text-gray-300"
    )}
  >
    {label}
    {active && (
      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
    )}
  </Link>
);

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink = ({ to, label, onClick }: MobileNavLinkProps) => (
  <Link 
    to={to} 
    className="text-gray-700 dark:text-gray-300 text-lg font-medium py-2 px-4 rounded-md hover:bg-white/10 transition-colors"
    onClick={onClick}
  >
    {label}
  </Link>
);

export default Header;
