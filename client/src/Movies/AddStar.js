import React from "react";
const AddStar = (props) => {
  return (
    <div className="add-star">
      <label htmlFor="stars">
        Stars
        <input
          type="text"
          name="stars"
          onChange={props.starChangeHandler}
          value={props.star}
          placeholder="Add a star"
        />
      </label>
      <button onClick={props.starAddHandler} className="addBtn">
        Add star
      </button>

      {props.movie.stars.map((star, index) => {
        return (
          <div className="star" key={index}>
            <p>{star}</p>
            <div onClick={() => props.starDeleteHandler(star)} className="x">
              X
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default AddStar;
