import { lazy, Suspense } from "react";
import Navbar from "../compnonents/Navbar";
import Footer from "../compnonents/Footer";
import LoadingFallback from "../compnonents/LoadingFallback";

const ProductDetailComp = lazy(
  () => import("../compnonents/ProductDetailComp"),
);

const ProductDetails = () => {
  return (
    <div>
      <Navbar />

      <Suspense fallback={ <LoadingFallback /> }>
        <ProductDetailComp />
      </Suspense>

      <Footer />
    </div>
  );
};

export default ProductDetails;
