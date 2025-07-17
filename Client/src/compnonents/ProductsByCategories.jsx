import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import ProductLink from "./ProductLink";
import { useParams } from "react-router";
import { useGetProductsByCategoryQuery } from "../redux/APIs/productDataApi";

const ProductsByCategories = () => {
  const [pageTitle, setPageTitle] = useState("");

  const { category } = useParams();

  useEffect(() => {
    setPageTitle(category);
    window.scrollTo(0, 0);
  }, [category]);

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductsByCategoryQuery(category);

  if (isError) {
    return (
      <div className="flex min-h-[calc(100vh-328px-80px)] items-center justify-center text-4xl font-bold text-neutral-600">
        Category not found.
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-[calc(100vh-328px-80px)] pt-5 md:max-w-3xl lg:max-w-5xl">
      <Toaster position="top-right" reverseOrder={false} />

      <img src="/images/new/lto.png" alt="" />

      {pageTitle && (
        <div className="bg-gradient-to-r from-sky-600 to-sky-200 to-65% p-2 text-2xl font-semibold text-white">
          {pageTitle}
        </div>
      )}

      {product && (
        <div className="grid gap-4 p-2 pt-6 md:grid-cols-2 md:p-10 lg:grid-cols-3">
          {product.map((product) => (
            <ProductLink prop={{ product }} key={product.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsByCategories;
