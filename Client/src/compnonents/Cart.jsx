import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setModal, updateCart } from "../redux/slices/productDataSlice";
import { Link } from "react-router";
import BuySVG from "./svgComponents/BuySVG";
import EmptyBagsSVG from "./svgComponents/EmptyBagsSVG";
import useSyncCartToLocalStorage from "./useSyncCartToLocalStorage";


const Cart = () => {
  const { cartItems } = useSelector((state) => state.productData);
  const dispatch = useDispatch();

  const totalMRP = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalQTY = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [cartItems]);

  useSyncCartToLocalStorage(cartItems);

  return (
    <div className="flex min-h-[calc(100vh-328px-80px)] max-w-7xl justify-center pt-5 md:mx-auto">
      {cartItems.length == 0 && (
        <div className="my-20 flex flex-col items-center justify-center">
          <EmptyBagsSVG />

          <h1 className="pt-5 text-xl font-semibold">
            Hey, it feels so light!
          </h1>
          <p className="pb-5 text-sm text-neutral-500">
            There is nothing in your bag. Let's add some items.
          </p>
          <Link to="/">
            <button className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded border-2 border-[#fe5156] p-1 px-2 font-semibold text-[#fe5156] transition hover:bg-[#fe5156] hover:text-white">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 9.9999V5.9999C10 5.29776 10.1849 4.608 10.5359 3.99993C10.887 3.39187 11.392 2.88693 12 2.53587C12.6081 2.18481 13.2979 2 14 2C14.7022 2 15.3919 2.18483 16 2.5359C16.6081 2.18483 17.2978 2 18 2C18.7021 2 19.3919 2.18481 20 2.53587C20.608 2.88693 21.113 3.39187 21.4641 3.99993C21.8151 4.608 22 5.29776 22 5.9999V9.9999H23C23.7956 9.9999 24.5587 10.316 25.1213 10.8786C25.6839 11.4412 26 12.2042 26 12.9999V25.9999C26 27.0608 25.5786 28.0782 24.8284 28.8283C24.0783 29.5785 23.0609 29.9999 22 29.9999H10C8.93913 29.9999 7.92172 29.5785 7.17157 28.8283C6.42143 28.0782 6 27.0608 6 25.9999V12.9999C6 12.2042 6.31607 11.4412 6.87868 10.8786C7.44129 10.316 8.20435 9.9999 9 9.9999H10ZM12 5.9999V9.9999H16V5.9999C16 5.46947 15.7893 4.96076 15.4142 4.58568C15.0391 4.21061 14.5304 3.9999 14 3.9999C13.4696 3.9999 12.9609 4.21061 12.5858 4.58568C12.2107 4.96076 12 5.46947 12 5.9999ZM22 27.9999C22.5304 27.9999 23.0391 27.7892 23.4142 27.4141C23.7893 27.039 24 26.5303 24 25.9999V12.9999C24 12.7347 23.8946 12.4803 23.7071 12.2928C23.5196 12.1053 23.2652 11.9999 23 11.9999H20V25.9999C20 26.5303 20.2107 27.039 20.5858 27.4141C20.9609 27.7892 21.4696 27.9999 22 27.9999ZM18 11.9999H9C8.73478 11.9999 8.48043 12.1053 8.29289 12.2928C8.10536 12.4803 8 12.7347 8 12.9999V25.9999C8 26.5303 8.21071 27.039 8.58579 27.4141C8.96086 27.7892 9.46957 27.9999 10 27.9999H18.536C18.1849 27.3918 18 26.7021 18 25.9999V11.9999ZM18 5.9999V9.9999H20V5.9999C20.0002 5.69454 19.9305 5.39317 19.7963 5.11892C19.662 4.84467 19.4667 4.6048 19.2253 4.41771C18.984 4.23063 18.703 4.10129 18.404 4.03961C18.1049 3.97793 17.7957 3.98556 17.5 4.0619C17.82 4.6359 18 5.2979 18 5.9999Z"
                  fill="currentColor"
                />
              </svg>
              Let's Shop
            </button>
          </Link>
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="mb-12 md:flex">
          <div className="right">
            {/* --cart heading-- */}
            <div className="p-4 text-4xl font-semibold">Cart</div>
            {/* --cart mapping-- */}
            {cartItems.map((product) => (
              <div key={product.id}>
                <div className="relative m-2 flex h-full items-center gap-5 rounded border border-neutral-300 p-4 md:w-[600px]">
                  <img
                    className="w-32 object-contain"
                    src={product.images[0]}
                    alt={product.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/noimage2.jpeg";
                    }}
                  />
                  <div className="">
                    <Link to={`/product/${product._id}`} state={product}>
                      <h4 className="font-semibold underline-offset-2 hover:underline">
                        {product.title}
                      </h4>
                    </Link>
                    <p className="overflow-clip text-xs text-neutral-500">
                      {product.description}
                    </p>
                    <p className="pt-2 text-xs text-neutral-800">
                      Sold By: Smart Cart Pvt. Ltd.
                    </p>
                    <p className="pt-2 text-sm font-semibold">
                      Qty:{" "}
                      <select
                        name="qty"
                        id="item qty"
                        defaultValue={product.quantity}
                        onChange={(e) =>
                          dispatch(
                            updateCart({
                              ...product,
                              quantity: e.target.value,
                            }),
                          )
                        }
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </p>
                    <p className="pt-3 font-semibold text-neutral-800">
                      &#8377; {(product.price).toLocaleString()}
                    </p>
                    <p className="text-sm font-semibold">Exchnage Only</p>
                    <div className="close">
                      <svg
                        className="absolute top-2 right-2 cursor-pointer rounded-full transition hover:bg-[#fe5156] active:bg-[#fe5156] hover:text-white"
                        width="20"
                        height="20"
                        viewBox="0 0 32 32"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() =>
                          dispatch(setModal({ isopen: true, id: product.id }))
                        }
                      >
                        <path
                          d="M15.9999 16.9441L9.00523 23.9388C8.88079 24.0633 8.7279 24.1299 8.54657 24.1388C8.36523 24.1477 8.20346 24.081 8.06123 23.9388C7.91901 23.7966 7.8479 23.6393 7.8479 23.4668C7.8479 23.2944 7.91901 23.137 8.06123 22.9948L15.0559 16.0001L8.06123 9.00548C7.93679 8.88103 7.87012 8.72814 7.86123 8.54681C7.85234 8.36548 7.91901 8.2037 8.06123 8.06148C8.20346 7.91926 8.36079 7.84814 8.53323 7.84814C8.70568 7.84814 8.86301 7.91926 9.00523 8.06148L15.9999 15.0561L22.9946 8.06148C23.119 7.93703 23.2723 7.87037 23.4546 7.86148C23.635 7.85259 23.7963 7.91926 23.9386 8.06148C24.0808 8.2037 24.1519 8.36103 24.1519 8.53348C24.1519 8.70592 24.0808 8.86326 23.9386 9.00548L16.9439 16.0001L23.9386 22.9948C24.063 23.1193 24.1297 23.2726 24.1386 23.4548C24.1475 23.6353 24.0808 23.7966 23.9386 23.9388C23.7963 24.081 23.639 24.1521 23.4666 24.1521C23.2941 24.1521 23.1368 24.081 22.9946 23.9388L15.9999 16.9441Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* --Cart Summary-- */}
          <div className="left flex flex-col items-center pt-10 md:pt-20 md:pl-5">
            <div className="summary min-w-94 rounded border border-neutral-300 p-4 md:min-w-96">
              <h1 className="pb-3 text-xl font-semibold">Cart Summary</h1>
              <div className="border-b border-neutral-300"></div>
              <p className="flex justify-between py-3 text-sm text-neutral-600">
                <span>No. of Items: </span> <span>{totalQTY}</span>{" "}
              </p>
              <p className="flex justify-between pb-3 text-sm text-neutral-600">
                <span>Total MRP:</span> <span>&#8377; {totalMRP}</span>{" "}
              </p>
              <p className="flex justify-between pb-3 text-sm text-neutral-600">
                <span>10% Discount on MRP:</span>{" "}
                <span>- &#8377; {totalMRP / 10}</span>{" "}
              </p>
              <p className="flex justify-between pb-3 text-sm text-neutral-600">
                <span>Platform Fee:</span>{" "}
                <span className="text-green-700">free</span>{" "}
              </p>
              <p className="flex justify-between pb-3 text-sm text-neutral-600">
                <span>Shipping Fee:</span>{" "}
                <span className="text-green-700">free</span>{" "}
              </p>
              <div className="border-b border-neutral-300"></div>
              <p className="flex justify-between pt-3 text-lg font-semibold text-neutral-800">
                <span>Total Amount:</span>{" "}
                <span>&#8377; {(totalMRP - totalMRP / 10).toLocaleString()}</span>{" "}
              </p>
            </div>
            <Link to="/confirmation">
              <button
                className="mt-3 flex cursor-pointer items-center gap-2 rounded bg-[#fe5156] px-10 py-3 font-semibold text-white"
                onClick={() => dispatch(updateCart([]))}
              >
                <BuySVG />
                PLACE ORDER
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
