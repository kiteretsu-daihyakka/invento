import React from 'react'
import classes from './Title.module.css'

const TitleMedium = (props) => {
    return <h3 className={classes.title}>{props.children}</h3>
}
export default TitleMedium