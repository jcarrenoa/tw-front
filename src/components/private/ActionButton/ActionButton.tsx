import './ActionButton.css'

interface ActionButtonProps {
    icon: string
    count: number
    tipo: string
}

export function ActionButton({ icon, count, tipo }: ActionButtonProps) {
    return (
        <button className={ tipo }>
            <i className={ icon }></i>
            <span>{ count }</span>
        </button>
    )
}

export default ActionButton