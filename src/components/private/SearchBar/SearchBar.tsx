import SBCSS from './SearchBar.module.css'
import { ReactNode } from 'react'

export function SearchBar({ children }: { children: ReactNode }) {
    const text = children as string
    return (
        <div className={SBCSS['search-bar']}>
            <input type="text" placeholder={text} name="buscar_unico_x123"/>
            <i className={`fas fa-search ${SBCSS['icono-input']}`}></i>
        </div>
    )
}

export default SearchBar