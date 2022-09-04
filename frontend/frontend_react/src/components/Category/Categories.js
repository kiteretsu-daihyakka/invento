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
import DeleteCategories from "./DeleteCategories";
import EditCategory from "./EditCategory";

const Categories = (props) => {
  document.title = "Categories";
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditCategory, setShowEditCategory] = useState(false);

  let _data;
  let [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState(new Set());
  function selectedList(selected) {
    // console.log({selectedProd});
    setSelected((prevState) => {
      return [...prevState, selected];
    });
  }
  function removeFromSelectedList(selectedID) {
    setSelected((prevState) => {
      return prevState.filter((cat) => cat.id !== selectedID);
    });
  }
  function deleteBtnHandler() {
    console.log("clicked on delete.");
    setShowDeleteConfirm(true);
  }
  function hideDeleteConfirm() {
    setShowDeleteConfirm(false);
  }
  function editBtnHandler() {
    setShowEditCategory(true);
  }
  // useEffect(() => {
  //   console.log("categories state: ",props.categories)
  //   // let mounted = true;
  //   if (props.categories == false){
  //     fetchCategories();
  //   }
  //   // return () => (mounted = false);
  // }, []);

  // function fetchCategories() {
  //   setIsLoading(true);
  //   props.loadCategories();
  //   setIsLoading(false);
  // }
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
  function hideEditCategoryModal() {
    setShowEditCategory(false);
  }
  function onEditHandler(id, newCategoryName) {
    hideEditCategoryModal();
    props.setCategories((prevState) => {
      return prevState.map((cat) => {
        if (cat.id.toString() == id) {
          cat["name"] = newCategoryName;
        }
        return cat;
      });
    });
    console.log(`category changed to ${newCategoryName}.`);
  }
  function addCategoryButtonHandler() {
    setShowAddCategory(true);
  }

  function deleteHandler(catIDs) {
    console.log({ catIDs });
    props.setCategories((prevState) => {
      return prevState.filter((cat) => !catIDs.includes(cat.id));
    });
  }
  function onCloseAddCategoryModal() {
    setShowAddCategory(false);
  }

  return (
    <>
      {/* <h1>Categories</h1> */}
      {showAddCategory == true ? (
        <Modal onClose={onCloseAddCategoryModal}>
          <AddCategory onAdd={onAddHandler} onClose={onCloseAddCategoryModal} />
        </Modal>
      ) : (
        <div className={`${btnClasses.alignRight} ${btnClasses.paddingRight}`}>
          <Button onClick={addCategoryButtonHandler}>Add New Category</Button>
        </div>
      )}
      <div className={styles.categories}>
        <Card>
          {isLoading == true ? (
            <ul>
              <li>
                <h3>Loading...</h3>
              </li>
            </ul>
          ) : props.categories.length > 0 ? (
            <>
              {selected.length >= 1 && (
                <div className={btnClasses.btnGroup}>
                  {selected.length == 1 && (
                    <Button type="button" onClick={editBtnHandler}>
                      Edit
                    </Button>
                  )}
                  &nbsp;
                  <Button type="button" onClick={deleteBtnHandler}>
                    Delete
                  </Button>
                </div>
              )}
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
                    selectedList={selectedList}
                    removeFromSelectedList={removeFromSelectedList}
                  />
                ))}
              </ul>
            </>
          ) : (
            <NoRecords entityName="Categories" />
          )}
        </Card>
      </div>
      {showEditCategory == true && (
        <EditCategory
          onEdit={onEditHandler}
          onClose={hideEditCategoryModal}
          categoryName={selected[0].name}
          categoryID={selected[0].id}
        />
      )}
      {showDeleteConfirm == true && (
        <DeleteCategories
          categories={selected}
          hideDeleteConfirm={hideDeleteConfirm}
          onDelete={deleteHandler}
        />
      )}
    </>
  );
};

export default Categories;
