import { Link } from "react-router-dom";
import CartSVG from "./svgComponents/CartSVG";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/productDataSlice";
import toast, { Toaster } from "react-hot-toast";
import { HandleRatings } from "./HandleRatings";
import { useEffect, useRef } from "react";
import useSyncCartToLocalStorage from "./useSyncCartToLocalStorage";

const ProductLink = ({ prop }) => {
  const product = prop.product;
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.productData);

  //   useEffect(() => {
  //   if (cartItems && cartItems.length > 0) {
  //     localStorage.setItem("cart", JSON.stringify(cartItems));
  //   }
  // }, [cartItems]);

  useSyncCartToLocalStorage(cartItems);

  const handleAdd2Cart = (product) => {
    dispatch(addToCart(product));

    toast.success("Added to Cart!", {
      style: {
        border: "1px solid #fe5156",
        padding: "8px 10px",
        color: "#fe5156",
        fontWeight: "bold",
      },
      iconTheme: {
        primary: "#fe5156",
        secondary: "#FFF",
      },
    });
  };

  return (
    <Link to={`/product/${product._id}`} state={product}>
      <div className="card group mx-auto mb-5 flex w-[300px] flex-col justify-between rounded transition hover:cursor-pointer hover:bg-white hover:shadow-xl active:bg-white active:shadow-xl md:w-full">
        <div className="relative h-[304px]">
          <img
            className="mx-auto h-full rounded-t object-contain"
            src={product.images?.[0]}
            alt={product.title}
            onError={(e) => {
              e.currentTarget.src = "/images/noimage2.jpeg";
            }}
          />
          {product.tag && (
            <div
              className={`tag absolute right-2 bottom-2 rounded px-3 py-1 text-xs font-semibold text-white ${
                product.tag === "New" ? "bg-red-500" : "bg-amber-500"
              }`}
            >
              {product.tag}
            </div>
          )}
        </div>
        <div className="flex h-full flex-col justify-between p-4">
          <h4 className="font-semibold">{product.title}</h4>
          <div className="rating flex text-amber-600">
            <HandleRatings stars={product.ratings} />
          </div>
          <p className="mb-2 font-semibold text-neutral-600">
            Rs. {(product.price).toLocaleString()}
          </p>
          <button
            className="mx-auto flex cursor-pointer items-center justify-center gap-2 rounded border-2 border-[#fe5156] p-1 px-2 font-semibold text-[#fe5156] transition hover:bg-[#fe5156] hover:text-white active:bg-[#fe5156] active:text-white"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAdd2Cart(product);
            }}
          >
            <CartSVG />
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductLink;
