import { addToCart } from "../redux/slices/productDataSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { HandleRatings } from "./HandleRatings";
import CartSVG from "./svgComponents/CartSVG";
import toast from "react-hot-toast";
import useSyncCartToLocalStorage from "./useSyncCartToLocalStorage";
import { useGetProductsByCategoryQuery } from "../redux/APIs/productDataApi";

const GetSimilarProducts = ({ category }) => {
  const { productList, cartItems } = useSelector((state) => state.productData);
  const dispatch = useDispatch();

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductsByCategoryQuery(category);

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
    <>
      {product?.map((product) => (
        <Link to={`/product/${product._id}`} state={product} key={product.id}>
          <div className="card flex w-42 flex-col justify-between rounded transition hover:cursor-pointer hover:bg-white hover:shadow-xl">
            <div className="relative h-42">
              <img
                className="mx-auto h-full w-full rounded-t object-contain"
                src={product.images[0]}
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
            <div className="flex h-full flex-col justify-between p-2">
              <h4 className="truncate font-semibold">{product.title}</h4>
              <div className="rating flex text-amber-600">
                <HandleRatings stars={product.ratings} />
              </div>
              <p className="font-semibold text-neutral-600">
                Rs. {product.price.toLocaleString()}
              </p>
              <button
                className="mx-auto mt-3 mb-1.5 flex cursor-pointer items-center justify-center gap-1 rounded border-1 border-[#fe5156] p-1 px-2 font-semibold text-[#fe5156] transition hover:bg-[#fe5156] hover:text-white active:bg-[#fe5156] active:text-white"
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
      ))}
    </>
  );
};

export default GetSimilarProducts;
