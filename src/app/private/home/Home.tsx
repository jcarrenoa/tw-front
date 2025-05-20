import ICSS from './Home.module.css';
import Menu from '@components/private/Menu/Menu';
import Post from '@components/private/Post/Post';
import FollowCard from '@components/private/TwitterFollowCard/TwitterFollowCard';
import logo_n from '@media/x_negro.png';
import logo_b from '@media/x_blanco.png';
import { useEffect, useState, useMemo } from 'react';
import { allUsers } from '@http/user';
import { postUser, createTweet } from '@http/tweets';
import SentryErrorBoundary from '@components/SentryErrorBoundary';
import { useFeatureIsOn } from '@growthbook/growthbook-react';

interface type {
  mode: boolean;
  user: {
    name: string;
    username: string;
  } | null;
  isLoading: boolean;
  logout: () => void;
}

function Home({ mode, user, isLoading, logout }: type) {
  const [users, setUsers] = useState([
    { _id: '', name: '', username: '', createdAt: '', updatedAt: '' },
  ]);

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

  const suggestedUsers = useMemo(() => {
    return [...users].sort(() => Math.random() - 0.5).slice(0, 3);
  }, [users]);

  const [tweet, setTweet] = useState('');
  const logo = mode ? logo_b : logo_n;

  const fetchUsers = async () => {
    const aux = await allUsers();
    setUsers(aux);
  };

  const fetchPosts = async () => {
    const aux = await postUser();
    setPosts(aux);
  };

  const showPosts = useFeatureIsOn("show-posts");

  useEffect(() => {
    fetchUsers();
    fetchPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTweet(tweet);
    setTweet('');
    fetchUsers();
    fetchPosts();
  };

  return (
    <main className={ICSS['container']}>
      <header className={ICSS['menu']}>
        <div className={ICSS['logo-container']}>
          <img className={ICSS['logo']} src={logo} alt="logo-x" />
        </div>
        <Menu logoutUser={logout}/>
      </header>

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
          ) : showPosts ? (
            <SentryErrorBoundary>
              <div className={`${ICSS['posts']} ${ICSS['item']}`}>
                {posts.map((post) => (
                  <Post
                    key={post._id}
                    id={post._id}
                    user={post.user.name}
                    userName={post.user.username}
                    time={post.createdAt}
                    likes={post.likes}
                  >
                    {post.content}
                  </Post>
                ))}
              </div>
            </SentryErrorBoundary>
          ) : (
            <div className={ICSS['item']}>Los posts están desactivados temporalmente.</div>
          )}
      </section>

      <section className={`${ICSS['info-container']} ${ICSS['item']}`}>
        <h2>Personas para seguir</h2>
        <SentryErrorBoundary>
          <div className={ICSS['follows-cards']}>
            {suggestedUsers.map((user) => (
              <FollowCard
                key={user._id}
                userName={user.username}
                initialIsFollowing={false}
              >
                {user.name}
              </FollowCard>
            ))}
          </div>
        </SentryErrorBoundary>
      </section>
    </main>
  );
}

export default Home;
