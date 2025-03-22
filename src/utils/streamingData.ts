
export interface StreamingService {
  id: string;
  name: string;
  color: string;
  logo: string;
  connected: boolean;
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
  {
    id: 'netflix',
    name: 'Netflix',
    color: 'netflix',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
    connected: true,
  },
  {
    id: 'hulu',
    name: 'Hulu',
    color: 'hulu',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Hulu_Logo.svg',
    connected: true,
  },
  {
    id: 'prime',
    name: 'Prime Video',
    color: 'prime',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png',
    connected: false,
  },
  {
    id: 'disney',
    name: 'Disney+',
    color: 'disney',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg',
    connected: false,
  },
  {
    id: 'hbo',
    name: 'HBO Max',
    color: 'hbo',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/17/HBO_Max_Logo.svg',
    connected: false,
  },
  {
    id: 'apple',
    name: 'Apple TV+',
    color: 'apple',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/AppleTVLogo.svg',
    connected: false,
  },
];

// Mock data for shows
export const shows: Show[] = [
  {
    id: '1',
    title: 'Stranger Things',
    description: 'When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.',
    poster: 'https://m.media-amazon.com/images/M/MV5BMDZkYmVhNjMtNWU4MC00MDQxLWE3MjYtZGMzZWI1ZjhlOWJmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    backdrop: 'https://m.media-amazon.com/images/M/MV5BZGExYjQzNTQtNGNhMi00YmY1LTlhY2MtMTRjODg3MjU4YTAyXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg',
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
