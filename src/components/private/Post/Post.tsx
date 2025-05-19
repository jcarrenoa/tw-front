import PCSS from './Post.module.css';
import AButton from '@components/private/ActionButton/ActionButton';
import { like } from '@/http/tweets';
import { useState } from 'react';
import * as Sentry from '@sentry/react';

interface PostProps {
  id: string;
  user: string;
  userName: string;
  time: string;
  media?: string | null;
  likes: number;
  children: string | React.ReactNode;
  tweetId?: string
}

export function Post({
  id,
  user,
  userName,
  time,
  media,
  likes,
  children, 
  tweetId,
}: PostProps) {
  const [likeCount, setLikeCount] = useState(likes);
  const handleLike = async () => {
    try {
      const response = await like(id);
      setLikeCount((prev) => prev + 1);
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  return (
    <article className={PCSS['post']}>
      <img
        className={PCSS['img-user']}
        src={`https://unavatar.io/${userName}`}
        alt="user-post"
      />
      <div className={PCSS['post-container']}>
        <div className={PCSS['post-header']}>
          <strong>{user}</strong>
          <span>
            @{userName} · {new Date(time).toLocaleString()}
          </span>
        </div>
        <p>{children}</p>
        {media && <img src={media} alt="post-media" />}
        <div className={PCSS['post-actions']}>
          <AButton icon="far fa-comment" count={0} tipo="comment" tweetId={ id }/>
          <AButton icon="fas fa-retweet" count={0} tipo="retweet" />
          <AButton
            icon="far fa-heart"
            count={likeCount}
            action={handleLike}
            tipo="like"
          />
          <AButton icon="fas fa-chart-bar" count={0} tipo="chart" />
        </div>
      </div>
    </article>
  );
}

export default Post;
