import React, {useState} from 'react';
import './AdminAddNewProduct.scss'
import AdminFormForProduct from "../AdminFormForProduct/AdminFormForProduct";
import {Button} from "@mui/material";
import {useAddNewProductMutation} from "../../store/products/products.api";

const AdminAddNewProduct = () => {
  const initialProduct = {
    id: 0,
    title: "",
    price: 0,
    description: "",
    category: "",
    images: ["https://api.lorem.space/image/furniture?w=640&h=480&r=4053"],
    rating: 0,
    stock: 0,
    text: ""
  }

  const [addNewProduct] = useAddNewProductMutation();
  const [newProduct, setNewProduct] = useState(initialProduct)

  const handleAddNewProduct = () => {
    try {
      if (newProduct.title && newProduct.category && newProduct.price && newProduct.description &&
        newProduct.rating && newProduct.stock && newProduct.images && newProduct.text) {
        addNewProduct(newProduct).unwrap()
        setNewProduct(initialProduct)
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
      <AdminFormForProduct newProduct={newProduct} setNewProduct={setNewProduct}/>
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