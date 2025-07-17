import { useEffect, useRef, useState } from "react";

const CarouselComponent = () => {
  const [sequence, setSequence] = useState(1);
  const slideArray = Array(4).fill(null); 
  const intervalRef = useRef(null);
  const carouselRef = useRef(null);

  const nextSlide = () => {
    setSequence((prev) => (prev >= slideArray.length ? 1 : prev + 1));
  };

  const prevSlide = () => {
    setSequence((prev) => (prev <= 1 ? slideArray.length : prev - 1));
  };

  
  const startAutoSlide = () => {
    stopAutoSlide(); 
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 3000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAutoSlide();

    return () => stopAutoSlide();
  }, []);

  const handleMouseEnter = () => stopAutoSlide();
  const handleMouseLeave = () => startAutoSlide();

  return (
    <div
      className="relative h-62 bg-white sm:h-96 pt-1"
      ref={carouselRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="h-full w-full block md:hidden">
        {/* --mobile-- */}
        <img
          src={`./images/new/slide${sequence}md.jpg`}
          alt={`Slide ${sequence}`}
          className="h-full w-full object-cover object-top"
        />
        <div className="bg-gradient-to-b from-transparent from-80% md:from-65% to-[#f4f4f4] h-full w-full absolute inset-0"></div>
      </div>

      {/* --desktop-- */}
      <div className="h-full w-full hidden md:block">
        <img
          src={`./images/new/slide${sequence}.jpg`}
          alt={`Slide ${sequence}`}
          className="h-full w-full object-cover object-top"
        />
        <div className="bg-gradient-to-b from-transparent from-65% to-[#f4f4f4] h-full w-full absolute inset-0"></div>
      </div>

      <div className="actions h-full w-full">
        <button
          className="left absolute top-1/2 left-8 -translate-y-1/2 cursor-pointer rounded bg-white/30 p-2 px-3 md:p-5 text-xl font-bold outline-offset-2 outline-neutral-400 focus:outline-2"
          onClick={prevSlide}
        >
          ‹
        </button>
        <button
          className="right absolute top-1/2 right-8 -translate-y-1/2 cursor-pointer rounded bg-white/30 p-2 px-3 md:p-5 text-xl font-bold outline-offset-2 outline-neutral-400 focus:outline-2"
          onClick={nextSlide}
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default CarouselComponent;
