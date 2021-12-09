import React from "react"
import styles from "./HeaderButton.module.less"
import cn from "classnames"

interface HeaderButtonProps {
    active: boolean
    onClick?: () => void
}

const HeaderButton: React.FC<HeaderButtonProps> = (
    {
        active,
        children,
        onClick
    }
) => {
    return (
        <button
            onClick={onClick}
            className={cn(styles.button, {[styles.active]: active})}
        >
            {children}
        </button>
    )
}

export default HeaderButton