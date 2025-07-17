import { useGetProductListQuery } from "../redux/APIs/productDataApi";
import { ShimmerPostList } from "react-shimmer-effects";
// import { useSelector, useDispatch } from "react-redux";
// import { setProductList } from "../redux/slices/productDataSlice";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import ProductLink from "./ProductLink";

const ProductCard = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useGetProductListQuery();

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   //productsFromDB
  //   fetch("http://localhost:3000/api/data")
  //     .then((res) => res.json())
  //     .then((result) => dispatch(setProductList(result)));
  // }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mx-auto min-h-[calc(100vh-328px-80px)] pt-5 md:max-w-3xl lg:max-w-5xl">
      {error && <div className="text-center mt-20 font-semibold text-xl text-neutral-700">There is some error, please relaod the page</div>}
      <Toaster position="top-right" reverseOrder={false} />

      {isLoading && (
        <ShimmerPostList postStyle="STYLE_FOUR" col={3} row={2} gap={20} />
      )}

      {products?.length > 0 && (
        <div className="grid gap-4 p-2 md:grid-cols-2 md:p-10 lg:grid-cols-3">
          {products.map((product) => (
            <ProductLink prop={{ product }} key={product.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
