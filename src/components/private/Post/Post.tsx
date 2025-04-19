import PCSS from './Post.module.css';
import AButton from '@components/private/ActionButton/ActionButton';

interface PostProps {
    user: string
    userName?: string
    time: string
    media: string | null
}

export function Post({ user, userName, time, media }: PostProps) {
    return (
        <article className={PCSS['post']}>
            <img className={PCSS['img-user']} src="https://unavatar.io/unknow" alt="user-post" />
            <div className={PCSS['post-container']}> 
                <div className={PCSS['post-header']}>
                    <strong>{ user }</strong>
                    <span>@{ userName } · { time }</span>
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio voluptate provident necessitatibus vitae rem eum illum nam pariatur praesentium? Odio modi aliquam earum porro numquam temporibus? Ea dolorum sed ipsa?</p>
                {media && <img src={media} alt="post-media" />}
                <div className={PCSS['post-actions']}>
                    <AButton icon="far fa-comment" count={0} tipo='comment' />
                    <AButton icon="fas fa-retweet" count={0} tipo='retweet' />
                    <AButton icon="far fa-heart" count={0} tipo='like'/>
                    <AButton icon="fas fa-chart-bar" count={0} tipo='chart' />
                </div>
            </div>
        </article>
    )
 }