import React, {useState} from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {ReactComponent as CloseIcon} from "../../assets/img/close.svg";
import AdminFormForProduct from "../AdminFormForProduct/AdminFormForProduct";
import {IProducts} from "../../models/Interfaces";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {useEditProductMutation, useLazyGetDetailProductQuery} from "../../store/products/products.api";

interface IDialogEditProduct {
  product: IProducts,
  openEditor: boolean,
  setOpenEditor: (isOpenEditor: boolean) => void
}

const DialogEditProduct: React.FC<IDialogEditProduct> = ({product, openEditor, setOpenEditor}) => {

  const [editProduct, setEditProduct] = useState(product)
  const [editProductInfo] = useEditProductMutation();
  const [getProductInfo] = useLazyGetDetailProductQuery();
  const handleCloseEditor = () => {
    setOpenEditor(false)
  }

  const handleEditProduct = async () => {
    try {
      if (editProduct.title && editProduct.category && editProduct.price && editProduct.description &&
        editProduct.rating && editProduct.stock && editProduct.images && editProduct.text) {
        await editProductInfo(editProduct).unwrap()
        getProductInfo(String(editProduct.id))
        setOpenEditor(false)
      }
      else{
        alert("Fill in all fields, please")
      }
    } catch (err) {
      alert(String(err));
    }
  }

  return (
    <Dialog className='dialogEditor' open={openEditor} onClose={() => handleCloseEditor()}>
      <DialogTitle>
        <div className='dialogEditor__title'>Editor</div>
        <div className='dialog__close' onClick={() => handleCloseEditor()}>
          <CloseIcon/>
        </div>
      </DialogTitle>

      <DialogContent>
        <AdminFormForProduct newProduct={editProduct} setNewProduct={setEditProduct}/>
      </DialogContent>

      <DialogActions>
        <Button
          className="dialogEditor__buttonShopping"
          onClick={() => handleCloseEditor()}
          variant="outlined"
        >
          Cancel
        </Button>

        <div className='dialogEditor__order'>

          <Button
            className="dialogEditor__buttonOrder"
            onClick={handleEditProduct}
            variant="outlined"
            // disabled={}
          >
            Edit
          </Button>
        </div>

      </DialogActions>
    </Dialog>
  );
};

export default DialogEditProduct;