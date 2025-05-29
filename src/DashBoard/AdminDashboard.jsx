import { Box, Button, Typography } from "@mui/material";
import ExistingUsers from "./ExistingUsers";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
const AdminDashboard = () => {
  const navigate = useNavigate()
  return (
    <>
      <Box sx={{ p: 2, maxWidth: 520, mx: "auto", mt: 8 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
          <Typography variant="subtitle2" sx={{ fontSize: 24 }}>
            YOUR USER'S
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              navigate("/create-user");
            }}
          >
            Create User
          </Button>
        </Box>
        <ExistingUsers />
      </Box>
    </>
  );
};

export default AdminDashboard;
