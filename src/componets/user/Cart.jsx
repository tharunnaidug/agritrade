import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppContext from '../../context/AppContext';
import { CircleX, CircleXIcon, MinusCircleIcon, MoveRight, MoveRightIcon, Plus, PlusCircleIcon, TriangleAlert } from 'lucide-react';

const Cart = () => {
  const { cart, clearCart, addQty, removeQty,isAuth } = useContext(AppContext);

  if(!isAuth){
    return (
      <>
      <TriangleAlert className='mt-5' />
      <div className="text-center ">Looks like you are not logged in ..!</div> 
      <Link to='/login' className='btn btn-success mt-4'>Login Now</Link>
      </>
    );
  }
  if (!cart) {
    return <div className="text-center my-5">Loading...</div>;
  }

  const handleClearCart = () => {
    toast.warn(
      <div>
        <p className="mb-2">Are You Sure You Want To Clear The Cart?</p>
        <button className="btn btn-danger btn-sm me-2" onClick={() => { clearCart(); toast.dismiss(); }}>
          Yes,Clear
        </button>
        <button className="btn btn-secondary btn-sm" onClick={() => toast.dismiss()}>
          Cancel
        </button>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Your Cart</h2>

      {cart.items.length === 0 ? (
        <div className="alert alert-warning">Your cart is empty.</div>
      ) : (
        <div className="card p-3">
          {cart.items.map((item) => (
            <div key={item._id} className="d-flex align-items-center border-bottom py-2">
              <img src={item.imgSrc} alt={item.title} width="60" className="me-3 rounded" />
              <div className="flex-grow-1">
                <h5 className="mb-1">{item.title}</h5>
                <p className="mb-1">
                  Price :₹{item.price}
                </p>
                <p className="mb-1">
                  Quantity :{item.qty}
                </p>
                <p className="mb-1">
                 Sub Total = ₹{item.price} x {item.qty} = <strong>₹{item.price * item.qty}</strong>
                </p>
                <div>
                  <button className="btn btn-sm btn-outline-primary me-2" onClick={() => addQty(item.productId)}>
                  <PlusCircleIcon />
                  </button>
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => removeQty(item.productId)}>
                  <MinusCircleIcon />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {cart.items.length > 0 && (
        <div className="mt-3 text-end">
          <h4>
            Total: <strong>₹{cart.items.reduce((sum, item) => sum + item.price * item.qty, 0)}</strong>
          </h4>
          <button className="btn btn-danger me-2" onClick={handleClearCart}>
            Clear Cart <CircleXIcon />
          </button>
          <Link to="/user/checkout" className="btn btn-success">
            Proceed to Checkout <MoveRight />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;