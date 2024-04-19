import './App.css';
import { Movies } from './components/Movies';

import { useCallback, useState } from 'react';
import { useMovies } from './hooks/useMovies';
import { useSearch } from './hooks/useSearch';

import debounce from 'just-debounce-it';

function App() {
  const [sort, setSort] = useState(false);
  const { search, updateSearch, searchError } = useSearch();
  const { movies, getMovies, loading } = useMovies({ search, sort });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceGetMovies = useCallback(
    debounce(search => {
      getMovies({ search });
    }, 300)
    , [getMovies]
  )

  const handleSubmit = (e) => {
    e.preventDefault();
    getMovies({ search });
  }

  const handleChange = (e) => {
    const newSearch = e.target.value;
    updateSearch(newSearch);
    debounceGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort);
  }

  return (
    <div className="page">

      <header>
        <h1>Movie Search App</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} name="query" placeholder="Avengers, Star Wars, ..." />
          <input type='checkbox' onChange={handleSort} checked={sort}/>
          <button type="submit">Buscar</button>
          
        </form>
        {searchError && <p style={{ color : 'red' }}>{searchError}</p>}
      </header>

      <main>
        {
          loading
          ? <p>Loading...</p> : <Movies movies={movies} />
        }
      </main>

    </div>
  );
}

export default App;
