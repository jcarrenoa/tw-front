import MCSS from './Menu.module.css';
import { useState } from 'react';
import { MenuButton } from '../MenuButton/MenuButton';

interface MenuButtonProps {
    logoutUser: () => void;
}

export function Menu({logoutUser}: MenuButtonProps) {
    const [selected, setSelected] = useState('Home');

    const handleSelected = (text: string) => {
        setSelected(text);
        if (text === 'Logout') {
            logoutUser();
        }
    };

    return (
        <div className={MCSS.menu}>
            <MenuButton icon='fas fa-house' text='Home' selected={selected} OnSelected={handleSelected}></MenuButton>
            <MenuButton icon='fas fa-hashtag' text='Explore' selected={selected} OnSelected={handleSelected}></MenuButton>
            <MenuButton icon='fas fa-bell' text='Notifications' selected={selected} OnSelected={handleSelected}></MenuButton>
            <MenuButton icon='fas fa-envelope' text='Messages' selected={selected} OnSelected={handleSelected}></MenuButton>
            <MenuButton icon='fas fa-bookmark' text='Bookmarks' selected={selected} OnSelected={handleSelected}></MenuButton>
            <MenuButton icon='fas fa-list' text='Lists' selected={selected} OnSelected={handleSelected}></MenuButton>
            <MenuButton icon='fas fa-user' text='Logout' selected={selected} OnSelected={handleSelected}></MenuButton>
        </div>
    )
}

export default Menu;