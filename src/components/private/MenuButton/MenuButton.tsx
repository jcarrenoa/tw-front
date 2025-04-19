import MBCSS from './MenuButton.module.css';

interface MenuButtonProps {
    icon: string;
    text: string;
    selected: string;
    OnSelected: (text: string) => void;
}

export function MenuButton({ icon, text, selected, OnSelected }: MenuButtonProps) {

    const isActive = selected === text;
    const spanClass = isActive ? 'is-selected' : '';

    return (
        <button className={MBCSS['menu-button']}onClick={() => OnSelected(text)}>
            <i className={ icon }></i>
            <span className={ MBCSS[spanClass] }>{text}</span>
        </button>
    );
}
