export interface StreamingService {
  id: string;
  name: string;
  color: string;
  logo: string;
  connected: boolean;
  category?: string;
  popular?: boolean;
}

export interface Episode {
  id: string;
  title: string;
  season: number;
  episode: number;
  runtime: number;
  airDate: string;
  watched: boolean;
  description: string;
  thumbnail?: string;
}

export interface Show {
  id: string;
  title: string;
  description: string;
  poster: string;
  backdrop: string;
  service: string;
  rating: number;
  releaseYear: number;
  nextEpisode?: Episode;
  episodes: Episode[];
  genres: string[];
  status: 'continuing' | 'ended';
  progress: {
    season: number;
    episode: number;
    percentage: number;
  };
}

// Mock data for streaming services
export const streamingServices: StreamingService[] = [
  // Popular Services
  {
    id: 'netflix',
    name: 'Netflix',
    color: 'netflix',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
    connected: true,
    category: 'popular',
    popular: true,
  },
  {
    id: 'disney',
    name: 'Disney+',
    color: 'disney',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg',
    connected: false,
    category: 'popular',
    popular: true,
  },
  {
    id: 'hulu',
    name: 'Hulu',
    color: 'hulu',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Hulu_Logo.svg',
    connected: true,
    category: 'popular',
    popular: true,
  },
  {
    id: 'prime',
    name: 'Prime Video',
    color: 'prime',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png',
    connected: false,
    category: 'popular',
    popular: true,
  },
  {
    id: 'hbo',
    name: 'HBO Max',
    color: 'hbo',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/17/HBO_Max_Logo.svg',
    connected: false,
    category: 'popular',
    popular: true,
  },
  {
    id: 'apple',
    name: 'Apple TV+',
    color: 'apple',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/AppleTVLogo.svg',
    connected: false,
    category: 'popular',
    popular: true,
  },
  {
    id: 'peacock',
    name: 'Peacock',
    color: 'blue-500',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/NBCUniversal_Peacock_Logo.svg',
    connected: false,
    category: 'popular',
    popular: true,
  },
  {
    id: 'paramount',
    name: 'Paramount+',
    color: 'blue-800',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Paramount_Plus.svg',
    connected: false,
    category: 'popular',
    popular: true,
  },
  
  // Sports
  {
    id: 'espn',
    name: 'ESPN+',
    color: 'red-600',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/ESPN%2B_logo.svg',
    connected: false,
    category: 'sports',
  },
  {
    id: 'dazn',
    name: 'DAZN',
    color: 'black',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/DAZN_Logo_Master.svg/2560px-DAZN_Logo_Master.svg.png',
    connected: false,
    category: 'sports',
  },
  {
    id: 'nba',
    name: 'NBA League Pass',
    color: 'blue-600',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/03/National_Basketball_Association_logo.svg/1200px-National_Basketball_Association_logo.svg.png',
    connected: false,
    category: 'sports',
  },
  
  // International
  {
    id: 'crunchyroll',
    name: 'Crunchyroll',
    color: 'orange-500',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Crunchyroll_Logo.png',
    connected: false,
    category: 'international',
  },
  {
    id: 'britbox',
    name: 'BritBox',
    color: 'blue-400',
    logo: 'https://upload.wikimedia.org/wikipedia/en/7/7c/Britbox_logo.png',
    connected: false,
    category: 'international',
  },
  {
    id: 'viki',
    name: 'Viki',
    color: 'red-500',
    logo: 'https://upload.wikimedia.org/wikipedia/en/5/51/Viki_Logo.png',
    connected: false,
    category: 'international',
  },
  
  // Niche
  {
    id: 'criterion',
    name: 'Criterion Channel',
    color: 'black',
    logo: 'https://images.squarespace-cdn.com/content/v1/5ec68396084ae4665a29a8e6/1591299018959-2XIVB9WIC2JSP2P9D08J/criterion-channel-logo.png',
    connected: false,
    category: 'niche',
  },
  {
    id: 'shudder',
    name: 'Shudder',
    color: 'red-800',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Shudder_logo.png',
    connected: false,
    category: 'niche',
  },
  {
    id: 'mubi',
    name: 'MUBI',
    color: 'black',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Mubi_logo.svg',
    connected: false,
    category: 'niche',
  },
  
  // Free Services
  {
    id: 'tubi',
    name: 'Tubi',
    color: 'red-500',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Tubi_Logo_2020.svg',
    connected: false,
    category: 'free',
  },
  {
    id: 'pluto',
    name: 'Pluto TV',
    color: 'yellow-400',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Pluto_TV_2020_logo.svg/1200px-Pluto_TV_2020_logo.svg.png',
    connected: false,
    category: 'free',
  },
  {
    id: 'freevee',
    name: 'Amazon Freevee',
    color: 'yellow-500',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Freevee.svg/2560px-Freevee.svg.png',
    connected: false,
    category: 'free',
  },
];

// Mock data for shows
export const shows: Show[] = [
  {
    id: '1',
    title: 'Stranger Things',
    description: 'When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.',
    poster: 'https://m.media-amazon.com/images/M/MV5BMDZkYmVhNjMtNWU4MC00MDQxLWE3MjYtZGMzZWI1ZjhlOWJmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    backdrop: 'https://m.media-amazon.com/images/M/MV5BZGExYjQzNTQtNGNhMi00YmY1LTlhY2MtMTRjODg3MjU4YTAyXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg',
    service: 'netflix',
    rating: 8.7,
    releaseYear: 2016,
    nextEpisode: {
      id: 'st-s5-e1',
      title: 'Chapter One',
      season: 5,
      episode: 1,
      runtime: 60,
      airDate: '2024-07-15T20:00:00Z',
      watched: false,
      description: 'Season 5 premiere episode',
    },
    episodes: [],
    genres: ['Drama', 'Fantasy', 'Horror'],
    status: 'continuing',
    progress: {
      season: 4,
      episode: 9,
      percentage: 100,
    },
  },
  {
    id: '2',
    title: 'The Bear',
    description: 'A young chef from the fine dining world returns to Chicago to run his family\'s sandwich shop.',
    poster: 'https://m.media-amazon.com/images/M/MV5BNGEyZTAwYzEtZTNmOC00NDQ3LWFkYjQtZDFmZGRhYzE4YTFiXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg',
    backdrop: 'https://m.media-amazon.com/images/M/MV5BMzRjZWVmMzItNTdmYS00OWEzLTgyOGUtNThiNTU2ZThlYjY0XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg',
    service: 'hulu',
    rating: 8.6,
    releaseYear: 2022,
    nextEpisode: {
      id: 'bear-s3-e1',
      title: 'Growth',
      season: 3,
      episode: 1,
      runtime: 30,
      airDate: '2024-06-27T20:00:00Z',
      watched: false,
      description: 'Season 3 premiere episode',
    },
    episodes: [],
    genres: ['Comedy', 'Drama'],
    status: 'continuing',
    progress: {
      season: 2,
      episode: 10,
      percentage: 100,
    },
  },
  {
    id: '3',
    title: 'Succession',
    description: 'The Roy family is known for controlling the biggest media and entertainment company in the world. However, their world changes when their father steps down from the company.',
    poster: 'https://m.media-amazon.com/images/M/MV5BODY5OGI0MzYtZTNjYi00MDU3LWE3Y2MtYTUwN2Y2OGYwZmVmXkEyXkFqcGdeQXVyMTMzNDExODE5._V1_.jpg',
    backdrop: 'https://m.media-amazon.com/images/M/MV5BZGY3MTRkYzktNDE4MS00NjUyLTg5NjUtZjQxNTZlZTU1YWIwXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg',
    service: 'hbo',
    rating: 8.8,
    releaseYear: 2018,
    episodes: [],
    genres: ['Drama'],
    status: 'ended',
    progress: {
      season: 4,
      episode: 10,
      percentage: 100,
    },
  },
  {
    id: '4',
    title: 'The Last of Us',
    description: 'After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity\'s last hope.',
    poster: 'https://m.media-amazon.com/images/M/MV5BZGUzYTI3M2EtZmM0Yy00NGUyLWI4ODEtN2Q3ZGJlYzhhZjU3XkEyXkFqcGdeQXVyNTM0OTY1OQ@@._V1_.jpg',
    backdrop: 'https://m.media-amazon.com/images/M/MV5BZDc2YTVhYTEtZGM4Yi00N2U5LThmZTktMGE4ZjcxMDQzYTYwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg',
    service: 'hbo',
    rating: 8.8,
    releaseYear: 2023,
    nextEpisode: {
      id: 'tlou-s2-e1',
      title: 'Season 2 Premiere',
      season: 2,
      episode: 1,
      runtime: 60,
      airDate: '2025-01-15T20:00:00Z',
      watched: false,
      description: 'Season 2 premiere episode',
    },
    episodes: [],
    genres: ['Action', 'Adventure', 'Drama'],
    status: 'continuing',
    progress: {
      season: 1,
      episode: 9,
      percentage: 100,
    },
  },
];

export const getServiceById = (id: string): StreamingService | undefined => {
  return streamingServices.find(service => service.id === id);
};

export const getShowById = (id: string): Show | undefined => {
  return shows.find(show => show.id === id);
};

export const getUpcomingEpisodes = (): Array<{show: Show, episode: Episode}> => {
  return shows
    .filter(show => show.nextEpisode)
    .map(show => ({
      show,
      episode: show.nextEpisode!
    }))
    .sort((a, b) => 
      new Date(a.episode.airDate).getTime() - new Date(b.episode.airDate).getTime()
    );
};

export const connectService = (serviceId: string): void => {
  const serviceIndex = streamingServices.findIndex(service => service.id === serviceId);
  if (serviceIndex !== -1) {
    streamingServices[serviceIndex].connected = true;
  }
};

/**
 * Get episodes based on a specific date and view (day, week, month)
 */
export const getEpisodesByDate = (
  date: Date,
  view: 'day' | 'week' | 'month'
): Array<{show: Show, episode: Episode}> => {
  const today = new Date(date);
  today.setHours(0, 0, 0, 0);
  
  const upcomingEpisodes = getUpcomingEpisodes();
  
  return upcomingEpisodes.filter(({ episode }) => {
    const episodeDate = new Date(episode.airDate);
    episodeDate.setHours(0, 0, 0, 0);
    
    if (view === 'day') {
      // Same day
      return episodeDate.getTime() === today.getTime();
    } else if (view === 'week') {
      // Within the same week (7 days)
      const weekLater = new Date(today);
      weekLater.setDate(today.getDate() + 6);
      return episodeDate >= today && episodeDate <= weekLater;
    } else if (view === 'month') {
      // Within the same month
      return (
        episodeDate.getMonth() === today.getMonth() &&
        episodeDate.getFullYear() === today.getFullYear()
      );
    }
    
    return false;
  });
};

/**
 * Get all premiere dates (first episodes of new seasons)
 */
export const getPremiereDates = (): Array<{show: Show, episode: Episode}> => {
  return getUpcomingEpisodes().filter(({ episode }) => {
    return episode.episode === 1; // First episode of a season
  });
};

// Add some additional dummy episodes for testing calendar functionality
shows.forEach(show => {
  if (show.nextEpisode) {
    // Create weekly episodes
    const episodes: Episode[] = [];
    const baseDate = new Date(show.nextEpisode.airDate);
    
    // Add 10 weekly episodes for continuing shows
    if (show.status === 'continuing') {
      for (let i = 0; i < 10; i++) {
        const episodeDate = new Date(baseDate);
        episodeDate.setDate(baseDate.getDate() + (i * 7)); // Weekly
        
        episodes.push({
          id: `${show.id}-s${show.nextEpisode.season}-e${show.nextEpisode.episode + i}`,
          title: `Episode ${show.nextEpisode.episode + i}`,
          season: show.nextEpisode.season,
          episode: show.nextEpisode.episode + i,
          runtime: show.nextEpisode.runtime,
          airDate: episodeDate.toISOString(),
          watched: false,
          description: `This is episode ${show.nextEpisode.episode + i} of season ${show.nextEpisode.season}`,
        });
      }
      
      show.episodes = episodes;
    }
  }
});
