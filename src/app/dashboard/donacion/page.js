'use client'
import React, {useState, useContext} from "react";
import { DonacionStyles } from './donacion-styled';
import CardItem from "./components/card-item";
import MyOrder from "./components/my-order";
import CartContext from "@/app/context/cart";

const productItems = [
    {
        id: 1,
        title: "Chamarra para mujer",
        image: "/images/products/chamarramujer.png",
        size: "Talla M"
    },
    {
        id: 2,
        title: "Chamarra para hombre",
        image: "/images/products/chamarrahombre.png",
        size: "Talla L"
    },
    {
        id: 3, 
        title: "Chamarra para niño",
        image: "/images/products/chamarranino.png",
        size: "Talla S"
    },
    {
        id: 4,
        title: "Canguro para mujer",
        image: "/images/products/polomujer.png",
        size: "Talla S"
    },
    {
        id: 5,
        title: "Canguro para hombre",
        image: "/images/products/polohombre.png",
        size: "Talla M"
    },
    {
        id: 6,
        title: "Canguro para niño",
        image: "/images/products/polonino.png",
        size: "Talla S"
    },
    {
        id: 7,
        title: "Zapatillas para mujer",
        image: "/images/products/tennismujer.png",
        size: "Talla 35"
    },
    {
        id: 8,
        title: "Zapatillas para hombre",
        image: "/images/products/tennishombre.png",
        size: "Talla 39"
    },
    {
        id: 9,
        title : "Zapato para hombre",
        image: "/images/products/zapatohombre.png",
        size: "Talla 42"
    }
];

const Donacion = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { addToCart,
            itemExist,
            state: { cart }
          } = useContext(CartContext);
    return (
        <>
            <h1 style={{fontSize: '2.2rem' }}>Donacion</h1>
            <DonacionStyles
                isOpen={isCartOpen}
            >
                <div className="contenedor-items">
                    {productItems.map((item, index) => (
                        <CardItem key={index} item={item} 
                            onAddToCart={() => {
                                    if(!isCartOpen) {
                                        setIsCartOpen(true);
                                    }
                                    if(!itemExist(item)) {
                                        addToCart(item);
                                    }
                                }
                            }
                        />
                    ))}
                </div>
                <MyOrder 
                    cart={cart}
                    isOpen={isCartOpen}
                    setIsCartOpen={setIsCartOpen}
                />
            </DonacionStyles>
        </>
    );
}

export default Donacion;