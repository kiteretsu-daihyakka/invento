import React from "react";
import { useState, useEffect } from "react";
import Card from "../UI/Card";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import AddCategory from "./AddCategory";
import Category from "./Category";
import styles from "./Categories.module.css";
import NoRecords from "../Helpers/NoRecords";
import btnClasses from "../UI/Button.module.css";
import axios from "axios";
import MainHeader from "../Header/MainHeader";
import CheckLogin from "../Auth/CheckLogin";

const Categories = (props) => {
  document.title = "Categories";
  const [showAddCategory, setShowAddCategory] = useState(false);
  
  let _data;
  let [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   console.log("categories state: ",props.categories)
  //   // let mounted = true;
  //   if (props.categories == false){
  //     fetchCategories();
  //   }
  //   // return () => (mounted = false);
  // }, []);

  function fetchCategories() {
    setIsLoading(true);
    props.loadCategories();
    setIsLoading(false);
  }
  async function insertCategory() {
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: "Token " + localStorage.getItem("nekota"),
    };
    let response = await axios.post(categories_url, _data, { headers });
    console.log("res ", response);
    if (response.status === 201) {
      setShowAddCategory(false);
      console.log("category added successfully!");
      _data["id"] = response.data["id"];
    } else {
      console.log("failed to create new category..");
      return false;
    }
  }
  function onAddHandler(newCategoryName) {
    _data = {
      name: newCategoryName,
    };
    insertCategory();
    props.setCategories((prevState) => {
      return [_data, ...prevState];
    });
  }
  function onEditHandler(id, newCategoryName) {
    props.setCategories((prevState) => {
      return prevState.map((cat) => {
        if (cat.id.toString() == id) {
          cat['name']= newCategoryName
        }
        return cat;
      });
    });
    console.log(`category changed to ${newCategoryName}.`);
  }
  function addCategoryButtonHandler() {
    setShowAddCategory(true);
  }

  function deleteHandler(id, name) {
    props.setCategories((prevState) => {
      return prevState.filter((cat) => cat.id.toString() !== id);
    });
    console.log(name + " category deleted.");
  }
  function onCloseAddCategoryModal() {
    setShowAddCategory(false);
  }
  return (
    <>
      {/* <MainHeader/> */}
      {/* <h1>Categories</h1> */}
      {showAddCategory == true && (
        <Modal onClose={onCloseAddCategoryModal}>
          <AddCategory onAdd={onAddHandler} onClose={onCloseAddCategoryModal} />
        </Modal>
      )}

      <div className={styles.categories}>
        {isLoading == true ? (
          <ul>
            <li>
              <h3>Loading...</h3>
            </li>
          </ul>
        ) : props.categories.length > 0 ? (
          <Card>
            {/* {showAddCategory == false && ( */}
              <div className={`${btnClasses.alignRight} ${btnClasses.paddingRight}`}>
                <Button onClick={addCategoryButtonHandler}>Add New Category</Button>
              </div>
            {/* )} */}
            <ul>
              {props.categories.map((categoryData) => (
                <Category
                  id={categoryData.id}
                  key={categoryData.id}
                  categoryName={categoryData.name}
                  className={styles.category}
                  onDelete={deleteHandler}
                  onEdit={onEditHandler}
                  token={props.token}
                />
              ))}
            </ul>
          </Card>
        ) : (
          <NoRecords entityName="Categories" />
        )}
      </div>
    </>
  );
};

export default Categories;
