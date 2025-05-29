import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const ConfirmBox = ({ openModal, setOpenModal, title, ids, handlerFun }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpenModal(false);
  };
  const handleSuccess = () => {
    {
      dispatch(handlerFun(ids));
      setOpenModal(false);
      toast.success("User Deleted successfully.");
    }
  };
  return (
    <>
      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="confirm-box"
      >
        <DialogTitle id="confirm-box">{title}</DialogTitle>
        <DialogActions>
          <Button onClick={() => handleSuccess()}>Yes</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmBox;
