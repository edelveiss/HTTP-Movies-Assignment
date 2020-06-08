import React, { useEffect, useState } from "react";
import axios from "axios";
import AddStar from "./AddStar";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
const initialMovie = {
  title: "",
  director: "",
  metascore: 0,
  stars: [],
};
const AddMovieForm = (props) => {
  const [movie, setMovie] = useState(initialMovie);
  const [star, setStar] = useState("");
  const [formFilled, setFormFilled] = useState(true);
  const paramId = useParams();
  const history = useHistory();

  const changeHandler = (ev) => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === "metascore") {
      value = parseInt(value, 10);
    }

    setMovie({
      ...movie,
      [ev.target.name]: value,
    });
  };
  //console.log("movie", movie);
  const starChangeHandler = (ev) => {
    ev.persist();

    setStar(ev.target.value);
  };

  const starAddHandler = () => {
    setMovie({
      ...movie,
      stars: [...movie.stars, star],
    });
    setStar("");
  };

  const starDeleteHandler = (specificStar) => {
    setMovie({
      ...movie,
      stars: movie.stars.filter((st) => st !== specificStar),
    });
  };

  const handleSubmit = (e) => {
    console.log("movie.director", movie.director);
    if (!movie.title || !movie.director || !movie.metascore || !movie.stars) {
      console.log("fill out all fields", movie);
      setFormFilled(false);
    } else {
      //   console.log("fill out all fields");
      //   setFormFilled(false);
      e.preventDefault();

      axios
        .post("http://localhost:5000/api/movies", movie)
        .then((res) => {
          //console.log("res addMovieForm", res);
          setFormFilled(true);
          setMovie(initialMovie);
          props.updateMovieList(res.data);
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  //console.log("movie.stars", movie.stars);

  return (
    <div className="update-movie">
      <h2 style={{ textAlign: "center" }}>Add Movie</h2>
      <AddStar
        starChangeHandler={starChangeHandler}
        star={star}
        starAddHandler={starAddHandler}
        movie={movie}
        starDeleteHandler={starDeleteHandler}
      />
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
          Title
          <input
            id="title"
            type="text"
            name="title"
            onChange={changeHandler}
            value={movie.title}
          />
        </label>
        <label htmlFor="director">
          Director
          <input
            type="text"
            name="director"
            onChange={changeHandler}
            value={movie.director}
          />
        </label>
        <label htmlFor="metascore">
          Metascore
          <input
            type="text"
            name="metascore"
            onChange={changeHandler}
            value={movie.metascore}
          />
        </label>

        <button type="submit">Submit</button>
        {formFilled && <p className="error">Please, fill out all fields</p>}
      </form>
    </div>
  );
};
export default AddMovieForm;
