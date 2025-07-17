import Navbar from "../compnonents/Navbar";
import ProductCard from "../compnonents/ProductCard";
import Footer from "../compnonents/Footer.jsx";
import CarouselComponent from "../compnonents/Carousel.jsx";

const Home = () => {
  return (
    <div>
      <Navbar />
      <CarouselComponent />
        <ProductCard />
      <Footer />
    </div>
  );
};

export default Home;
