import React from 'react'
import classes from './NoRecords.module.css'
const NoRecords = (props) => {
    return <div className={classes.noRecords}>No {props.entityName} Found.</div>
}
export default NoRecords