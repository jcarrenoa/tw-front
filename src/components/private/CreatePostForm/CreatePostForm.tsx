import { useState } from 'react';
import { createTweet } from '../../../http/tweets';
import './CreatePostForm.module.css'
import * as Sentry from '@sentry/react';

function CreatePostForm() {
	const [content, setContent] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		setSuccess(false);

		try {
			await createTweet(content);
			setSuccess(true);
			setContent('');
		} catch (error) {
			Sentry.captureException(error);
			setError('No se pudo crear el tweet.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<h3>Crear Tweet</h3>
			<textarea
				value={content}
				onChange={(e) => setContent(e.target.value)}
				placeholder="¿Qué estás pensando?"
				required
			/>
			<button type="submit" disabled={loading}>
				{loading ? 'Creando...' : 'Publicar'}
			</button>
			{success && <p style={{ color: 'green' }}>Tweet publicado</p>}
			{error && <p style={{ color: 'red' }}>{error}</p>}
		</form>
	);
}

export default CreatePostForm;

