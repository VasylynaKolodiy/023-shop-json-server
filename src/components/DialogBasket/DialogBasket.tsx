import React from 'react';
import "./DialogBasket.scss"
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {useAppSelector} from "../../hooks/redux";
import {IProductInfo} from "../../models/Interfaces";
import BasketItem from "../BasketItem/BasketItem";
import {ReactComponent as CloseIcon} from "../../assets/img/close.svg";
import {useActions} from "../../hooks/actions";

const DialogBasket = () => {
  const user = useAppSelector((state) => state.auth.user);
  const {openBasket} = useActions()
  const isOpen = useAppSelector((state) => state.auth.isOpenBasket);

  let totalPrice = user?.basket?.reduce((sum: number, elem: IProductInfo) => {
    return +sum + (+elem.col * +elem.price)
  }, 0)

  const handleCloseBasket = () => {
    openBasket(false)
  }

  const handleOrderBasket = () => {
  }

  return (
    <Dialog className='dialogBasket' open={isOpen} onClose={() => handleCloseBasket()}>
      <DialogTitle>
        <div className='dialogBasket__title'>Basket</div>
        <div className='dialog__close' onClick={() => handleCloseBasket()}>
          <CloseIcon/>
        </div>
      </DialogTitle>

      <DialogContent>
        {user?.basket?.length > 0
          ? user.basket.map((product: IProductInfo, index: number) =>
            <BasketItem
              key={product.id}
              index={index}
            />)
          : <div>Your basket is empty</div>
        }
      </DialogContent>

      <DialogActions>
        <Button onClick={() => handleCloseBasket()} variant="outlined">Shopping</Button>

        <div className='dialogBasket__order'>
          <div className='dialogBasket__totalPrice'>
            Total price: {totalPrice?.toLocaleString('en')}$
          </div>
          <Button onClick={handleOrderBasket} variant="outlined" disabled={!totalPrice}>Order</Button>
        </div>

      </DialogActions>
    </Dialog>
  );
};

export default DialogBasket;