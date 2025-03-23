import { useParams } from "react-router-dom";
import { getShowById } from "@/utils/streamingData";
import { ArrowLeft, Calendar, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { type Show as ShowType } from "@/utils/streamingData"; // Changed to type-only import

const Show = () => {
  const { id } = useParams<{ id: string }>();
  const show = getShowById(id || "");

  if (!show) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Show Not Found</h1>
          <p className="text-xl text-gray-600 mb-4">
            Oops! The show you're looking for doesn't exist.
          </p>
          <Link to="/" className="text-blue-500 hover:text-blue-700 underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-10 px-6 max-w-7xl mx-auto">
      <div className="flex items-center mb-8">
        <Button asChild variant="ghost" size="sm" className="mr-4">
          <Link to="/dashboard">
            <ArrowLeft size={16} />
            <span className="ml-1">Back</span>
          </Link>
        </Button>
      </div>

      <div className="relative rounded-lg overflow-hidden shadow-md">
        <img
          src={show.backdrop}
          alt={show.title}
          className="w-full h-64 object-cover object-center"
        />
        <div className="absolute top-4 left-4">
          <Badge>{show.status}</Badge>
        </div>
      </div>

      <div className="mt-6 flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <img
            src={show.poster}
            alt={show.title}
            className="w-full rounded-lg shadow-md"
          />
        </div>

        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold tracking-tight">{show.title}</h1>
          <div className="flex items-center mt-2">
            <Star size={16} className="text-yellow-500 mr-1" />
            <span>{show.rating}</span>
            <span className="mx-2">•</span>
            <span>{show.releaseYear}</span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 mt-3">
            {show.description}
          </p>

          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Genres</h2>
            <div className="flex gap-2">
              {show.genres.map((genre) => (
                <Badge key={genre} variant="secondary">{genre}</Badge>
              ))}
            </div>
          </div>

          {show.nextEpisode && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Next Episode</h2>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium">{show.nextEpisode.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Season {show.nextEpisode.season}, Episode {show.nextEpisode.episode}
                </p>
                <div className="flex items-center mt-2">
                  <Calendar size={12} className="text-gray-500 dark:text-gray-400 mr-1" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(show.nextEpisode.airDate).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
                  {show.nextEpisode.description}
                </p>
                <Button className="mt-4 gap-1">
                  <Play size={16} />
                  <span>Watch Episode</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Show;
