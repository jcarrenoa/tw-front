import { useState, ReactNode } from 'react'
import './TwitterFollowCard.css'

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
    <article className="tw-followCard">
      <header className="tw-followCard-header">
        <img
          className="tw-followCard-img"
          src={`https://unavatar.io/${userName}`}
          alt="logo"
        />
        <div>
          <strong>{children}</strong>
          <span>{userName}</span>
        </div>
      </header>
      <aside>
        <button className={isFollowingClass} onClick={handleFollowClick}>
          <span className="tw-followCard-text">{isFollowingText}</span>
          <span className="tw-followCard-noFollowing">Dejar de Seguir</span>
        </button>
      </aside>
    </article>
  )
}