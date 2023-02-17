import React, {useEffect, useState} from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {ReactComponent as CloseIcon} from "../../assets/img/close.svg";
import {ICategories, IProducts} from "../../models/Interfaces";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import AdminFormForCategory from "../AdminFormForCategory/AdminFormForCategory";
import {useEditCategoryMutation, useLazyGetCategoriesQuery} from "../../store/products/products.api";

interface IDialogEditCategory {
  category: ICategories,
  openEditor: boolean,
  setOpenEditor: (isOpenEditor: boolean) => void
}

const DialogEditCategory: React.FC<IDialogEditCategory> = ({category, openEditor, setOpenEditor}) => {

  const [newCategory, setNewCategory] = useState(category)
  const [editCategoryInfo] = useEditCategoryMutation();
  const [getCategoryInfo] = useLazyGetCategoriesQuery();

  useEffect(() => {
    if(category) setNewCategory(category)
  }, [category])

  const handleCloseEditor = () => {
    setOpenEditor(false)
  }

  const handleEditCategory = async () => {
    try {
      if (newCategory.name && newCategory.image) {
        await editCategoryInfo(newCategory).unwrap()
        getCategoryInfo(String(newCategory.id))
        setOpenEditor(false)
      } else {
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
        <AdminFormForCategory newCategory={newCategory} setNewCategory={setNewCategory}/>
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
            onClick={handleEditCategory}
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

export default DialogEditCategory;