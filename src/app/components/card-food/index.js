import React, {useState} from "react";
import { CardContainer, CardImage, CardBody, CardTitle, CardText, CardPrice, AddToCartButton } from "./card-food-styled";
import PrimaryButton from "../primary-button";
const Card = ({ product }) => {
    const [quantity, setQuantity] = useState(0);
    return (
      <CardContainer>
        <CardImage src={product.image} alt={product.name} />
        <CardBody>
          <CardTitle>{product.name}</CardTitle>
          <CardText>{product.description}</CardText>
          <CardPrice>{product.price}</CardPrice>
          <AddToCartButton>Añadir a la donacion</AddToCartButton>
          <div className="actions__container">
            <PrimaryButton color="red"
              onClick={() => {
                if (quantity > 0) {
                  setQuantity(quantity - 1)
                }
              }
            }
            >-</PrimaryButton>
            <p>{quantity}</p>
            <PrimaryButton color="green"
              onClick={() => setQuantity(quantity + 1)}
            >+</PrimaryButton>
          </div>
        </CardBody>
      </CardContainer>
    );
  };
  
  export default Card;