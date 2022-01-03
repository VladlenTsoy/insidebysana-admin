import React from "react"
import styles from "./Container.module.less"
import cn from "classnames"

interface ContainerProps {
    padding?: string
    full?: boolean;
}

const Container: React.FC<ContainerProps> = (
    {
        full,
        padding = "2rem 1rem",
        children
    }
) => {
    return (
        <div className={styles.container}>
            <div
                className={cn(styles.content, {[styles.full]: full})}
                style={{padding: padding}}
            >
                {children}
            </div>
        </div>
    )
}

export default Container