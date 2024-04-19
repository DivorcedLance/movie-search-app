const API_KEY = '70c55c2d'

export async function searchMovies({ search }) {
  if (search==='') return null;
  let API_URL = `https://www.omdbapi.com/?s=${search}&apikey=${API_KEY}`

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    
    const movies = data.Search;
  
    return movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    }));
  } catch (error) {
    throw new Error('Error fetching movies');
  }
}