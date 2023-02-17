import React from 'react';
import TextField from "@mui/material/TextField";
import {ICategories, IProducts} from "../../models/Interfaces";

interface IAdminFormForCategory {
  newCategory: ICategories,
  setNewCategory: (product: ICategories) => void
}

const AdminFormForCategory: React.FC<IAdminFormForCategory> = ({newCategory, setNewCategory}) => {
  return (
    <>
      <TextField
        label="Name"
        type="text"
        variant="standard"
        value={newCategory?.name}
        onChange={(event) => setNewCategory({...newCategory, name: event.target.value})}
      />

      <TextField
        label="Image"
        type="text"
        variant="standard"
        value={newCategory?.image}
        onChange={(event) => setNewCategory({...newCategory, image: event.target.value})}
      />
    </>
  );
};

export default AdminFormForCategory;