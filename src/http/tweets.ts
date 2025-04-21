import api from '.';

export async function createTweet(content: string) {
	try {
		const response = await api.post('/tweets', { content });
		return response.data;
	} catch (error) {
		console.error('Error al crear tweet:', error);
		throw error;
	}
}

export async function deleteTweet(tweetId: string) {
	return await api.delete('/tweets', {
		data: { tweetId }
	});
}
