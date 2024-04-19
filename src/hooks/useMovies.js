import { useCallback, useMemo, useRef, useState } from 'react';
import { searchMovies } from '../services/movies';

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  
  const previousSearch = useRef(search);
    
  const getMovies = useCallback(async ({ search }) => {
    if (previousSearch.current === search) return;

    try {
      setLoading(true);
      setError(null);
      previousSearch.current = search;
      const movies = await searchMovies({ search });
      setMovies(movies);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies])

  return { movies: sortedMovies, getMovies, loading }
}