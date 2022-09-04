import React from "react";
import classes from "../UI/input.module.css";
import btnClasses from "../UI/Button.module.css";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import { useState } from "react";
import axios from "axios";
import { faCropSimple } from "@fortawesome/free-solid-svg-icons";
import TitleBig from "../UI/Titles/TitleBig";
import modalClasses from "../UI/Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";
import listClasses from '../UI/Lists.module.css';

const InvoiceForm = (props) =>{
    return <Modal>
        <form>
            {/* <label>Select Product</label>
            <label>Select Quantity</label>
            <label>Select Quantity</label> */}
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </form>
    </Modal>
}
export default InvoiceForm