import React from 'react';
import Card from "../UI/Card"

const Product = (props) => {
    return <li>
        {/* {props.name} {props.stock} {props.amount} */}
        {props.name}({props.category}) <br/><span>{parseInt(props.price)} Rs.</span>
    </li>
}

export default Product