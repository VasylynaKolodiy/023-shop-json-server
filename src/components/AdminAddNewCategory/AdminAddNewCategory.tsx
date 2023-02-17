import React, {useState} from 'react';
import {useAddNewCategoryMutation} from "../../store/products/products.api";
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import AdminFormForCategory from "../AdminFormForCategory/AdminFormForCategory";

const AdminAddNewCategory = () => {

  const initialCategory = {
    id: 0,
    name: "",
    image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6592"
  }

  const [newCategory, setNewCategory] = useState(initialCategory)
  const [addNewCategory] = useAddNewCategoryMutation();

  const handleAddNewCategory = async () => {
    try {
      if (newCategory.name && newCategory.image) {
        await addNewCategory(newCategory).unwrap()
        setNewCategory(initialCategory)
      } else {
        alert("Fill in all fields, please")
      }
    } catch (err) {
      alert(String(err));
    }
  }

  return (
    <section className='admin'>
      <AdminFormForCategory newCategory={newCategory} setNewCategory={setNewCategory}/>

      <Button
        className='admin__buttonAdd'
        variant="outlined"
        onClick={() => handleAddNewCategory()}
      >
        Add category
      </Button>

    </section>
  );
};

export default AdminAddNewCategory;