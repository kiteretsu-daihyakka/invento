import React from "react";
import { useState, useEffect } from "react";
import Card from "../UI/Card";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import AddCategory from "./AddCategory";
import Category from "./Category";
import styles from "./Categories.module.css";

const Categories = () => {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  let _data;
  let [isLoading, setIsLoading] = useState(false);
  const categories_url = "http://127.0.0.1:8000/categories/api/";

  useEffect(() => {
    // let mounted = true;
    fetchCategories();
    // return () => (mounted = false);
  }, []);

  function fetchCategories() {
    setIsLoading(true);
    fetch(categories_url)
      .then((response) => {
        console.log("response>>", response);
        setIsLoading(false);
        return response.json();
      })
      .then((data) => {
        console.log("categories>>>", data);
        // console.log(data.results)
        // const transformCategories = data.map((categoeyDetail) => {
        //   return {
        //     id: categoeyDetail.id,
        //     name: categoeyDetail.name,
        //   };
        // });
        // console.log(transformCategories);
        setCategories(data);
      });
  }
  function insertCategory() {
    fetch(categories_url, {
      method: "POST",
      body: JSON.stringify(_data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "X-CSRFToken": document.getElementsByName("csrfmiddlewaretoken")[0]
          .value,
      },
    })
      .then((response) => response.json)
      .then((data) => console.log(data))
      .then((err) => console.log(err));
  }
  function onAddHandler(newCategory) {
    setCategories((prevState) => {
      _data = {
        name: newCategory.name,
      };
      insertCategory();
      return [newCategory, ...prevState];
    });
  }
  function addCategoryButtonHandler() {
    setShowAddCategory(true);
  }
  function onCloseAddCategoryModal() {
    setShowAddCategory(false);
  }
  return (
    <>
      {/* <h1>Categories</h1> */}
      {showAddCategory == true && (
        <Modal onClose={onCloseAddCategoryModal}>
          <AddCategory onAdd={onAddHandler} onClose={onCloseAddCategoryModal} />
        </Modal>
      )}
      
      <Card className={styles.categories}>
        {showAddCategory == false && (
          <Button onClick={addCategoryButtonHandler}>Add New Category</Button>
        )}
        {isLoading == true && (
          <ul>
            <li>
              <h3>Loading...</h3>
            </li>
          </ul>
        )}
        <ul>
          {categories.map((categoryData) => (
            <Category
              key={categoryData.id}
              id={categoryData.id}
              categoryName={categoryData.name}
            />
          ))}
        </ul>
      </Card>
    </>
  );
};

export default Categories;
