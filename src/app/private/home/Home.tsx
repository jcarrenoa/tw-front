import ICSS from './Home.module.css'
import Menu from '@components/private/Menu/Menu'
import Post from '@components/private/Post/Post'
import FollowCard from '@components/private/TwitterFollowCard/TwitterFollowCard'
import logo_n from '@media/x_negro.png'
import logo_b from '@media/x_blanco.png'
import React, { useEffect, useState } from 'react'
import { allUsers } from '@http/user'
import { postUser } from '@http/tweets'

interface type {
  mode: boolean
}

function Home({ mode }: type) { 

    const [users, setUsers] = useState([{"_id": "",
            "name": "",
            "username": "",
            "createdAt": "",
            "updatedAt": ""}])

    const [posts, setPosts] = useState([{
      "_id": "",
      "content": "",
      "user": {
        "_id": "",
        "name": "",
        "username": ""
      },
      "createdAt": "2025-04-21T07:00:41.987+00:00"
    }])

    const logo = mode ? logo_b : logo_n

    useEffect(() => {
      const user = async() => {
        const aux = await allUsers()
        setUsers(aux)
      } 
      const post = async() => {
        const aux = await postUser()
        setPosts(aux)
      }
      user()
      post()
    }, [])

    console.log(posts)

    return (
      <main className={ICSS['container']}>
        <header className={ICSS['menu']}>
          <div className={ICSS['logo-container']}>
            <img className= {ICSS['logo']} src={logo} alt="logo-x" />
          </div>
          <Menu/>
        </header>
        <section className={ICSS['post-container']}>
          <div className={`${ICSS["tweet-box"]} ${ICSS['item']}`}>
            <img className={ICSS['img']} src={`https://unavatar.io/${posts[0].user.username}`} alt="" />
            <div className={ICSS["tweet-input-container"]}>
              <textarea placeholder="¿Qué está pasando?" className={ICSS["tweet-input"]}></textarea>
              <div className={ICSS["tweet-actions"]}>
                <button className={ICSS["btn"]}>Publicar</button>
              </div>
            </div>
          </div>
          <div className={`${ICSS['post-list']} ${ICSS['item']}`}>
            {posts.map((post) => {
              return (
                <Post key={post._id} user={post.user.name} userName={post.user.username} time={post.createdAt}>
                  {post.content}
                </Post>
              )
            })}
          </div>
        </section>
        <section className={`${ICSS['info-container']} ${ICSS['item']}`}>
          <h2>Personas para seguir</h2>
          <div className={ICSS['follows-cards']}>
            {users.slice(0, 3).map((user) => {
              return (
                <FollowCard key={user._id} userName={user.username} initialIsFollowing={false}>
                  {user.name}
                </FollowCard>
              )
            }
            )}
          </div>
        </section>
      </main>
    );
}

export default Home;