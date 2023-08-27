import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import axios from 'axios';

const options = ['Accepted', 'Rejected', 'Pending'];

export default function SplitButton(props) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(2);
  const [selectedStatus, setSelectedStatus] = React.useState(props.expenseStatus);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = async (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    setSelectedStatus(options[index]);

    console.log("index",options[index])
    console.log("id",props.id);

    // try {
    //     const response = await axios.put(`http://localhost:4000/expense/update/${props.id}`, {
    //       exp_status: options[index],
    //     }, {
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     });
    //     console.log("expense res",response)
    //     if (response.status === 200) {
    //       console.log('Expense status updated successfully');
    //     } else {
    //       console.error('Failed to update expense status');
    //     }
    //   } catch (error) {
    //     console.error('An error occurred', error);
    //   }
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`http://localhost:4000/expense/update/${props.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
          body: JSON.stringify({ exp_status: options[index] }),
        });
  
        if (response.ok) {
          console.log('Expense status updated successfully');
          props.getExpenses();
          // You can perform additional actions upon successful update
        } else {
          console.error('Failed to update expense status');
          // Handle error case
        }
      } catch (error) {
        console.error('An error occurred', error);
        // Handle error case
      }

  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
        <Button onClick={handleClick} style={{
    backgroundColor:
      selectedStatus === 'Accepted' ? '#57ba86' : selectedStatus === 'Rejected' ? '#F24C3D' : '#FFFD8C',
    color: 'black',
  }}>{selectedStatus}</Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
          disabled = {props.disable}
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
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
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
  );
}