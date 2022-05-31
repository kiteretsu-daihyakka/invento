import React from "react";
import Card from "../UI/Card";
import AddProduct from "./AddProduct";
import { useState, useEffect } from "react";
import Product from "./Product";
import Button from "../UI/Button";
import classes from "./Products.module.css";
import btnClasses from "../UI/Button.module.css";
import Modal from "../UI/Modal";

const Products = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [products, setProducts] = useState([]);
  let _data;
  let [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetchProductsHandler();
    return () => (mounted = false);
  }, []);

  function insertProductData() {
    // console.log(document.getElementsByName('csrfmiddlewaretoken'));
    // let formData = {..._data,};
    // console.log('log>>>>',JSON.stringify(_data));
    fetch(products_url, {
      method: "POST",
      body: JSON.stringify(_data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "X-CSRFToken": document.getElementsByName("csrfmiddlewaretoken")[0]
          .value,
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((err) => console.log(err));
  }
  function fetchProductsHandler() {
    const products_url = "http://127.0.0.1:8000/products/api/";
    // const products_url = "https://swapi.dev/api/people/1"
    // let headers = new Headers();
    // fetch("http://localhost:8000/products/")
    // , {
    //   mode: "cors",
    //   credentials: "include",
    //   method: "POST",
    //   headers: headers,
    // })
    // let headers = new Headers();

    // headers.append('Content-Type', 'application/json');
    // headers.append('Accept', 'application/json');
    // headers.append('Authorization', 'Basic ' + base64.encode(username + ":" +  password));
    // headers.append('Origin','http://localhost:3000');

    // headers = {}
    // setProducts([{id:-1,name:'',price:'',category:'Loading...'}])
    setIsLoading(true);
    fetch(products_url)
      .then((response) => {
        console.log(response);
        setIsLoading(false);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // console.log(data.results)
        const transformProducts = data.map((productDetail) => {
          return {
            id: productDetail.id,
            name: productDetail.name,
            price: productDetail.price,
            category: productDetail.category,
          };
        });
        console.log(transformProducts);
        setProducts(transformProducts);
      });
  }

  const addProductHandler = (newProduct) => {
    setProducts((currentProducts) => {
      _data = {
        id: 1,
        name: newProduct.name,
        category: newProduct.category,
        price: newProduct.price,
      };
      insertProductData();
      return [newProduct, ...currentProducts];
    });
  };
  function addProductButtonHandler() {
    setShowAddProduct(true);
  }
  function onCloseAddProductModal() {
    setShowAddProduct(false);
  }
  return (
    <>
      {/* <h2>Products</h2> */}
      {/* <Button onClick={fetchProductsHandler}>Fetch Products</Button> */}
      {showAddProduct == true && (
        <Modal onClose={onCloseAddProductModal}>
          <AddProduct onAdd={addProductHandler} onClose={onCloseAddProductModal}/>
        </Modal>
      )}

      <Card className={classes.products}>
        {showAddProduct == false && (
          <Button className={btnClasses.alignRight} onClick={addProductButtonHandler} >Add New Product</Button>
        )}
        {isLoading == true && (
          <ul>
            <li>
              <h3>Loading...</h3>
            </li>
          </ul>
        )}
        <ul>
          {products.map((productData) => (
            <Product
              key={Math.random().toString()}
              name={productData.name}
              price={productData.price}
              category={productData.category}
            />
          ))}
        </ul>
      </Card>
    </>
  );
};

export default Products;
