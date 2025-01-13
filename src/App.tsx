import React, { useState } from 'react';
import { Search, Film, Loader2, Clapperboard, Sparkles, Clock, Globe, Github, Linkedin } from 'lucide-react';
import { getMovieRecommendations } from './lib/gemini';
import { MovieCard } from './components/MovieCard';

interface Movie {
  title: string;
  year: string;
  plot: string;
  rating: string;
}

const GENRES = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller'];
const MOODS = ['Happy', 'Sad', 'Intense', 'Relaxing', 'Thought-provoking', 'Inspirational'];
const YEARS = ['2020s', '2010s', '2000s', '1990s', '1980s', 'Classic'];
const LANGUAGES = ['English', 'Hindi', 'Spanish', 'Korean', 'Japanese', 'French'];

export default function App() {
  const [genre, setGenre] = useState('');
  const [mood, setMood] = useState('');
  const [year, setYear] = useState('');
  const [language, setLanguage] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const recommendations = await getMovieRecommendations(genre, mood, year, language);
      setMovies(recommendations);
    } catch (err) {
      setError('Failed to get recommendations. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 relative">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Film className="w-12 h-12 text-indigo-400" />
          </div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">
            Movie Oracle
          </h1>
          <p className="text-gray-400">Discover your next favorite film</p>
          <p className="text-sm text-indigo-400 mt-2">Created by Aryan Acharya</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-effect rounded-xl p-6 max-w-4xl mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-2">Genre</label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full select-dark rounded-lg"
              >
                <option value="">Any Genre</option>
                {GENRES.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Mood</label>
              <select
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="w-full select-dark rounded-lg"
              >
                <option value="">Any Mood</option>
                {MOODS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Era</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full select-dark rounded-lg"
              >
                <option value="">Any Era</option>
                {YEARS.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full select-dark rounded-lg"
              >
                <option value="">Any Language</option>
                {LANGUAGES.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-300"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Finding Movies...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Get Recommendations</span>
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="text-red-400 text-center mb-8">
            {error}
          </div>
        )}

        {movies.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {movies.map((movie, index) => (
              <MovieCard key={index} {...movie} />
            ))}
          </div>
        )}

        <footer className="mt-16 text-center">
          <div className="glass-effect rounded-xl p-6 max-w-4xl mx-auto">
            <div className="flex justify-center space-x-6 mb-4">
              <a
                href="https://github.com/aryan1112003"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 flex items-center space-x-2"
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/aryan-acharya-9b939b316/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 flex items-center space-x-2"
              >
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
            </div>
            <div className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Movie Oracle by Aryan Acharya. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
      
      {/* Watermark */}
      <div className="fixed bottom-0 right-0 p-4 text-gray-800/5 text-9xl font-bold pointer-events-none select-none">
        ARYAN
      </div>
    </div>
  );
}