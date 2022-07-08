import React from "react";
import Card from "../UI/Card";
import AddProduct from "./AddProduct";
import { useState, useEffect } from "react";
import Product from "./Product";
import Button from "../UI/Button";
import classes from "./Products.module.css";
import btnClasses from "../UI/Button.module.css";
import Modal from "../UI/Modal";
import NoRecords from "../Helpers/NoRecords";
import axios from "axios";
// import MainHeader from "../Header/MainHeader";
import DeleteProducts from "./DeleteProducts";
import EditProduct from "./EditProduct";

const Products = (props) => {
  document.title = "Products";
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState(new Set());

  let _data;

  useEffect(() => {
    // let mounted = true;
    console.log("effect cats: ", props.categories);
    if (props.products == false) {
      fetchProductsHandler();
    }
    // return () => (mounted = false);
  }, []);

  function insertProductData() {
    fetch(products_url, {
      method: "POST",
      body: JSON.stringify(_data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "X-CSRFToken": csrfToken,
      },
    })
      .then((response) => {
        console.log({ response });
        let dt = response.json();

        return dt;
      })
      .then((json) => {
        console.log({ json });
        console.log("res add prod id", json["id"]);
        // if (response.status === 201) {
        console.log("coming in 201 addproduct");
        props.setProducts((currentProducts) => {
          _data["id"] = json.id;
          console.log({ _data });
          return [_data, ...currentProducts];
        });
        // }
      })
      .catch((err) => console.log(err));
  }
  function fetchProductsHandler() {
    setIsLoading(true);
    fetch(products_url, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Token " + localStorage.getItem("nekota"),
      },
    })
      .then((response) => {
        console.log(response);
        setIsLoading(false);
        return response.json();
      })
      .then((data) => {
        console.log("product list data", data);
        props.setProducts(data);
      })
      .catch((err) => console.log("some errors: ", err));
  }

  const addProductHandler = (newProduct) => {
    _data = {
      name: newProduct.name,
      price: newProduct.price,
      category: newProduct.category,
    };
    insertProductData();
  };
  function addProductButtonHandler() {
    setShowAddProduct(true);
  }
  function onCloseAddProductModal() {
    setShowAddProduct(false);
  }
  function deleteHandler(prods) {
    let prodsIDs = prods.map((prd) => prd.id);
    console.log({ prodsIDs });
    props.setProducts((prevState) => {
      return prevState.filter((prod) => !prodsIDs.includes(prod.id));
    });
    // console.log(name + " product deleted.");
  }
  function showEditProductModal() {
    setShowEditProduct(true);
  }
  function hideEditProductModal() {
    setShowEditProduct(false);
  }
  function onEditHandler(id, name, price, category) {
    hideEditProductModal();
    console.log("new product detail: ", { id, name, price, category });
    props.setProducts((prevState) => {
      return prevState.map((prod) => {
        if (prod.id.toString() == id) {
          prod["name"] = name;
          prod["price"] = price;
          prod["category"] = category;
        }
        return prod;
      });
    });
  }
  function selectedList(selectedProd) {
    // console.log({selectedProd});
    setSelected((prevState) => {
      return [...prevState, selectedProd];
    });
  }
  function removeFromSelectedList(selectedProdID) {
    setSelected((prevState) => {
      return prevState.filter((prod) => prod.id !== selectedProdID);
    });
  }
  function deleteSelectedHandler() {
    console.log({ selected });
    setShowDeleteConfirm(true);
  }
  return (
    <Card>
      {/* <MainHeader/> */}
      {/* <h2>Products</h2> */}
      {/* <Button onClick={fetchProductsHandler}>Fetch Products</Button> */}
      {showAddProduct == true && (
        <Modal onClose={onCloseAddProductModal}>
          <AddProduct
            categories={props.categories}
            onAdd={addProductHandler}
            onClose={onCloseAddProductModal}
          />
        </Modal>
      )}

      <div className={classes.products}>
        {/* {showAddProduct == false && ( */}
        <div className={`${btnClasses.alignRight} ${btnClasses.paddingRight}`}>
          <Button onClick={addProductButtonHandler}>Add New Product</Button>
        </div>
        {/* )} */}
        {/* <Button onClick={selectModeHandler}>Select</Button> */}

        {selected.length >= 1 && (
          <div className={btnClasses.btnGroup}>
            {selected.length == 1 && (
              <Button type="button" onClick={showEditProductModal}>
                Edit
              </Button>
            )}
            &nbsp;
            <Button type="button" onClick={deleteSelectedHandler}>
              Delete
            </Button>
            {/* &nbsp;
            <Button>Change Category</Button> */}
          </div>
        )}
        {isLoading == true ? (
          <ul>
            <li>
              <h3>Loading...</h3>
            </li>
          </ul>
        ) : props.products.length > 0 ? (
          <ul>
            {props.products.map((productData) => (
              <Product
                id={productData.id}
                key={productData.id}
                name={productData.name}
                price={productData.price}
                category={productData.category}
                categories={props.categories}
                onDelete={deleteHandler}
                onEdit={onEditHandler}
                selectedList={selectedList}
                removeFromSelectedList={removeFromSelectedList}
                setShowDeleteConfirm={setShowDeleteConfirm}
              />
            ))}
          </ul>
        ) : (
          <NoRecords entityName="Products" />
        )}
        {showDeleteConfirm == true && (
          <DeleteProducts
            prods={selected}
            setShowDeleteConfirm={setShowDeleteConfirm}
            onDelete={deleteHandler}
          />
        )}
        {showEditProduct == true && (
          <EditProduct
            onEdit={onEditHandler}
            onClose={hideEditProductModal}
            productName={selected[0].name}
            productID={selected[0].id}
            price={selected[0].price}
            cat={selected[0].category}
            categories={props.categories}
          />
        )}
      </div>
    </Card>
  );
};
export default Products;
