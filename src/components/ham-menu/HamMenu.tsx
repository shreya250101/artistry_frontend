import styles from './hammenu.module.css'

interface HamMenuProps {
    onClick: () => void
    open: boolean
}

export default function HamMenu({ onClick, open }: HamMenuProps) {
    return (
        <div onClick={onClick} className={`${styles.hamContainer} absolute`}>
            <div
                className={`bg-black mb-2 ${open ? styles.hamFirst : ''}`}
            ></div>
            {!open && <div className={`bg-black mb-2`}></div>}
            <div
                className={`bg-black absolute ${open ? styles.hamThird : ''}`}
            ></div>
        </div>
    )
}
