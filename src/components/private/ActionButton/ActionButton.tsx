import  ABCSS from './ActionButton.module.css'
import { useNavigate } from 'react-router';

interface ActionButtonProps {
  icon: string;
  count: number;
  tipo: string;
  action?: () => void;
    tweetId?: string;
}

export function ActionButton({ icon, count, tipo, tweetId, action }: ActionButtonProps) {
    const navigate = useNavigate()

    const handleClick = () => {
      if (action) action();
        if (tipo === 'comment') {
            navigate(`/comments/${tweetId}`)
        } else if (tipo === 'retweet') {
            return
        } else if (tipo === 'like') {
            return
        } else if (tipo === 'chart') {
            return
        }
    }

  return (
    <button
      className={`${ABCSS['btn']} ${ABCSS[tipo]}`} onClick={ handleClick}
    >
      <i className={icon}></i>
      <span>{count}</span>
    </button>
  );
}

export default ActionButton;
