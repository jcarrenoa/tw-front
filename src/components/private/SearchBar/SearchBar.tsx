import { ReactNode } from 'react'
import './SearchBar.css'

export function SearchBar({ children }: { children: ReactNode }) {
    const text = children as string
    return (
        <div className="search-bar">
            <input type="text" placeholder={text} name="buscar_unico_x123"/>
            <i className="fas fa-search icono-input"></i>
        </div>
    )
}

export default SearchBar