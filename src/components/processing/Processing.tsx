import React from "react"
import {Switch} from "antd"
import styles from "./Processing.module.less"
import cn from "classnames"

interface ProcessingProps {
    isProcessing: boolean
    onChange: (val: boolean) => void
}

const Processing: React.FC<ProcessingProps> = ({isProcessing, onChange}) => {
    return (
        <>
            <label className={cn(styles.processing, {[styles.active]: isProcessing})}>
                <span>На обработку</span>
                <Switch onChange={onChange} checked={isProcessing} />
            </label>
        </>
    )
}

export default Processing
