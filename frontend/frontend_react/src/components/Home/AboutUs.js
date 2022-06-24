import React from 'react';
import Card from '../UI/Card';
import classes from './AboutUs.module.css'

const AboutUs = () =>{
    return <Card className={classes.quoteCard}>
        <div className={classes.quote}>
            Welcome to <span>Invento</span>,<br/>An Inventory Management site that aims to manage your products and categories.
        </div>
    </Card>
}

export default AboutUs