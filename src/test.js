const API_KEY = '70c55c2d'
let searchText = 'batman'
const API_URL = `https://www.omdbapi.com/?s=${searchText}&apikey=${API_KEY}`

const getMovie = async () => {
  const response = await fetch(API_URL)
  const data = await response.json()
  console.log(data)
}

getMovie();