import React from 'react';
import './BasketItem.scss'
import {Link} from "react-router-dom"
import {ReactComponent as PlusIcon} from "../../assets/img/plus.svg";
import {ReactComponent as MinusIcon} from "../../assets/img/minus.svg";
import {ReactComponent as BinIcon} from "../../assets/img/bin.svg";
import {Button} from "@mui/material";
import {useEditBasketMutation} from "../../store/products/products.api";
import {useActions} from "../../hooks/actions";
import {useAppSelector} from "../../hooks/redux";

interface IBasketItemProps {
  index: number
}

const BasketItem: React.FC<IBasketItemProps> = ({index}) => {
    const user = useAppSelector((state) => state.auth.user);
    const newUsersProductCountData = {...user}
    const {loginUser} = useActions()
    const [calculateCount] = useEditBasketMutation();

    const handleCalculateCount = async (sign: number = 1) => {
      try {
        let result = await calculateCount({
          ...newUsersProductCountData,
          basket: [
            ...user.basket.slice(0, index),
            {
              ...user.basket[index],
              col: user.basket[index].col + sign
            },
            ...user.basket.slice(index + 1)
          ]
        }).unwrap()
        loginUser(result)
      } catch (err) {
        alert(String(err));
      }
    };

    const handleRemoveFromBasket = async () => {
      try {
        let result = await calculateCount({
          ...newUsersProductCountData,
          basket: [
            ...user.basket.slice(0, index),
            ...user.basket.slice(index + 1)
          ]
        }).unwrap()
        loginUser(result)
      } catch (err) {
        alert(String(err));
      }
    };

    return (
      <div className="basketItem">
        <div className="basketItem__image">
          <img src={user.basket[index].img} alt={user.basket[index].title}/>
        </div>

        <div className="basketItem__info">
          <div className="basketItem__title">
            <Link className="basketItem__link" to={`/${user.basket[index].id}`}>{user.basket[index].title}</Link>
          </div>

          <div className="basketItem__wrapper">
            <div className="basketItem__counter">
              <Button
                className="basketItem__plus"
                onClick={() => {
                  handleCalculateCount(1).then()
                }}
              >
                <PlusIcon/>
              </Button>

              <input
                className="basketItem__input"
                type="number"
                value={user.basket[index].col}
                min={1}
                readOnly={true}
              />

              <Button
                className="basketItem__minus"
                disabled={user.basket[index].col <= 1}
                onClick={() => {
                  handleCalculateCount(-1).then()
                }}
              >
                <MinusIcon/>
              </Button>
            </div>

            <div className="basketItem__price">
              {(user.basket[index].price * user.basket[index].col).toLocaleString('en')}$
            </div>

            <div className="basketItem__bin" onClick={() => handleRemoveFromBasket().then()}>
              <BinIcon/>
            </div>
          </div>
        </div>
      </div>
    );
  }
;

export default BasketItem;