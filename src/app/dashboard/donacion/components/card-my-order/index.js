import React from "react";
import {CardMyOrderWrapper} from './card-my-order-styled';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

const CardMyOrder = ({ item, onIncrementItemCart, onDecrementItemCart, onRemoveFromCart }) => {
    return (
        <CardMyOrderWrapper>
        <img src={item.image} width="80px" alt="" />
        <div className="carrito-item-detalles">
            <span className="carrito-item-titulo">{item.title}</span>
            <div className="selector-cantidad">
                <button onClick={() => onDecrementItemCart(item)}>
                    <FaMinus color='black' size={14} />
                </button>
                <input type="text" value={item.quantity ?? 0} className="carrito-item-cantidad" disabled />
                <button onClick={() => onIncrementItemCart(item)}>
                    <FaPlus color='black' size={14} />
                </button>
            </div>
            <span className="carrito-item-precio">{item.size}</span>
        </div>
        <button className="btn-eliminar" onClick={() => onRemoveFromCart(item)}>
            <FaTrash color='black' size={20} />
        </button>
    </CardMyOrderWrapper>
    );
}

export default CardMyOrder;