import React, {useState} from 'react';
import {useAddNewCategoryMutation} from "../../store/products/products.api";
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";

const AdminAddNewCategory = () => {

  const initialCategory = {
    name: "",
    visibleName: "",
    image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6592"
  }

  const [newCategory, setNewCategory] = useState(initialCategory)
  const [addNewCategory] = useAddNewCategoryMutation();

  const handleAddNewCategory = async () => {
    try {
       if (newCategory.name && newCategory.visibleName && newCategory.image) {
        await addNewCategory(newCategory).unwrap()
         setNewCategory(initialCategory)
      }
       else{
         alert("Fill in all fields, please")
       }
    } catch (err) {
      alert(String(err));
    }
  }

  return (
    <section className='admin'>

      <TextField
        label="Name"
        type="text"
        variant="standard"
        value={newCategory.name}
        onChange={(event) => setNewCategory({...newCategory, name: event.target.value})}
      />

      <TextField
        label="VisibleName"
        type="text"
        variant="standard"
        value={newCategory.visibleName || newCategory.name}
        onChange={(event) => setNewCategory({...newCategory, visibleName: event.target.value})}
      />

      <TextField
        label="Images"
        type="text"
        variant="standard"
        value={newCategory.image}
        onChange={(event) => setNewCategory({...newCategory, image: event.target.value})}
      />

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