import React, { useState } from "react";
import Modal from "../UI/Modal";
import modelClasses from "../UI/Modal.module.css";
import axios from "axios";
import Button from "../UI/Button";
import btnClasses from "../UI/Button.module.css";

const DeleteProducts = (props) => {
  //   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  // console.log(props.prod)
  let _prodsList = props.prods;
  console.log({_prodsList});
  let _prodsIDList = _prodsList.map((prd) => prd.id);
  // if(props.prod.length == 1){
  //     let id = props.prod[0].id;
  //     let name = props.prod[0].name;
  // }

  function hideDeleteConfirm() {
    props.setShowDeleteConfirm(false);
  }
  //   function deleteHandler() {
  //     console.log("clicked on delete.");
  //     hideThreeDotsMenu();
  //     setShowDeleteConfirm(true);
  //   }
  async function deleteProd() {
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: props.token,
    };

    let response = await axios.put(deleteMultiURL, _prodsIDList, { headers });
    console.log("resp after del: ", response);
    if (response.status == 204) {
      props.onDelete(_prodsList);
    }
    hideDeleteConfirm();
  }

  return (
    <>
      {/* {showDeleteConfirm == true && ( */}
      <Modal
        className={modelClasses.confirmationModal}
        onClose={hideDeleteConfirm}
      >
        <p>
          Delete<br/>
          <strong>
            {_prodsList.map((prodDetail) => (
              <>
                {prodDetail.name}
                {_prodsList.length > 1 && <br />}
              </>
            ))}
          </strong>{" "}
          Product{_prodsList.length > 1 && "s"}?
        </p>
        <div className={btnClasses.btnGroup}>
          <Button onClick={deleteProd}>Yes</Button>
          &nbsp;
          <Button onClick={hideDeleteConfirm}>No</Button>
        </div>
      </Modal>
      {/* )} */}
    </>
  );
};

export default DeleteProducts;
