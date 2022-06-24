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
// import MainHeader from "../Header/MainHeader";

const Products = (props) => {
  document.title = "Products";
  const [showAddProduct, setShowAddProduct] = useState(false);
  let _data;
  let [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // let mounted = true;
    if (props.products == false){
      fetchProductsHandler();
    }
    // return () => (mounted = false);
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
    // props.setProducts([{id:-1,name:'',price:'',category:'Loading...'}])
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
        // console.log(data.results)
        // const transformProducts = data.map((productDetail) => {
        //   return {
        //     id: productDetail.id,
        //     name: productDetail.name,
        //     price: productDetail.price,
        //     category: productDetail.category,
        //   };
        // });
        // console.log(transformProducts);
        // props.setProducts(transformProducts);
        props.setProducts(data);
      })
      .catch((err) => console.log("some errors: ", err));
  }

  const addProductHandler = (newProduct) => {
    _data = {
      // id: 1,
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
  function deleteHandler(id, name) {
    props.setProducts((prevState) => {
      return prevState.filter((prod) => prod.id.toString() !== id);
    });
    console.log(name + " product deleted.");
  }

  function onEditHandler(id, name, price, category) {
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
  return (
    <Card>
      {/* <MainHeader/> */}
      {/* <h2>Products</h2> */}
      {/* <Button onClick={fetchProductsHandler}>Fetch Products</Button> */}
      {showAddProduct == true && (
        <Modal onClose={onCloseAddProductModal}>
          <AddProduct
            onAdd={addProductHandler}
            onClose={onCloseAddProductModal}
          />
        </Modal>
      )}

      <div className={classes.products}>
        {showAddProduct == false && (
          <div className={btnClasses.alignRight}>
            <Button onClick={addProductButtonHandler}>Add New Product</Button>
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
                id={`product${productData.id}`}
                key={productData.id}
                name={productData.name}
                price={productData.price}
                category={productData.category}
                onDelete={deleteHandler}
                onEdit={onEditHandler}
              />
            ))}
          </ul>
        ) : (
          <NoRecords entityName="Products" />
        )}
      </div>
    </Card>
  );
};

export default Products;
