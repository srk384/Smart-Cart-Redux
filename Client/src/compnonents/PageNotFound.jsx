import Footer from "./Footer";
import Navbar from "./Navbar";

const PageNotFound = () => {
  return (
    <>
      <Navbar />
      <div className="flex min-h-[calc(100vh-328px-80px)] items-center justify-center text-4xl font-bold text-neutral-600">
        <p>The page you are looking for does not exist.</p>
      </div>
      <Footer />
    </>
  );
};

export default PageNotFound;
