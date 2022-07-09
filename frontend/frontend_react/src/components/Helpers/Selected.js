import React from "react";

const Selected = (props) => {
    const [selected, setSelected] = useState(new Set());
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
}
export default Selected