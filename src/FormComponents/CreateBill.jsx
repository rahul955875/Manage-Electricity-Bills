import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { addBillToUser } from "../Features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const CreateBill = ({ title = "Create Bill", openModalSet }) => {
  const [open, setOpen] = openModalSet;
  const userId = useLocation().search.slice(1);
  const dispatch = useDispatch();

  const userPreviousBill = useSelector(
    (state) => state.users.users.find(({ id }) => id === userId)?.bills
  );
  const userPreviousUnits =
    userPreviousBill?.[userPreviousBill?.length - 1]?.currentUnits;

  const selectedBill = useSelector((state) => state.selectedBill);
  console.log(selectedBill);
  const { handleSubmit, errors, touched, values, getFieldProps, resetForm } =
    useFormik({
      initialValues: {
        currentUnits: "",
        previousUnits: userPreviousUnits || "",
        rate: "",
        date: new Date().toLocaleString(),
      },
      validateOnChange: false,
      validateOnBlur: false,
      validationSchema: yup.object({
        currentUnits: yup.number().required("Enter Current Units").min(0),
        previousUnits: yup.number().required("Enter Previous Units").min(0),
        rate: yup.number().required("Enter Rate").min(1),
      }),
      onSubmit: (values, { resetForm }) => {
        console.log(values);
        dispatch(
          addBillToUser({
            id: userId,
            bill: { ...values, id: crypto.randomUUID() },
          })
        );
        resetForm();
        toast.success('Bill Added SuccessFully.')
        setOpen(false);
      },
    });

  const handleClose = () => {
    resetForm();
    toast.success('Form closed !')
    setOpen(false);
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ width: 520 }}>
            <TextField
              autoFocus
              margin="dense"
              id="currentUnits"
              label="Current Units  "
              type="number"
              fullWidth
              {...getFieldProps("currentUnits")}
            />
            <Typography variant="overline" color="error">
              {touched.currentUnits && errors.currentUnits}
            </Typography>
            <TextField
              margin="dense"
              id="previousUnits"
              label="Previous Units"
              type="number"
              fullWidth
              {...getFieldProps("previousUnits")}
            />
            <Typography variant="overline" color="error">
              {touched.previousUnits && errors.previousUnits}
            </Typography>
            <TextField
              margin="dense"
              id="rate"
              label="Unit Rate"
              type="number"
              fullWidth
              {...getFieldProps("rate")}
            />
            <Typography variant="overline" color="error">
              {touched.rate && errors.rate}
            </Typography>
            <TextField
              margin="dense"
              id="totalUnits"
              type="text"
              value={` Total Units: ${
                values.currentUnits - values.previousUnits
              }`}
              disabled
              fullWidth
            />
            <TextField
              margin="dense"
              id="Total"
              type="text"
              value={` Total: ${
                (values.currentUnits - values.previousUnits) * values.rate
              }rs`}
              disabled
              fullWidth
            />

            <TextField
              margin="dense"
              id="date"
              type="text"
              value={new Date().toLocaleString()}
              disabled
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default CreateBill;
