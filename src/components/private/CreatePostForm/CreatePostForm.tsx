import { useState } from 'react';
import { createTweet } from '../../../http/tweets';
import './CreatePostForm.module.css';
import * as Sentry from '@sentry/react';
import { useFeatureIsOn } from '@growthbook/growthbook-react';

function CreatePostForm() {
	const [content, setContent] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);

	const showNewPostUI = useFeatureIsOn('new-post-form-ui');

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

	if (showNewPostUI) {
		return (
			<form onSubmit={handleSubmit}>
				<h3>Nuevo Formulario Experimental 🧪</h3>
				<textarea
					value={content}
					onChange={(e) => setContent(e.target.value)}
					placeholder="Escribe tu nuevo tweet aquí..."
					required
					style={{ borderColor: '#00aced' }}
				/>
				<button type="submit" disabled={loading} style={{ backgroundColor: '#00aced', color: 'white' }}>
					{loading ? 'Enviando...' : 'Enviar Tweet 🚀'}
				</button>
				{success && <p style={{ color: 'green' }}>¡Tweet enviado correctamente!</p>}
				{error && <p style={{ color: 'red' }}>{error}</p>}
			</form>
		);
	}

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
			
			<p>{showNewPostUI}</p>	
		</form>
	);
}

export default CreatePostForm;

