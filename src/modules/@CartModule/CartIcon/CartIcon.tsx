import React, { useState } from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import CartSlider from '../cartslider/CartSlider'

const CartIcon = () => {

    const [showSlider, setShowSlider] = useState(false);

    const openSlider = () => {
        setShowSlider(true);
    }

    return (
        <>
            <div>
                <span onClick={() => openSlider()} style={{ display: "flex", flexDirection: "column", padding: "5px 0 0 0", cursor: "pointer" }}>
                    <FiShoppingCart className="cart-icon" ></FiShoppingCart>
                    <span style={{ fontSize: "smaller", marginLeft: "5px" }}>Cart</span>
                </span>
            </div>

            <CartSlider isSliderOpen={showSlider} onSliderClose={() => setShowSlider(false)} />

        </>
    )
}

export default CartIcon;
