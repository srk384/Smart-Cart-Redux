import Navbar from "../compnonents/Navbar";
import Footer from "../compnonents/Footer";
import { lazy, Suspense } from "react";
import LoadingFallback from "../compnonents/LoadingFallback";
const ProductsByCategories = lazy(
  () => import("../compnonents/ProductsByCategories"),
);

const Categories = () => {
  return (
    <div>
      <Navbar />

      <Suspense fallback={<LoadingFallback />}>
        <ProductsByCategories />
      </Suspense>

      <Footer />
    </div>
  );
};

export default Categories;
