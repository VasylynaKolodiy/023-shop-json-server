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
  visibleName: string,
  image: string
}

export interface IUsers {
  email: string,
  password: string,
  name: string,
  role: string,
  avatar: string,
  basket: { item: [string] },
  history: {
    data: {
      number: {
        id: number,
        title: string,
        img: string,
        price: number,
        col: number,
      }
    }
  },
  id: number,
  GeneralsumInBasket: number
}

export interface IHistoryProduct {
  id: number,
  title: string,
  img: string,
  price: number,
  col: number
}

