import React, { useEffect, useState } from "react";
import axios from "axios";
import AddStar from "./AddStar";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
const initialMovie = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};
const UpdateMovieForm = (props) => {
  const [movie, setMovie] = useState(initialMovie);
  const [star, setStar] = useState("");
  const paramId = useParams();
  const history = useHistory();
  const [err, setErr] = useState("");
  //console.log("Number(paramId)", Number(paramId.id));
  //console.log("props.movies", props.movies);

  useEffect(() => {
    const selectedMovie = props.movies.find((movie) => {
      return movie.id === Number(paramId.id);
    });
    // console.log(selectedMovie);
    if (selectedMovie) {
      setMovie(selectedMovie);
    }
    //}, [paramId.id]);
  }, [props.movies, paramId.id]);

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
  console.log("movie", movie);
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
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then((res) => {
        console.log("res updateMovieForm", res);
        setErr("");
        props.updateMovieList(
          props.movies.map((m) => {
            if (Number(m.id) === Number(res.data.id)) {
              return res.data;
            } else return m;
          })
        );
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setErr("All fields must be filled out");
      });
  };
  console.log("movie.stars", movie.stars);

  return (
    <div className="update-movie">
      <h2 style={{ textAlign: "center" }}>Update Movie</h2>
      {err ? (
        <p className="error" style={{ textAlign: "center" }}>
          {err}
        </p>
      ) : null}
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
            placeholder="title"
            onChange={changeHandler}
            value={movie.title}
          />
        </label>
        <label htmlFor="director">
          Director
          <input
            type="text"
            name="director"
            placeholder="director"
            onChange={changeHandler}
            value={movie.director}
          />
        </label>
        <label htmlFor="metascore">
          Metascore
          <input
            type="text"
            name="metascore"
            placeholder="metascore"
            onChange={changeHandler}
            value={movie.metascore}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default UpdateMovieForm;

// <div>
// <label htmlFor="stars">
//   Stars
//   <input
//     type="text"
//     name="stars"
//     onChange={starChangeHandler}
//     value={star}
//     placeholder="Add a star"
//   />
// </label>
// <button onClick={starAddHandler}>Add star</button>

// {movie.stars.map((star, index) => {
//   return (
//     <div className="star" key={index}>
//       <p>{star}</p>
//       <div onClick={() => starDeleteHandler(star)} className="x">
//         X
//       </div>
//     </div>
//   );
// })}
// </div>
