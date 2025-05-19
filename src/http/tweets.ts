import * as Sentry from '@sentry/react';
import api from '.';

export async function postUser() {
  const response = await api.get('/tweets');
  return response.data.data;
}

export async function createTweet(content: string) {
  try {
    const response = await api.post('/tweets', { content });
    return response.data;
  } catch (error) {
    Sentry.captureException(error);
    throw error;
  }
}

export async function deleteTweet(tweetId: string) {
  return await api.delete('/tweets', {
    data: { tweetId },
  });
}

export async function like(tweetId: string) {
  return await api.post('/tweets/likes', { like: 1, tweetId });
}

export async function dislike(tweetId: string) {
  return await api.post('/tweets/likes', { like: 0, tweetId });
}


export async function getTweetComments(tweetId: string) {
	const response = await api.get(`/tweets/comments/${tweetId}`);
	return response.data;
}

export async function createComment(tweetId: string, comment: string) {
  const response = await api.post('/tweets/comments', {
    comment, 
    tweetId,
  });
  return response.data;
}
