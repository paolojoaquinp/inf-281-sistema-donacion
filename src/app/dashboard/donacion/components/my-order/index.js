import React, { useContext } from 'react';
import { MyOrderWrapper } from './my-order-styled';
import { FaWindowClose, FaShoppingBag } from 'react-icons/fa';
import CartContext from '@/app/context/cart';
import { useRouter } from 'next/navigation';
import CardMyOrder from '../card-my-order';

const MyOrder = ({ cart, isOpen, setIsCartOpen }) => {
    const {
        incrementItemCart,
        decrementItemCart,
        removeFromCart, 
    } = useContext(CartContext);
    const router = useRouter();
    return (
        <MyOrderWrapper 
            isCartOpen={isOpen}
        >
              <div className="carrito" id="carrito">
                <div className="header-carrito">
                    <h2>Tu Carrito de Donaciones </h2>
                    <div className="cerrar-carrito" onClick={() => setIsCartOpen(false)}>
                        <FaWindowClose color='white' size={20} />
                    </div>
                </div>
                <div className="carrito-items">
                    {cart.map((item) => (
                       <CardMyOrder
                            key={item.id}
                            item={item}
                            onIncrementItemCart={() => incrementItemCart(item)}
                            onDecrementItemCart={() => decrementItemCart(item)}
                            onRemoveFromCart={() => removeFromCart(item)}
                        />
                    ))
                }
                    
                </div>
                <div className="carrito-total">
                    <div className="fila">
                        <strong>Nro de Cosas</strong>
                        <span className="carrito-precio-total">
                            {cart.reduce((acc, item) => acc + item.quantity, 0)}
                        </span>
                    </div>
                    <button className="btn-pagar"
                        onClick={() => {
                                alert('Gracias por tu donación');
                                router.push('/dashboard/donacion/checkout');
                            }
                        }
                    >
                        Solicitar
                        <FaShoppingBag color='white' size={20} 
                        />
                    </button>
                </div>
            </div>
        </MyOrderWrapper>
    );
}

export default MyOrder;