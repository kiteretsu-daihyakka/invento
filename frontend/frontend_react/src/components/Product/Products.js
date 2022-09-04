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
      stock: newProduct.stock,
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
  function onEditHandler(editedProd) {
    hideEditProductModal();
    // let { id, name, price, category } = editedProd;
    console.log({ editedProd });
    props.setProducts((prevState) => {
      return prevState.map((prod) => {
        if (prod.id.toString() == editedProd.id.toString()) {
          prod["name"] = editedProd.name;
          prod["price"] = editedProd.price;
          prod["stock"] = editedProd.stock;
          console.log("updated stock and details: ", editedProd.stock);
          prod["category"] = editedProd.category;
        }
        return prod;
      });
    });
    setSelected(new Set());
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
    <>
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
        <Card>
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
            <table className={classes.productTable}>
              <thead>
                <tr className="heading">
                  <th></th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {props.products.map((productData) => (
                  <Product
                    id={productData.id}
                    key={productData.id}
                    name={productData.name}
                    price={productData.price}
                    stock={productData.stock}
                    category={productData.category}
                    categories={props.categories}
                    onDelete={deleteHandler}
                    onEdit={onEditHandler}
                    selectedList={selectedList}
                    removeFromSelectedList={removeFromSelectedList}
                    setShowDeleteConfirm={setShowDeleteConfirm}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <NoRecords entityName="Products" />
          )}
        </Card>
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
            stock={selected[0].stock}
            cat={selected[0].category}
            categories={props.categories}
          />
        )}
      </div>
    </>
  );
};
export default Products;
