import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { BILL_TABLE_FIELDS } from "../utils/Constants";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CreateBill from "../FormComponents/CreateBill";
import { useState } from "react";
import ConfirmBox from "../FormComponents/ConfirmBox";
import { selectBill } from "../Features/selectedBill";
import { removeBill } from "../Features/userSlice";
import SearchBar from "../utils/SearchBar";

const UserDashboard = () => {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [ids, setIds] = useState({
    id: "",
    userId: "",
  });
  const [input, setInput] = useState("");

  // const dispatch = useDispatch();
  const location = useLocation();
  console.log(location.search);
  const users = useSelector((state) => state.users.users);
  const userInfo = users.find(
    (user) => user.id === useLocation().search.slice(1)
  );

  const userBills = userInfo?.bills.toReversed();
  // console.log(userInfo)
  const handleDelete = (billId, UserId) => {
    setIds({ id: billId, userId: UserId });
    setOpenModal(true);
  };
  return (
    <>
      <Box sx={{ maxWidth: 1000, mx: "auto", mt: 4, p: 4 }}>
        <Button
          sx={{ mb: 4 }}
          variant="outlined"
          size="large"
          startIcon={<ArrowBackIcon />}
          onClick={() => window.history.back()}
        >
          Back
        </Button>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h2" fontSize={20}>
            {userInfo?.name}'s Bills
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setOpen(true);
            }}
          >
            Create Bill
          </Button>
        </Box>
        <Box sx={{ mt: 2, display: "flex" }}>
          <Box sx={{ flex: 1 }}>
            <SearchBar
              title={"Search by Date or Total Bill"}
              input={input}
              setInput={setInput}
            />
          </Box>
          <Button
            title="Clear Filter"
            variant="outlined"
            onClick={() => setInput("")}
          >
            X
          </Button>
        </Box>
        <TableContainer>
          <Table >
            <TableHead>
              <TableRow>
                {BILL_TABLE_FIELDS.map((th) => (
                  <TableCell key={th}>{th}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {userBills &&
                userBills
                  .filter(
                    (bill) =>
                      bill.date.includes(input) ||
                      (bill.rate * (bill.currentUnits - bill.previousUnits))
                        .toString()
                        .includes(input)
                  )
                  .map((bill) => (
                    <TableRow key={bill.id}>
                      <TableCell>
                        {bill.id.length > 5
                          ? bill.id.slice(0, 5) + "..."
                          : bill.id}
                      </TableCell>
                      <TableCell>{bill.date}</TableCell>
                      <TableCell>{bill.previousUnits}</TableCell>
                      <TableCell>{bill.currentUnits}</TableCell>
                      <TableCell>
                        {bill.currentUnits - bill.previousUnits}
                      </TableCell>
                      <TableCell>{bill.rate}</TableCell>
                      <TableCell>
                        ₹{bill.rate * (bill.currentUnits - bill.previousUnits)}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Button
                            title="Delete Bill"
                            variant="contained"
                            color="error"
                            onClick={() => handleDelete(bill.id, userInfo.id)}
                          >
                            <DeleteIcon />
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
          <Button sx={{ mt: 2 }} variant="outlined" onClick={() => print()}>
            Print
          </Button>
        </TableContainer>
        <CreateBill openModalSet={[open, setOpen]} />
        <ConfirmBox
          title={"Do You want to Delete This Bill??"}
          openModal={openModal}
          setOpenModal={setOpenModal}
          ids={ids}
          handlerFun={removeBill}
        />
      </Box>
    </>
  );
};

export default UserDashboard;
