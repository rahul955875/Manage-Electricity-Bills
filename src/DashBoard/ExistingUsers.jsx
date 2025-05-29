import { Box, IconButton, Paper, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../Features/userSlice";
import { useState } from "react";
import ConfirmBox from "../FormComponents/ConfirmBox";
import { selectUser } from "../Features/selectedUser";
import ErrorBoundry from "../utils/ErrorBoundry";
import SearchBar from "../utils/SearchBar";

const ExistingUsers = () => {
  const [openModal, setOpenModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [input, setInput] = useState("");

  const users = useSelector((state) => state.users.users);
  console.log(users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (e, id) => {
    e.stopPropagation();
    // console.log('deleting...')
    // dispatch(removeUser(user.id));
    setUserId(id);
    setOpenModal(true);
  };
  const handleEdit = (e, user) => {
    {
      e.stopPropagation();
      dispatch(selectUser(user));
      navigate("/create-user");
    }
  };
  return (
    <>
      <SearchBar title={"Search User"} input={input} setInput={setInput} />
      <Paper elevation={2} sx={{ maxWidth: 520 }}>
        <ol>
          {users &&
            users.filter(user=>user.name.includes(input) || user.date.includes(input)).map((user) => (
              <li key={user.id}>
                <Paper
                  elevation={3}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 2,
                    my: 2,
                    // boxShadow: "4px 0px 5px gray",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/user?${user.id}`)}
                >
                  <Typography variant="h4" sx={{ fontSize: 18 }}>
                    {user.name}
                  </Typography>
                  <Typography variant="overline" sx={{ fontSize: 16 }}>
                    {user.date}
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    <IconButton
                      color="error"
                      onClick={(e) => handleDelete(e, user.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={(e) => handleEdit(e, user)}>
                      <EditIcon color="secondary" />
                    </IconButton>
                  </Box>
                </Paper>
              </li>
            ))}
        </ol>
        <ErrorBoundry
          fallback={
            <Typography variant="subtitle2">Error in Deleting...</Typography>
          }
        >
          <ConfirmBox
            title={"Do You want to Delete This User??"}
            openModal={openModal}
            setOpenModal={setOpenModal}
            handlerFun={removeUser}
            ids={userId}
          />
        </ErrorBoundry>
      </Paper>
    </>
  );
};

export default ExistingUsers;
