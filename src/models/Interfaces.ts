import React from "react";

export interface IProducts {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  images: string[],
  rating: number,
  stock: number,
  text: string
}

export interface ICategories {
  id: number,
  name: string,
  image: string
}

export interface IUsers {
  email: string,
  password: string,
  name: string,
  role: string,
  avatar: string,
  basket: IProductInfo[],
  history: {
    data: IProductInfo[]
  },
  id: number,
  GeneralsumInBasket: number
}

export interface IProductInfo {
  id: number,
  title: string,
  img: string,
  price: number,
  col: number,
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}