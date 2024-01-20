import { useEffect, useState } from "react";
import "./App.scss";

const URL =
  "https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div className="row u-equal-height wrapper">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

function Post({ post }) {

  const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const author = post._embedded.author[0];

  return (
    <div className="p-card-blog col-4 u-no-padding">
      <header className="p-card-header">
        <p>CLOUD AND SERVER</p>
      </header>
      <div className="p-card__content p-card__inner">
        <img
          className="p-card__image" alt="" src={post.featured_media}
        />
        <h4>
          <a href={post.link} alt="" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        </h4>
        <p>
          <em >
            By <a href={author.link}>{author.name}</a> on {formattedDate}
          </em>
        </p>
      </div>
      <p className="post-p-card__footer">Article</p>
    </div>
  );
}

export default App;
