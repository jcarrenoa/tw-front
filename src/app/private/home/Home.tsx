import ICSS from './index.module.css';
import logo_n from '@media/x_negro.png'
import logo_b from '@media/x_blanco.png'
import React from 'react';
import Menu from '@/components/private/Menu/Menu';
import Post from '@/components/private/Post/Post';
import TwitterFollowCard from '@/components/private/TwitterFollowCard/TwitterFollowCard';

interface type {
	mode: boolean;
}

function Home({ mode }: type) {
	const logo = mode ? logo_b : logo_n;

	return (
		<main className={ICSS['container']}>
			<header className={ICSS['menu']}>
				<div className={ICSS['logo-container']}>
					<img className={ICSS['logo']} src={logo} alt="logo-x" />
				</div>
				<Menu />
			</header>
			<section className={ICSS['post-container']}>
				<Post
					user="Aaron Rodriguez"
					userName="jcarrenoa"
					time="hace 2 horas"
				></Post>
			</section>
			<section className={ICSS['info-container']}>
				<div className={ICSS['followsCards']}>
					<TwitterFollowCard
						userName="jcarrenoa"
						initialIsFollowing={false}
					>
						Aaron Rodriguez
					</TwitterFollowCard>
					<TwitterFollowCard
						userName="django"
						initialIsFollowing={true}
					>
						Django Python
					</TwitterFollowCard>
				</div>
			</section>
		</main>
	);
}

export default Home;
