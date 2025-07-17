import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { setModal, updateCart } from "../redux/slices/productDataSlice";

const ModalComponent = () => {
  const { cartItems, modal } = useSelector((state) => state.productData);
  const dispatch = useDispatch();

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    dispatch(updateCart(updatedCart));
  };

  return (
    <>
      {/* <Button class onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
      <Modal
        show={modal}
        size="md"
        onClose={() => dispatch(setModal(false))}
        popup
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="red"
                onClick={() => {
                  handleRemoveItem(modal.id);
                  dispatch(setModal(false));
                }}
              >
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => dispatch(setModal(false))}>
                No, cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ModalComponent;
