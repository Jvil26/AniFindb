import React, { useContext } from "react";
import FavoriteCard from "./FavoriteCard";
import AuthError from "./AuthError";
import "../App.css";
import UserContext from "../UserContext";

export default function Favorites(props) {
  const { dark_mode, userToken, setUser } = props;

  const currentUser = useContext(UserContext);

  if (!userToken) {
    return <AuthError />;
  } else {
    let columns = [];
    let index = 0;
    let favoritesArr = currentUser.favorites.sort((a, b) =>
      a.category.localeCompare(b.category)
    );
    let charIndex = favoritesArr.findIndex(
      (item) => item.category === "character"
    );
    let mangaIndex = favoritesArr.findIndex(
      (item) => item.category === "manga"
    );
    favoritesArr.forEach((item, idx) => {
      if (idx === 0) {
        columns.push(
          <div
            className={"w-100 mt-4 " + (dark_mode ? "text-light" : "text-dark")}
            key={idx + 200}
          >
            <h1>Animes</h1>
          </div>
        );
      }
      if (idx === charIndex) {
        index = 0;
        columns.push(
          <div
            className={"w-100 mt-2 " + (dark_mode ? "text-light" : "text-dark")}
            key={idx + 300}
          >
            <h1>Characters</h1>
          </div>
        );
      }
      if (idx === mangaIndex) {
        index = 0;
        columns.push(
          <div
            className={"w-100 mt-2 " + (dark_mode ? "text-light" : "text-dark")}
            key={idx + 400}
          >
            <h1>Mangas</h1>
          </div>
        );
      }
      columns.push(
        <div className="col-4 mt-4 mb-4" key={idx}>
          <FavoriteCard
            dark_mode={dark_mode}
            setUser={setUser}
            favoriteItem={item}
          />
        </div>
      );
      if ((index + 1) % 3 === 0) {
        columns.push(<div className="w-100" key={idx + 200}></div>);
      }
      index++;
    });
    return (
      <div
        className={
          "container animeList-container " + (dark_mode ? "darkBG" : "")
        }
      >
        {<div className="row">{columns}</div>}
      </div>
    );
  }
}
