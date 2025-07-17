import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { productArray } from "../data/ProductArray";
import { useRef, useState, useEffect } from "react";
import CartSVG from "./svgComponents/CartSVG";
import { useGetSearchResultMutation } from "../redux/APIs/productDataApi";

const Navbar = () => {
  const { cartCount, cartItems } = useSelector((state) => state.productData);
  const [searchReult, setSearchReult] = useState([]);
  const searchInputRef = useRef(false);
  const [isHamOpen, setIsHamOpen] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const category = useParams().category;

  useEffect(() => {
    setCategoryName(category);
  }, [category]);
  
  const totalQTY = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [getSearchResult] = useGetSearchResultMutation();

  function debounce(fn, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    };
  }

  const searchFetcher = async (query) => {
    try {
      const { data } = await getSearchResult(query);
      setSearchReult(data);
    } catch (error) {
      console.log("Search error:", error);
    }
  };

  const debouncedSearch = debounce(searchFetcher, 300);

  const handleSearch = (e) => {
    const { value } = e.target;
    debouncedSearch(value);
  };

  useEffect(() => {
    if (isHamOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isHamOpen]);

  return (
    <div className="sticky top-0 z-100 flex h-16 items-center justify-between bg-white px-4 shadow-md md:h-18 md:px-2 lg:h-20 lg:justify-center lg:gap-5 xl:gap-32">
      <div className="flex items-center gap-4">
        {/* --ham menu-- */}
        <div
          className="hamMenu lg:hidden"
          onClick={() => setIsHamOpen(!isHamOpen)}
        >
          <svg
            className="block lg:hidden"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 10.6668V9.3335H26.6667V10.6668H4ZM26.6667 16.0002V17.3335H4V16.0002H26.6667ZM4 22.6668H26.6667V24.0002H4V22.6668Z"
              fill="black"
            />
          </svg>

          {isHamOpen && (
            <>
              <div className="absolute top-0 left-0 z-1 h-dvh w-screen bg-black/30"></div>

              <div className="absolute top-0 left-0 z-10 h-dvh w-78 overscroll-none bg-white">
                <div className="mb-3 h-32">
                  <img
                    className="object-contain"
                    src="/images/new/hamBanner.jpg"
                    alt=""
                  />
                </div>

                <ul className="">
                  <Link to="/category/Clothes">
                    <li className="flex cursor-pointer items-center justify-between px-5 py-2 font-semibold text-neutral-600 active:bg-neutral-200">
                      Clothes
                      <span className="text-2xl font-semibold"> › </span>
                    </li>
                  </Link>
                  <Link to="/category/Shoes">
                    <li className="flex cursor-pointer items-center justify-between px-5 py-2 font-semibold text-neutral-600 active:bg-neutral-200">
                      Shoes
                      <span className="text-2xl font-semibold"> › </span>
                    </li>
                  </Link>
                  <Link to="/category/Electronics">
                    <li className="flex cursor-pointer items-center justify-between px-5 py-2 font-semibold text-neutral-600 active:bg-neutral-200">
                      Electronics
                      <span className="text-2xl font-semibold"> › </span>
                    </li>
                  </Link>
                  <Link to="/category/Furniture">
                    <li className="flex cursor-pointer items-center justify-between px-5 py-2 font-semibold text-neutral-600 active:bg-neutral-200">
                      Furniture
                      <span className="text-2xl font-semibold"> › </span>
                    </li>
                  </Link>
                  <Link to="/category/Miscellaneous">
                    <li className="flex cursor-pointer items-center justify-between px-5 py-2 font-semibold text-neutral-600 active:bg-neutral-200">
                      Others
                      <span className="text-2xl font-semibold"> › </span>
                    </li>
                  </Link>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* --logo-- */}
        <Link to="/">
          <div className="brand flex items-center">
            <img
              className="h-12 md:h-14"
              src="/images/logo-copy.png"
              alt="logo"
            />
            <h1 className="hidden items-center gap-1 text-2xl font-bold text-gray-800 xl:flex">
              Smart
              <span className="bg-gradient-to-r from-[#fe5156] via-amber-400 to-[#fe5156] bg-clip-text text-transparent">
                Cart
              </span>
            </h1>
          </div>
        </Link>
      </div>

      {/* --categories-- */}
      <ul className="hidden gap-5 lg:flex">
        <Link to="/category/Clothes">
          <li
            className={`box-border flex h-20 cursor-pointer items-center justify-center border-b-4 font-semibold transition hover:border-red-600 ${categoryName === "Clothes" ? "border-red-600" : "border-transparent"}`}
          >
            Clothes
          </li>
        </Link>
        <Link to="/category/Shoes">
          <li
            className={`box-border flex h-20 cursor-pointer items-center justify-center border-b-4 font-semibold transition hover:border-pink-500 ${categoryName === "Shoes" ? "border-pink-500" : "border-transparent"}`}
          >
            Shoes
          </li>
        </Link>
        <Link to="/category/Electronics">
          <li
            className={`box-border flex h-20 cursor-pointer items-center justify-center border-b-4 font-semibold transition hover:border-fuchsia-700 ${categoryName === "Electronics" ? "border-fuchsia-700" : "border-transparent"}`}
          >
            Electronics
          </li>
        </Link>
        <Link to="/category/Furniture">
          <li
            className={`box-border flex h-20 cursor-pointer items-center justify-center border-b-4 font-semibold transition hover:border-green-500 ${categoryName === "Furniture" ? "border-green-500" : "border-transparent"}`}
          >
            Furniture
          </li>
        </Link>
        <Link to="/category/Miscellaneous">
          <li
            className={`box-border flex h-20 cursor-pointer items-center justify-center border-b-4 font-semibold transition hover:border-yellow-300 ${categoryName === "Miscellaneous" ? "border-yellow-300" : "border-transparent"}`}
          >
            Miscellaneous
          </li>
        </Link>
      </ul>

      {/* --search-- */}
      <div>
        <div className="group search hidden w-100 items-center gap-2 rounded border-1 border-neutral-300 p-1 px-2 md:flex">
          <svg
            className="w-5 fill-neutral-500 group-focus-within:fill-black"
            viewBox="0 0 34 34"
            fill=""
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M30.9333 33.5L19.3833 21.95C18.4667 22.6833 17.4125 23.2639 16.2208 23.6917C15.0292 24.1194 13.7611 24.3333 12.4167 24.3333C9.08611 24.3333 6.26767 23.1796 3.96133 20.872C1.655 18.5644 0.501223 15.746 0.500001 12.4167C0.498779 9.08733 1.65256 6.26889 3.96133 3.96133C6.27011 1.65378 9.08856 0.5 12.4167 0.5C15.7448 0.5 18.5638 1.65378 20.8738 3.96133C23.1838 6.26889 24.337 9.08733 24.3333 12.4167C24.3333 13.7611 24.1194 15.0292 23.6917 16.2208C23.2639 17.4125 22.6833 18.4667 21.95 19.3833L33.5 30.9333L30.9333 33.5ZM12.4167 20.6667C14.7083 20.6667 16.6566 19.8649 18.2613 18.2613C19.8661 16.6578 20.6679 14.7096 20.6667 12.4167C20.6654 10.1238 19.8637 8.17617 18.2613 6.57383C16.659 4.9715 14.7108 4.16911 12.4167 4.16667C10.1226 4.16422 8.17495 4.96661 6.57383 6.57383C4.97272 8.18106 4.17033 10.1287 4.16667 12.4167C4.163 14.7047 4.96539 16.6529 6.57383 18.2613C8.18228 19.8698 10.1299 20.6716 12.4167 20.6667Z"></path>
          </svg>

          <input
            ref={searchInputRef}
            className="my-1 w-full border-none outline-none"
            type="text"
            placeholder="Search for Products"
            onChange={(e) => handleSearch(e)}
          />
          {searchInputRef.current.value && (
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                setSearchReult([]);
                searchInputRef.current.value = "";
              }}
            >
              <path
                d="M8.53336 24.4107L7.58936 23.4667L15.056 16L7.58936 8.53336L8.53336 7.58936L16 15.056L23.4667 7.58936L24.4107 8.53336L16.944 16L24.4107 23.4667L23.4667 24.4107L16 16.944L8.53336 24.4107Z"
                fill="black"
              />
            </svg>
          )}
        </div>

        {/* --search result-- */}
        {searchReult && (
          <div className="searchResult absolute hidden max-h-64 w-100 overflow-y-auto bg-white shadow-sm md:block">
            {searchReult.map((item) => (
              <Link to={`/product/${item._id}`} state={item} key={item.id}>
                <div
                  className="w-full cursor-pointer p-2 px-4 text-neutral-600 hover:bg-neutral-100 active:bg-gray-800 active:text-white"
                  onClick={() => {
                    setSearchReult([]);
                    searchInputRef.current.value = "";
                  }}
                >
                  <span className="text-neutral-500">
                    {item.category.name} |{" "}
                  </span>
                  {item.title}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* --mobile search-- */}
        <div className="block md:hidden">
          <div>
            <svg
              className="searchSVG"
              onClick={() => setIsSearchClicked(!isSearchClicked)}
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.6667 22.6665C19.085 22.6665 22.6667 19.0848 22.6667 14.6665C22.6667 10.2482 19.085 6.6665 14.6667 6.6665C10.2485 6.6665 6.66675 10.2482 6.66675 14.6665C6.66675 19.0848 10.2485 22.6665 14.6667 22.6665Z"
                stroke="black"
                strokeWidth="1.33333"
              />
              <path
                d="M26.6667 26.6665L22.6667 22.6665"
                stroke="black"
                strokeWidth="1.33333"
                strokeLinecap="round"
              />
            </svg>
          </div>
          {isSearchClicked && (
            <div className="absolute top-0 left-0 z-10 flex h-16 w-full items-center gap-2 bg-white p-2">
              <div
                className="closeSVG"
                onClick={() => {
                  setIsSearchClicked(!isSearchClicked);
                  setSearchReult([]);
                  searchInputRef.current.value = "";
                }}
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.53336 24.4107L7.58936 23.4667L15.056 16L7.58936 8.53336L8.53336 7.58936L16 15.056L23.4667 7.58936L24.4107 8.53336L16.944 16L24.4107 23.4667L23.4667 24.4107L16 16.944L8.53336 24.4107Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div className="w-full">
                <input
                  className="w-full outline-none"
                  type="text"
                  name=""
                  id=""
                  ref={searchInputRef}
                  onChange={(e) => handleSearch(e)}
                  placeholder="Search for Products"
                />
                {searchReult && (
                  <div className="searchResult absolute top-16.5 left-0 block max-h-64 w-full overflow-y-auto border-neutral-300 bg-white shadow-sm md:hidden">
                    {searchReult.map((item) => (
                      <Link
                        to={`/product/${item._id}`}
                        state={item}
                        key={item.id}
                      >
                        <div
                          className="w-full cursor-pointer p-2 px-4 text-neutral-600 hover:bg-neutral-100 active:bg-gray-800 active:text-white"
                          onClick={() => {
                            setSearchReult([]);
                            searchInputRef.current.value = "";
                            setIsSearchClicked(!isSearchClicked);
                          }}
                        >
                          <span className="text-neutral-500">
                            {item.category.name} |{" "}
                          </span>
                          {item.title}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* --cart-- */}
        <Link to="/cart">
          <div className="flex cursor-pointer flex-col items-center justify-center">
            <div className="relative">
              <CartSVG />
              <div className="absolute -top-1 -right-1 size-4 rounded-full bg-[#fe5156] text-center text-xs font-bold text-white md:size-4.5">
                {totalQTY}
              </div>
            </div>
            <div className="cart hidden text-xs font-semibold md:block md:text-sm">
              Cart
            </div>
          </div>
        </Link>

        {/* --profile-- */}
        <Link to="/profile">
          <div className="flex cursor-pointer flex-col items-center justify-center">
            <img src="/images/profile.svg" alt="" />
            <div className="profile hidden text-xs font-semibold md:block md:text-sm">
              Profile
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
