import ICSS from './index.module.css'
import Menu from '@components/private/Menu/Menu'
import Post from '@components/private/Post/Post'
import FollowCard from '@components/private/TwitterFollowCard/TwitterFollowCard'
import logo_n from '@media/x_negro.png'
import logo_b from '@media/x_blanco.png'
import React from 'react'

interface type {
  mode: boolean
}

function Private({ mode }: type) { 

    const logo = mode ? logo_b : logo_n

    return (
      <main className={ICSS['container']}>
        <header className={ICSS['menu']}>
          <div className={ICSS['logo-container']}>
            <img className= {ICSS['logo']} src={logo} alt="logo-x" />
          </div>
          <Menu/>
        </header>
        <section className={ICSS['post-container']}>
          <header className={ICSS['item']}>
            <ul className={ICSS['post-list']}>
              <li className={ICSS['active']}>Para ti</li>
              <li>Siguiendo</li>
            </ul>
          </header>
          <div className={`${ICSS['write-post']} ${ICSS['item']}`}>
            <img className={ICSS['img-user']} src={`https://unavatar.io/${'jcarrenoa'}`} alt="write-user-post" />
            <div className={ICSS['write-post-container']}>
              <textarea className={ICSS['text-area']} placeholder="¿Qué está pasando?"></textarea>
              <div className={ICSS['post-actions']}>
                <button className={ICSS['btn-post']}>Publicar</button>
              </div>
            </div>
          </div>
          <div className={`${ICSS['posts']} ${ICSS['item']}`}>
            <Post user='Aaron Rodriguez' userName='jcarrenoa' time='hace 2 horas'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi, sapiente fugit neque maiores sunt dolores laborum dolor corrupti debitis nihil sint iusto cupiditate ad maxime alias animi? Itaque, suscipit veniam.</Post>
          </div>
        </section>
        <section className={ICSS['info-container']}>
          <div className={`${ICSS['follows-cards']} ${ICSS['item']}`}>
            <FollowCard userName='jcarrenoa' initialIsFollowing={false}>Aaron Rodriguez</FollowCard>
            <FollowCard userName='django' initialIsFollowing={true}>Django Python</FollowCard>
          </div>
        </section>
      </main>
    );
}

export default Private;