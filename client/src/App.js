import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import AddMovieForm from "./Movies/AddMovieForm";
import axios from "axios";
import UpdateMovieForm from "./Movies/UpdateMovieForm";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => setMovieList(res.data))
      .catch((err) => console.log(err.response));
  };

  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };

  const deleteFromSavedList = (id) => {
    setSavedList(savedList.filter((m) => Number(m.id) !== Number(id)));
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <div>
      <SavedList list={savedList} />
      <Switch>
        <Route path="/update-movie/:id">
          <UpdateMovieForm movies={movieList} updateMovieList={setMovieList} />
        </Route>
        <Route path="/add-movie">
          <AddMovieForm movies={movieList} updateMovieList={setMovieList} />
        </Route>

        <Route path="/movies/:id">
          <Movie
            addToSavedList={addToSavedList}
            deleteFromSavedList={deleteFromSavedList}
            updateMovieList={setMovieList}
            movies={movieList}
          />
        </Route>

        <Route exact path="/">
          <MovieList movies={movieList} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
//
// <Route path="/add-movie">
// <AddMovieForm movies={movieList} updateMovieList={setMovieList} />
// </Route>
// <Route path="/update-movie/:id">
// <UpdateMovieForm movies={movieList} updateMovieList={setMovieList} />
// </Route>

// <Route path="/movies/:id">
// <Movie addToSavedList={addToSavedList} updateMovieList={setMovieList} />
// </Route>
// <Route exact path="/">
// <MovieList movies={movieList} />
// </Route>
