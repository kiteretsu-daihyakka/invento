import React from 'react';
import Card from '../UI/Card';
import classes from './AboutUs.module.css'

const AboutUs = () =>{
    return <Card className={classes.quoteCard}>
        <p className={classes.quote}>
            Welcome to Invento,<br/><br/>An Inventory Management site that aims to manage your products and categories.
        </p>
    </Card>
}

export default AboutUs