import  ABCSS from './ActionButton.module.css'

interface ActionButtonProps {
    icon: string
    count: number
    tipo: string
}

export function ActionButton({ icon, count, tipo }: ActionButtonProps) {
    return (
        <button className={ ABCSS[tipo] }>
            <i className={ icon }></i>
            <span>{ count }</span>
        </button>
    )
}

export default ActionButton