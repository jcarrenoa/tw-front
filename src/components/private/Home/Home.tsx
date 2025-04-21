import ICSS from './home.module.css'
import Menu from '@components/private/Menu/Menu'
import Post from '@components/private/Post/Post'
import FollowCard from '@components/private/TwitterFollowCard/TwitterFollowCard'
import logo_n from '@media/x_negro.png'
import logo_b from '@media/x_blanco.png'
import React, { useEffect, useState } from 'react'

interface type {
  mode: boolean
}

function Home({ mode }: type) { 

    const [seguir, setSeguir] = useState([{"_id": "",
            "name": "",
            "username": "",
            "createdAt": "",
            "updatedAt": ""}]);
    const logo = mode ? logo_b : logo_n

    useEffect (() => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODA1OWNhODliOGY1MjgxMTA5ZmRmZTYiLCJpYXQiOjE3NDUyMDM5MzZ9.wMMC36dLS59WVfcDgRXJ_Zj-FY9wB_xHG0rxWefP27Y';

      fetch("http://localhost:8083/api/users/", {
        headers: {
          "x-access-token": token
        }
      })
        .then((res) => res.json())
        .then((data) => setSeguir(data))
        .catch((err) => console.error("❌ Error al cargar perfil:", err));
    }, []);

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
            {seguir.map((user) => (
              <FollowCard key={user._id} userName={user.username} initialIsFollowing={true}>{user.name}</FollowCard>
            ))}
          </div>
        </section>
      </main>
    );
}

export default Home;