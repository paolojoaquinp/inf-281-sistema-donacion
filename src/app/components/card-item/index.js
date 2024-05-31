import React from "react";
import { CardItemStyles } from "./card-item-styled";

const CardItem = ({ item, onAddToCart }) => {
    return (
        <CardItemStyles>
            <span className="titulo-item">{item.title}</span>
            <img src={item.image} alt="" className="img-item"/>
            <span className="precio-item">{item.size}</span>
            <button className="boton-item" onClick={onAddToCart}>Agregar al Carrito</button>

            {item.total &&
                <p className="total-item">Total: {item.total}</p>

            }
        </CardItemStyles>
    );

}

export default CardItem;