import * as Sentry from '@sentry/react';
import React, { useEffect, useState } from 'react';
import { getTweetComments } from '../../../http/tweets';
import { createComment } from '../../../http/tweets';
import './Comments.module.css';
import { useParams } from 'react-router';

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export default function TweetCommentsView() {
  const { tid } = useParams();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [posting, setPosting] = useState(false);

  const load = async () => {
    try {
      const data = await getTweetComments(tid!);
      setComments(data.comments);
    } catch (err) {
      console.error('Error al cargar los comentarios:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  },[]);

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    console.log(tid)
    if (newComment.trim() === '') return;

    setPosting(true);
    try {
      await createComment(tid!, newComment);
      setNewComment('');
      await load(); //aqui recargo los comentarios
    } catch (error) {
      alert('Error al enviar comentario');
      Sentry.captureException(error);
    } finally {
      setPosting(false);
    }
  };

  if (loading) return <p className="loading">Cargando comentarios...</p>;

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
              <span className="date">
                {new Date(c.createdAt).toLocaleString()}
              </span>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Escribe tu comentario..."
          rows={3}
        />
        <button type="submit" disabled={posting}>
          {posting ? 'Enviando...' : 'Comentar'}
        </button>
      </form>
    </div>
  );
}


