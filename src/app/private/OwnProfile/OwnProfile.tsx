import ICSS from './Home.module.css';
import Post from '@components/private/Post/Post';
import { useEffect, useState } from 'react';
import { postUser, createTweet } from '@http/tweets';

interface type {
  mode: boolean;
  user: {
    name: string;
    username: string;
  } | null;
  isLoading: boolean;
}

function OwnProfile({ mode, user, isLoading }: type) {
  const [posts, setPosts] = useState([
    {
      _id: '',
      content: '',
      user: {
        _id: '',
        name: '',
        username: '',
      },
      likes: 0,
      createdAt: '2025-04-21T07:00:41.987+00:00',
    },
  ]);

  const [tweet, setTweet] = useState('');

  const fetchPosts = async () => {
    const aux = await postUser();
    setPosts(aux);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTweet(tweet);
    setTweet('');
    fetchPosts();
  };

  const handleDelete = async (tweetId: string) => {
    try {
      await fetch('/tweets', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}` // Ajusta esto si usas otra forma
        },
        body: JSON.stringify({ tweetId })
      });
      fetchPosts(); // Recargar la lista de publicaciones
    } catch (err) {
      console.error('Error al eliminar el tweet:', err);
    }
  };

  return (
    <main className={ICSS['container']}>
      <section className={ICSS['post-container']}>
        <header className={ICSS['item']}>
          <ul className={ICSS['post-list']}>
            <li className={ICSS['active']}>Para ti</li>
            <li>Siguiendo</li>
          </ul>
        </header>
        <div className={`${ICSS['tweet-box']} ${ICSS['item']}`}>
          <img
            className={ICSS['img']}
            src={
              user
                ? `https://unavatar.io/${user.username}`
                : `https://unavatar.io/unknow`
            }
            alt=""
          />
          <div className={ICSS['tweet-input-container']}>
            <form onSubmit={handleSubmit}>
              <textarea
                placeholder="¿Qué está pasando?"
                className={ICSS['tweet-input']}
                value={tweet}
                onChange={(e) => setTweet(e.target.value)}
              ></textarea>

              <div className={ICSS['tweet-actions']}>
                <button className={ICSS['btn']} type="submit">
                  Publicar
                </button>
              </div>
            </form>
          </div>
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className={`${ICSS['posts']} ${ICSS['item']}`}>
            {posts.map((post) => {
              return (
                <div key={post._id} style={{ position: 'relative' }}>
                  <Post
                    id={post._id}
                    user={post.user.name}
                    userName={post.user.username}
                    time={post.createdAt}
                    likes={post.likes}
                  >
                    {post.content}
                  </Post>
                  <button onClick={() => handleDelete(post._id)}>
                    Eliminar
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
export default OwnProfile;
