import React, { useContext, useState } from "react";
import "./my-blogs.css";
import useFetch from "../../useFetch";
import { AuthContext } from "../../authContext";
import Card from "../../components/Card/Card";
import MyBlogsTop from "../../components/MyBlogsTop/MyBlogsTop";

const MyBlogs = () => {
  const [query, setQuery] = useState("");
  const { user } = useContext(AuthContext);
  const { data, loading } = useFetch(`/entries/all/author`);

  const keys = ["title", "location", "date"];

  const handleOnChnage = (e) => {
    setQuery(e.target.value.toLowerCase());
  };
  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key] && item[key].toLowerCase().includes(query))
    );
  };

  return (
    <div className="home-container">
      <MyBlogsTop className="TopSection" onSearch={handleOnChnage} />
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
              text={item.text}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
