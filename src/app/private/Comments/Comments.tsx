import React, { useEffect, useState } from 'react';
import { getTweetComments } from '../../../http/tweets'
import './Comments.module.css';
import { useParams } from 'react-router-dom';

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export default function TweetCommentsView() {
  const { tweetId } = useParams();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getTweetComments(tweetId!);
        setComments(data.comments);
      } catch (err) {
        console.error('Error al cargar los comentarios:', err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [tweetId]);

  if (loading) return <p className="loading">Cargando comentarios</p>;

  return (
    <div className="comments-container">
      <h2>Comentarios</h2>
      <div className="scroll-area">
        {comments.length === 0 ? (
          <p>No hay comentarios aún.</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="comment">
              <p className="author">@{c.author}</p>
              <p>{c.content}</p>
              <span className="date">{new Date(c.createdAt).toLocaleString()}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

