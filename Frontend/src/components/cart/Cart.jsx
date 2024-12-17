import StartCart from './StartCart.jsx'
import OrderBox from './OrderBox.jsx'
import StartAllTitleBox from '../StartAllTitleBox.jsx'

const Cart = () => {

    return(
        <>
            <StartAllTitleBox page={"Cart"} />
            <StartCart />
            <OrderBox />
        </>
    )
}
export default Cart