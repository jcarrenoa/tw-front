import TFCCCS from './TwitterFollowCard.module.css'
import { useState, ReactNode } from 'react'

interface TwitterFollowCardProps {
  children: ReactNode
  userName?: string
  initialIsFollowing: boolean
}

export function TwitterFollowCard({
  children,
  userName = 'unknown',
  initialIsFollowing
}: TwitterFollowCardProps) {
  
  const [isFollowing, setIsFollowing] = useState<boolean>(initialIsFollowing)

  const isFollowingText = isFollowing ? 'Siguiendo' : 'Seguir'
  const isFollowingClass = isFollowing ? 'tw-followCard-button-following' : 'tw-followCard-button'

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing)
  }

  return (
    <article className={TFCCCS['tw-followCard']}>
      <header className={TFCCCS['tw-followCard-header']}>
        <img
          className={TFCCCS['tw-followCard-img']}
          src={`https://unavatar.io/${userName}`}
          alt="logo"
        />
        <div>
          <strong>{children}</strong>
          <span>@{userName}</span>
        </div>
      </header>
      <aside>
        <button className={TFCCCS[isFollowingClass]} onClick={handleFollowClick}>
          <span className={TFCCCS['tw-followCard-text']}>{isFollowingText}</span>
          <span className={TFCCCS['tw-followCard-noFollowing']}>Dejar de Seguir</span>
        </button>
      </aside>
    </article>
  )
}

export default TwitterFollowCard