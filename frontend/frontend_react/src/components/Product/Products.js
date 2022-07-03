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

const Products = (props) => {
  document.title = "Products";
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [selectMode, setSelectMode] = useState(true);
  const [selected, setSelected] = useState([]);

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
  function deleteHandler(prods) {
    let prodsIDs = prods.map((prd) => prd.id);
    console.log({prodsIDs})
    props.setProducts((prevState) => {
      return prevState.filter((prod) => !prodsIDs.includes(prod.id));
    });
    // console.log(name + " product deleted.");
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
  // function selectModeHandler() {
  //   setSelectMode((prevState) => !prevState);
  // }
  function selectedList(selectedProd) {
    console.log({selectedProd});
    setSelected((prevState) => {
      return [...prevState, selectedProd];
    });
  }
  function removeFromSelectedList(selectedProd) {
    setSelected((prevState) => {
      return prevState.filter((prod) => prod.id.toString() !== selectedProd.id);
    });
  }
  function deleteSelectedHandler() {
    console.log({selected});
    setShowDeleteConfirm(true);
  }
  async function deleteMultiple() {
    let nekota = localStorage.getItem("nekota");
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: nekota,
    };
    _data = [];
    selected.map((prodDetail) => _data.push(prodDetail.id));
    console.log({ _data });
    let resp = axios.put(deleteMultiURL, _data, { headers });
    let json = await resp;
    console.log({ json });
    props.setProducts((prevProducts) => {
      return prevProducts.filter((prod) => !_data.includes(prod.id.toString()));
    });
    // setSelected([]);
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
        {selected.length > 0 && (
          <div className={btnClasses.btnGroup}>
            <Button type="button" onClick={deleteSelectedHandler}>
              Delete Selected
            </Button>
            &nbsp;
            <Button>Change Category</Button>
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
                // selectMode={selectMode}
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
      </div>
    </Card>
  );
};

export default Products;
