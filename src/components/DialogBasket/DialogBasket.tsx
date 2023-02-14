import React, {useState} from 'react';
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

interface IDialogBasketProps {
  openBasket: boolean,
  setOpenBasket: (isOpenBasket: boolean) => void
}

const DialogBasket: React.FC<IDialogBasketProps> = ({openBasket, setOpenBasket}) => {

  const user = useAppSelector((state) => state.auth.user);

  let arr : number[] = []
  if (user?.basket?.length) {user.basket.map((prod: IProductInfo) => arr.push(prod.price))}
  const [totalPriceArr, setTotalPriceArr] = useState<number[]>([...arr])
  let totalPrice = totalPriceArr.reduce((sum, elem) => +sum + +elem, 0)


  const handleCloseBasket = () => {
    setOpenBasket(false)
  }


  const handleBasket = () => {
  }



  return (
    <Dialog className='dialogBasket' open={Boolean(openBasket)} onClose={() => handleCloseBasket()}>
      <DialogTitle>
        <div className='dialogBasket__title'>Basket </div>
        <div className='dialogBasket__close' onClick={() => handleCloseBasket()}>
          <CloseIcon/>
        </div>
      </DialogTitle>
      <DialogContent>

        {user?.basket?.length > 0
          ? user.basket.map((product: IProductInfo, index: number) =>
            <BasketItem
              key={product.id}
              product={product}
              totalPrice={totalPriceArr}
              setTotalPrice={setTotalPriceArr}
              index={index}
            />)

          : <div>Your basket is empty</div>

        }

      </DialogContent>


      <DialogActions>
        <div className='dialogBasket__totalPrice'>
          {/*Total price: {totalPrice?.toLocaleString('en')}$*/}
          Total price: {totalPrice.toLocaleString('en')}$
        </div>
        <Button onClick={handleBasket}>Order</Button>
      </DialogActions>
    </Dialog>

  );
};

export default DialogBasket;