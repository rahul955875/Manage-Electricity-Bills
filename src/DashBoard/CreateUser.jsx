import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { addUser, updateUser } from "../Features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deSelectUser } from "../Features/selectedUser";
import toast from "react-hot-toast";

const CreateUser = () => {
  const selectedUser = useSelector((state) => state.selectedUser);
  console.log(selectedUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { handleSubmit, errors, touched, getFieldProps, resetForm } = useFormik(
    {
      initialValues: {
        name: selectedUser.name || "",
        date: selectedUser.date || new Date().toLocaleString(),
      },
      validationSchema: yup.object({
        name: yup.string().required().min(3),
      }),
      validateOnChange: false,
      validateOnBlur: false,
      onSubmit: (values, { resetForm }) => {
        if (selectedUser.id) {
          dispatch(
            updateUser({
              name: values.name,
              id: selectedUser.id,
            })
          );
          dispatch(deSelectUser());
          toast.success("User Updated Successfully.");
        } else {
          dispatch(addUser({ ...values, id: crypto.randomUUID(), bills: [] }));
          toast.success("User Added Successfully.");
        }
        resetForm();
        navigate("/");
      },
    }
  );

  const handleCancel = () => {
    resetForm();
    dispatch(deSelectUser());
    toast.error("Form closed.");
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Paper
        elevation={4}
        sx={{ p: 4, maxWidth: 420, mx: { xs: 1, sm: "auto" }, mt: 8 }}
      >
        <Typography variant="h4" sx={{ mb: 4 }}>
          {selectedUser.id ? "Update User" : "Create User"}
        </Typography>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              autoFocus
              placeholder="Enter Name"
              type="text"
              fullWidth
              id="name"
              {...getFieldProps("name")}
            />
            {touched.name && (
              <Typography variant="overline" color="error">
                {errors.name}
              </Typography>
            )}
          </Grid>
          <Grid size={12}>
            <TextField
              id="date"
              placeholder="Enter Name"
              type="text"
              {...getFieldProps("date")}
              disabled
              fullWidth
            />
          </Grid>

          <Button type="submit" variant="contained" size="large">
            {selectedUser.id ? "Update" : "Create"}
          </Button>
          <Button
            variant="contained"
            size="large"
            color="error"
            onClick={() => handleCancel()}
          >
            Cancel
          </Button>
        </Grid>
      </Paper>
    </form>
  );
};

export default CreateUser;
