import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [postsPresent, setPostsPresent] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [postsByUser, setPostsByUser] = useState(null);

  const fetchPostsByUser = async (userId) => {
    if (parseInt(userId, 10) >= 1) {
      try {
        const response = await window.fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}/posts/`
        );
        const json = await response.json();
        setAllPosts(json);
      } catch (err) {
        console.error('Problem fetching user ID: ', userId);
        return err;
      }
    }
  };

  const fetchPosts = async () => {
    if (postsPresent) {
      const response = await window.fetch(
        'https://jsonplaceholder.typicode.com/posts/'
      );
      const postJson = await response.json();
      setAllPosts(postJson);
    } else {
      setAllPosts([]);
    }
  };

  useEffect(() => {
    fetchPostsByUser(postsByUser);
  }, [postsByUser]);

  useEffect(() => {
    fetchPosts();
  }, [postsPresent]);

  function resetPosts() {
    setPostsPresent(true);
    setPostsByUser(null);
    fetchPosts();
  }

  function toggleAddPosts(event) {
    setPostsPresent(!postsPresent);
  }

  return (
    <div className="App">
      <h1>Hello, Blog Posts</h1>
      <button onClick={toggleAddPosts}>Click to Add Posts</button>
      <button onClick={resetPosts}>Click to Reset</button>
      <ol className="posts-list">
        {allPosts.map((post, index) => {
          post.id === 1 ? console.log({ post }) : void 0;
          return (
            <li key={index}>
              <h2>Title: {post.title}</h2>
              <p>Body {post.body}</p>
              <p>
                <a
                  href="#"
                  onClick={() => {
                    setPostsByUser(post.userId);
                  }}
                >
                  Author ID: {post.userId}
                </a>
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default App;
