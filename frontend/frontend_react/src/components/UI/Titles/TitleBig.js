import React from 'react'
import classes from './Title.module.css'

const TitleBig = (props) => {
    return <h2 className={`${classes.title} ${props.className}`}>{props.children}</h2>
}
export default TitleBig