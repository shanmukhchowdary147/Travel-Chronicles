import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../useFetch";
import { AuthContext } from "../../authContext";
import "../MyBlogs/my-blogs.css";
import Card from "../../components/Card/Card";

const Explore = () => {
  const [query, setQuery] = useState("");
  const { user } = useContext(AuthContext);
  const { data, loading } = useFetch(`/entries/all/public`);
  console.log("flag data public:", data);

  const keys = ["title", "location", "date"];

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key] && item[key].toLowerCase().includes(query))
    );
  };

  return (
    <div>
      <div className="search">
        <div className="searchBar">
          <h2>Explore Public Entries</h2>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for Adventures"
              onChange={(e) => setQuery(e.target.value)}
            />
            <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
          </div>
        </div>
      </div>

      <div className="searchedPosts">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          search(data)?.map((item) => (
            <Card
              key={item._id} // Ensuring unique key
              _id={item._id}
              photos={item.photos}
              title={item.title}
              date={item.date}
              location={item.location}
              author={item.author.username}
              text={item.text}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Explore;
