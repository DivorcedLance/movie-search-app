import { useEffect, useRef, useState } from "react";

export function useSearch() {
  const [search, updateSearch] = useState('');
  const [searchError, setSearchError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === '';
      return;
    }

    if (search === '') {
      setSearchError('Debes ingresar un texto para buscar');
      return;
    }

    if (search.length < 3) {
      setSearchError('Debes ingresar al menos 3 caracteres');
      return;
    }

    if (search.match(/^\d+$/)) {
      setSearchError('No se puede buscar una película con solo números');
      return;
    }

    setSearchError(null);
  }, [search]);

  return { search, updateSearch, searchError };
}