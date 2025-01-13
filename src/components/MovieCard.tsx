import React from 'react';
import { Star, Calendar, Quote } from 'lucide-react';

interface MovieCardProps {
  title: string;
  year: string;
  plot: string;
  rating: string;
}

export function MovieCard({ title, year, plot, rating }: MovieCardProps) {
  return (
    <div className="movie-card glass-effect rounded-xl overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-100">{title}</h3>
          <div className="flex items-center bg-yellow-500/20 px-3 py-1 rounded-full">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="ml-1 text-sm font-medium text-yellow-400">{rating}</span>
          </div>
        </div>
        
        <div className="flex items-center mb-4 text-gray-400">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">{year}</span>
        </div>
        
        <div className="relative">
          <Quote className="w-4 h-4 text-indigo-400 absolute -left-2 -top-2 opacity-50" />
          <p className="text-gray-300 text-sm leading-relaxed pl-4">{plot}</p>
        </div>
      </div>
    </div>
  );
}