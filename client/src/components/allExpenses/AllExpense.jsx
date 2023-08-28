import React, { useEffect, useState } from "react";
import { Expense } from "../expense/Expense";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import moment from "moment";
import "./allExpenses.css";

const options = ["All Data", "User Id", "Amount", "Status", "Date"];

export const AllExpense = () => {
  // spilit start

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [selectedStatus, setSelectedStatus] = React.useState("All Data");
  const [inputSearch, setInputSearch] = React.useState("");
  const [expenseData, setExpenseData] = useState();

  useEffect(() => {
    getExpenses();
  }, []);

  const filterSearch = (event) => {
    console.log(event.target.value);
    setInputSearch(event.target.value);
  };
  console.log("write", inputSearch);
  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };
  const handleSearch = async () => {
    if (selectedStatus === "All Data") {
      getExpenses();
    }
    if (selectedStatus === "User Id") {
      try {
        const res = await axios.get(
          `http://localhost:4000/expense/userexpense/${inputSearch}`
        );
        //console.log("search res", res);
        setExpenseData(res.data.expense);
      } catch (err) {
        console.log(err.message);
      }
    }
    if (selectedStatus === "Amount") {
      try {
        const res = await axios.get(
          `http://localhost:4000/expense/amount/${inputSearch}`
        );
        //console.log("search res", res);
        setExpenseData(res.data.expenses);
      } catch (err) {
        console.log(err.message);
      }
    }
    if (selectedStatus === "Status") {
      try {
        const res = await axios.get(
          `http://localhost:4000/expense/status/${inputSearch}`
        );
        console.log("search res", res);
        setExpenseData(res.data.expenses);
      } catch (err) {
        console.log(err.message);
      }
    }
    if (selectedStatus === "Date") {
      try {
        const date = moment(inputSearch, 'DD/MM/YYYY').format('DD-MM-YYYY');
        const res = await axios.get(
          `http://localhost:4000/expense/date/${date}`
        );
        console.log("search res", res);
        setExpenseData(res.data.expenses);
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const handleMenuItemClick = async (event, index) => {
    setInputSearch("");
    setSelectedIndex(index);
    setOpen(false);
    setSelectedStatus(options[index]);
    //console.log("index", options[index]);
  };
  console.log("dropdown", selectedStatus);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  // split end

  const navigate = useNavigate();
  const getExpenses = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
    try {
      const res = await axios.get("http://localhost:4000/expense");
      //console.log("data res", res);
      setExpenseData(res.data.expenses);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.header);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };
  //console.log("data", expenseData);
  return (
    <div className="admin-expense-container">
      <h1 style={{ textAlign: "center" }}>All Expenses</h1>
      <div className="filter-search">
        <div className="filter-dropdown">
          <React.Fragment>
            <ButtonGroup
              variant="contained"
              ref={anchorRef}
              aria-label="split button"
            >
              <Button
                onClick={handleClick}
                style={{
                  color: "black",
                }}
              >
                {selectedStatus}
              </Button>
              <Button
                size="small"
                aria-controls={open ? "split-button-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-label="select merge strategy"
                aria-haspopup="menu"
                onClick={handleToggle}
              >
                <ArrowDropDownIcon />
              </Button>
            </ButtonGroup>
            <Popper
              sx={{
                zIndex: 1,
              }}
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList id="split-button-menu" autoFocusItem>
                        {options.map((option, index) => (
                          <MenuItem
                            key={option}
                            selected={index === selectedIndex}
                            onClick={(event) =>
                              handleMenuItemClick(event, index)
                            }
                          >
                            {option}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </React.Fragment>
        </div>
        <div className="search-div">
          <input
            type="text"
            placeholder="Search"
            value={inputSearch}
            onChange={filterSearch}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      <Container
        sx={{
          display: "flex",
          gap: 5,
          margin: 0,
          flexWrap: "wrap",
        }}
      >
        {expenseData && expenseData.length > 0 ? (
          expenseData.map((expense, index) => (
            <Expense
              key={index}
              id={expense._id}
              desc={expense.exp_desc}
              date={expense.exp_date}
              amt={expense.amount_spent}
              imgSrc={expense.reciept_image}
              status={expense.exp_status}
              disable={false}
              getExpenses={getExpenses}
            />
          ))
        ) : (
          <>No Data</>
        )}
      </Container>
    </div>
  );
};
