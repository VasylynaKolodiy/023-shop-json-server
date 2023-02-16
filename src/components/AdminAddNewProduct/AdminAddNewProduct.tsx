import React, {useState} from 'react';
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import TextField from "@mui/material/TextField";
import './AdminAddNewProduct.scss'
import {useAddNewProductMutation, useGetCategoriesQuery} from "../../store/products/products.api";
import {ICategories} from "../../models/Interfaces";

const AdminAddNewProduct = () => {
  const initialProduct = {
    title: "",
    price: 0,
    description: "",
    category: "",
    images: ["https://api.lorem.space/image/furniture?w=640&h=480&r=4053"],
    rating: 0,
    stock: 0,
    text: ""
  }

  const [newProduct, setNewProduct] = useState(initialProduct)
  const {data: categories = []} = useGetCategoriesQuery(null, {refetchOnMountOrArgChange: true});
  const [addNewProduct] = useAddNewProductMutation();

  const handleAddNewProduct = async () => {
    try {
      if (newProduct.title && newProduct.category && newProduct.price && newProduct.description) {
        await addNewProduct(newProduct).unwrap()
      }
    } catch (err) {
      alert(String(err));
    }
  }

  return (
    <section className='admin'>

      <div className="admin__group">
        <TextField
          autoFocus
          margin="dense"
          id="product__title"
          label="Title"
          type="text"
          fullWidth
          variant="standard"
          value={newProduct.title}
          onChange={(event) => setNewProduct({...newProduct, title: event.target.value})}
        />

        <TextField
          autoFocus
          margin="dense"
          id="product__price"
          label="Price"
          type="number"
          fullWidth
          variant="standard"
          InputProps={{
            inputProps: {
              min: 1
            }
          }}
          value={newProduct.price}
          onChange={(event) => setNewProduct({...newProduct, price: Number(event.target.value)})}
        />
      </div>

      <div className="admin__group">
        <TextField
          autoFocus
          margin="dense"
          id="product__description"
          label="Description"
          type="text"
          fullWidth
          multiline={true}
          variant="standard"
          value={newProduct.description}
          onChange={(event) => setNewProduct({...newProduct, description: event.target.value})}
        />

        <TextField
          autoFocus
          margin="dense"
          id="product__text"
          label="Text"
          type="text"
          fullWidth
          multiline={true}
          variant="standard"
          value={newProduct.text}
          onChange={(event) => setNewProduct({...newProduct, text: event.target.value})}
        />
      </div>

      <div className="admin__group">
        <FormControl variant="standard">
          <InputLabel id="admin__labelCategory">Product category</InputLabel>
          <Select
            labelId="admin__labelCategory"
            className="admin__selectCategory"
            id="admin__selectCategory"
            value={newProduct.category}
            label="User category"
            onChange={(event) => setNewProduct({...newProduct, category: event.target.value})}
          >
            {categories.map((category: ICategories) =>
              <MenuItem value={category.name} key={category.id}>{category.name}</MenuItem>
            )}
          </Select>
        </FormControl>

        <TextField
          autoFocus
          margin="dense"
          id="product__images"
          label="Images"
          type="text"
          fullWidth
          variant="standard"
          value={newProduct.images[0]}
          onChange={(event) => setNewProduct({...newProduct, images: [event.target.value]})}
        />
      </div>

      <div className="admin__group">

        <TextField
          autoFocus
          margin="dense"
          id="product__rating"
          label="Rating"
          type="number"
          fullWidth
          variant="standard"
          InputProps={{
            inputProps: {
              min: 1,
              max: 5
            }
          }}
          value={newProduct.rating}
          onChange={(event) => setNewProduct({...newProduct, rating: Number(event.target.value)})}
        />

        <TextField
          autoFocus
          margin="dense"
          id="product__stock"
          label="Stock"
          type="number"
          fullWidth
          variant="standard"
          InputProps={{
            inputProps: {
              min: 1
            }
          }}
          value={newProduct.stock}
          onChange={(event) => setNewProduct({...newProduct, stock: Number(event.target.value)})}
        />
      </div>

      <Button
        className='admin__buttonAdd'
        variant="outlined"
        onClick={() => handleAddNewProduct()}
      >
        Add product
      </Button>

    </section>
  );
};

export default AdminAddNewProduct;