'use client'
import React, {useState, useEffect, useContext} from "react";
import { DonacionStyles } from './donacion-styled';
import CardItem from "@/app/components/card-item";
import MyOrder from "@/app/components/my-order";
import CartContext from "@/app/context/cart";
import axios from 'axios';

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

const Solicitud = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { addToCart,
            itemExist,
            state: { cart }
          } = useContext(CartContext);
        
    const [items, setItems] = useState([]);
    const [solicitados, setSolicitados] = useState(null);

    const fetchProductosSolicitados = async () => {
        try {
           const response = await axios.get('http://localhost:3001/api/solicitudProducto/getAll')
            .then((response) => {
                const data = response.data;
                console.log("result solicitados", data);
                setSolicitados(data);
            });
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    const fetchItems = async () => {
        try {
            const rta = await axios.get('http://localhost:3001/api/producto/getAllByCategory')
            .then((response) => {
                const data = response.data;
                const result = productItems.filter(item1 => data.find(item2 => item2.nombre === item1.title));

                // adding total to each item from data[index].total
                console.log("result", data);
                result.forEach((item, index) => {
                    item.total = parseInt(data[index].total);
                });

                setItems(result);
                return result;
            });

            const response = await axios.get('http://localhost:3001/api/solicitudProducto/getAll')
            .then((response) => {
                const data = response.data;
                console.log("result solicitados", data);
                console.log("rta Antes", rta);
                
                // rta = {nombre, cantidad}
                // data = {title, total}
                rta.forEach(el => {
                    const res = data.find(elem => el.title === elem.nombre);
                    console.log("elem:", res);
                    el.total = el.total - res.cantidad;
                    
                });
                setItems(rta);
            });
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        fetchItems();
    }
    , []);

    return (
        <>
            <h1 style={{fontSize: "3.5rem"}}>Solicitud de Donación</h1>
            <DonacionStyles
                isOpen={isCartOpen}
            >   
                <div className="contenedor-items">
                    {items.map((item, index) => (
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
                    items={items}
                    cart={cart}
                    isOpen={isCartOpen}
                    setIsCartOpen={setIsCartOpen}
                />
            </DonacionStyles>
        </>
    );
}

export default Solicitud;