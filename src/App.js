import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList.js';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SeachBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourite from './components/RemoveFavourites';

const App = () => {
  const [movies, setMovies] = useState([]); //Store all movies
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=4d743418`; // Add input in to URL

    const response = await fetch(url); //Calls API
    const responseJson = await response.json(); // Convert it to json the response from api

    if (responseJson.Search) { // if value isnt empty. 
      setMovies(responseJson.Search); // set it into useState 
    }

  };

  useEffect(() => { // always get called on first render
    getMovieRequest(searchValue); // passing empty value (Users input in searchbox)
  }, [searchValue]);



  const addFavouriteMovie = (movie) => { 
    const newFavouriteList = [...favourites, movie]
    setFavourites(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favorite) => favorite.imdbID !==movie.imdbID
    );

    setFavourites(newFavouriteList);
  };

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-item-center mt-4 mb-4'>
        <MovieListHeading heading='Filmer' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='row'>
        <MovieList movies={movies}
          handleFavouritesClick={addFavouriteMovie} 
          favouriteComponent={AddFavourites} />
      </div>

      <div className='row d-flex align-item-center mt-4 mb-4'>
        <MovieListHeading heading='Favoriter' />
      </div>
      <div className='row'>
        <MovieList 
          movies={favourites}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourite} 
          />
      </div>

    </div>);
};

export default App;
