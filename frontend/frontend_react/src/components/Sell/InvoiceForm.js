import React from "react";
import classes from "../UI/input.module.css";
import btnClasses from "../UI/Button.module.css";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import { useState, useEffect } from "react";
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
import listClasses from "../UI/Lists.module.css";

const InvoiceForm = (props) => {
  const [invoiceItems, setInvoiceItems] = useState([
    { SR_No: 1, productID: -1, price: "", quantity: "" },
  ]);
  // useEffect(() => {
  //   // $("#product-dd1").select2();
  // }, []);

  function onCloseHandler() {
    window.history.back();
  }
  function onSubmitHandler() {
    return;
  }
  function onAddNewHandler() {
    setInvoiceItems((prevState) => {
      let new_SR_No = prevState[prevState.length - 1]["SR_No"] + 1;
      prevState.push({
        SR_No: new_SR_No,
        productID: -1,
        price: "",
        quantity: "",
      });
      // console.log({ prevState });
      return prevState;
    });
  }
  const onItemChange = (e, propertyChange) => {
    const selectedSR = e.target.getAttribute("serial");
    console.log(selectedSR);
    let selectedProd = { price: "", quantity: "" };
    if (propertyChange == "product") {
      const selectedID = e.target.value;
      console.log(selectedID); // product ID selected
      if (selectedID != -1) {
        console.log("coming in if");
        selectedProd = props.products.filter(
          (prod) => prod.id == selectedID
        )[0];
        console.log(selectedProd);
        selectedProd["price"] = selectedProd.price.toString();
        selectedProd["quantity"] = "1";
      }
      setInvoiceItems((prevState) =>
        prevState.map((itm) => {
          if (itm.SR_No == selectedSR) {
            itm["productID"] = selectedID;
            itm["price"] = selectedProd["price"];
            itm["quantity"] = selectedProd["quantity"];
          }
          return itm;
        })
      );
    } else {
      console.log("coming in else");
      setInvoiceItems((prevState) => {
        prevState[selectedSR - 1][propertyChange] = e.target.value;
        console.log({ prevState });
        return prevState;
      });
    }
  };
  return (
    <Modal onClose={onCloseHandler}>
      <form>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoiceItems.map((item) => (
              <tr key={item.SR_No}>
                <td>
                  <select
                    name={`product-dd${item.SR_No}`}
                    id={`product-dd${item.SR_No}`}
                    onChange={(event) => onItemChange(event, "product")}
                    value={item.productID}
                    serial={item.SR_No}
                  >
                    <option value="-1" key="-1">
                      Select Product
                    </option>
                    {props.products.map((prod) => (
                      <option value={prod.id} key={prod.id}>
                        {prod.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    value={item.price}
                    name={`price${item.SR_No}`}
                    id={`price${item.SR_No}`}
                    onChange={(event) => onItemChange(event, "price")}
                    serial={item.SR_No}
                  />
                </td>
                <td>
                  <input
                    value={item.quantity}
                    name={`quantity${item.SR_No}`}
                    id={`quantity${item.SR_No}`}
                    onChange={(event) => onItemChange(event, "quantity")}
                    serial={item.SR_No}
                  />
                </td>
                <td>
                  <p>
                    <span>
                      {item.price != "" &&
                        `${parseInt(item.price) * parseInt(item.quantity)} Rs.`}
                    </span>
                  </p>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="*">
                <Button type="button" onClick={onAddNewHandler}>
                  New Item
                </Button>
              </td>
            </tr>
            <tr>
              <td>
                <Button type="button" onClick={onCloseHandler}>
                  Back
                </Button>
              </td>
              <td>
                <Button type="submit" onClick={onSubmitHandler}>
                  Continue
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </Modal>
  );
};
export default InvoiceForm;
