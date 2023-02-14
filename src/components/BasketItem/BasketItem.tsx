import React, {useState} from 'react';
import './BasketItem.scss'
import {IProductInfo} from "../../models/Interfaces";
import {Link} from "react-router-dom"
import {ReactComponent as PlusIcon} from "../../assets/img/plus.svg";
import {ReactComponent as MinusIcon} from "../../assets/img/minus.svg";
import {ReactComponent as BinIcon} from "../../assets/img/bin.svg";
import {Button} from "@mui/material";

interface IBasketItemProps {
  product: IProductInfo,
  totalPrice: number[],
  setTotalPrice: (num: number[]) => void,
  index: number
}

const BasketItem: React.FC<IBasketItemProps> = ({product, totalPrice, setTotalPrice, index}) => {

  const [inputValue, setInputValue] = useState<number>(1)

  const calculateTotalPrice = (num: number) => {
    let arr = [...totalPrice]
    arr[index] = product.price * num
    setTotalPrice(arr)
  }

  return (
    <div className="basketItem">
      <div className="basketItem__image">
        <img src={product.img} alt={product.title}/>
      </div>
      <div className="basketItem__info">
        <div className="basketItem__title">
          <Link className="basketItem__link" to={`/${product.id}`}>{product.title}</Link>
        </div>

        <div className="basketItem__wrapper">
          <div className="basketItem__counter">
            <Button className="basketItem__plus" onClick={() => {
              setInputValue(Number(inputValue) + 1)
              calculateTotalPrice(inputValue + 1)
            }}>
              <PlusIcon/>
            </Button>
            <div>
              <input
                className="basketItem__input"
                type="number"
                value={inputValue}
                min={1}
                onChange={(e) => setInputValue(Number(e.target.value))}
              />
            </div>
            <Button className="basketItem__minus"
                    onClick={() => {
                      setInputValue(inputValue > 1 ? Number(inputValue) - 1 : 1)
                      calculateTotalPrice(inputValue> 1 ? inputValue - 1 : 1)
                    } }>
              <MinusIcon/>
            </Button>
          </div>
          <div className="basketItem__price">{(product.price * inputValue).toLocaleString('en')}$</div>

          <div className="basketItem__bin">
            <BinIcon/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketItem;