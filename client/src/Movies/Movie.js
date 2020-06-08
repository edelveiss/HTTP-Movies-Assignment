import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({
  addToSavedList,
  updateMovieList,
  movies,
  deleteFromSavedList,
}) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory();
  console.log("param.id", params.id);
  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  const deleteMovie = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then((res) => {
        console.log("del res", res.data);
        deleteFromSavedList(params.id);
        updateMovieList(
          movies.filter((m) => Number(m.id) !== Number(res.data))
        );
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div
        className="save-button update-button"
        onClick={() => history.push(`/update-movie/${movie.id}`)}
      >
        Update
      </div>
      <div onClick={deleteMovie} className="save-button delete-button">
        Delete
      </div>
    </div>
  );
}

export default Movie;
