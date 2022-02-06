import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, TextField } from "@mui/material";
import { addUser, editUser, InitialState } from "../../features/usersSlice";
import { BlackButton } from "../styled/Button.styled";
import { FormBox } from "../styled/Box.styled";
import { RootState } from "../../app/store";
import { useLocation, useNavigate } from "react-router-dom";

interface CustomizedState {
  userId: string;
}

export default function UsersEntry({users}:{users:InitialState}) {
  console.error(users)
  const [id, setId] = useState("new");
  const [apiErrorState, setApiErrorState] = useState(false);
  const [apiError, setApiError] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorMsg, setUsernameErrorMsg] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const search = location.search;
  const state = location.state as CustomizedState;

  const dispatch = useDispatch();
  const userFormRef: React.LegacyRef<HTMLFormElement> | null = useRef(null);
  const saveUser = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    if (userFormRef.current) {
      const formValues: any = {
        address: {},
      };
      const fields = userFormRef.current.elements;
      for (let i = 0; i < fields.length; i++) {
        if (fields[i].tagName === "INPUT") {
          const field: any = fields[i];
          if (field.name === "email" || field.name === "username") {
            if (field.value === "") {
              if (field.name === "email") {
                setEmailError(true);
                setEmailErrorMsg("Email is required");
              }
              if (field.name === "username") {
                setUsernameError(true);
                setUsernameErrorMsg("Username is required");
              }
              return;
            }
            if (field.name === "email") {
              const re =
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
              if (!re.test(field.value)) {
                setEmailError(true);
                setEmailErrorMsg("Invalid Email");
                return;
              }
            }
          }
          if (field.name === "city") {
            formValues.address[field.name] = field.value;
            continue;
          }
          formValues[field.name] = field.value;
        }
      }
      if (id === "new") {
        console.warn(users.status, users.message);
        dispatch(addUser(formValues));
        
        console.warn(users.status,"check");
        if (users.status === "success") {
          navigate("/");
        }
      } else {
        dispatch(editUser({ ...formValues, id }));
      }

      // setApiErrorState(true);

      return false;
    }
    return false;
  };
  

  const populateUser = (userId: any) => {
    setId(userId);
    if (!users.status) return navigate("/");
    const user = users.value.find((user) => user.id === userId);
    if (!user) return;

    console.error(user);
    if (userFormRef.current) {
      const fields = userFormRef.current.elements;
      for (let i = 0; i < fields.length; i++) {
        if (fields[i].tagName === "INPUT") {
          const field: any = fields[i];
          if (field.name === "name") {
            field.value = user.name;
          }
          if (field.name === "email") {
            field.value = user.email;
          }
          if (field.name === "username") {
            field.value = user.username;
          }
          if (field.name === "city") {
            field.value = user.address.city;
          }
        }
      }
    }
  };

  useEffect(() => {
    if ((state && state.userId) || (search && search.split("")[1])) {
      populateUser(state.userId || search.split("")[1]);
    }
  },[]);

  return (
    <>
      <FormBox
        ref={userFormRef}
        component="form"
        sx={{
          textAlign: "center",
          margin: "50px auto",
          width: {
            xs: "90%",
            sm: "90%",
            md: "60%",
            xl: "60%",
            lg: "60%",
          },
        }}
        onSubmit={saveUser}
      >
        <h2
          style={{
            textAlign: "left",
            margin: "10px 0",
          }}
        >
          User Entry Form
        </h2>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <TextField
            sx={{
              margin: "15px 0",
              width: {
                xs: "100%",
                sm: "100%",
                md: "48%",
                xl: "48%",
                lg: "48%",
              },
            }}
            name="name"
            type="text"
            label="Name"
            variant="outlined"
          />
          <TextField
            sx={{
              margin: "15px 0",
              width: {
                xs: "100%",
                sm: "100%",
                md: "48%",
                xl: "48%",
                lg: "48%",
              },
            }}
            error={usernameError}
            helperText={usernameError ? usernameErrorMsg : ""}
            onChange={() => setUsernameError(false)}
            required
            name="username"
            type="email"
            label="Username"
            variant="outlined"
          />
          <TextField
            sx={{
              margin: "15px 0",
              width: {
                xs: "100%",
                sm: "100%",
                md: "48%",
                xl: "48%",
                lg: "48%",
              },
            }}
            error={emailError}
            helperText={emailError ? emailErrorMsg : ""}
            onChange={() => setEmailError(false)}
            required
            name="email"
            type="email"
            label="Email"
            variant="outlined"
          />
          <TextField
            sx={{
              margin: "15px 0",
              width: {
                xs: "100%",
                sm: "100%",
                md: "48%",
                xl: "48%",
                lg: "48%",
              },
            }}
            name="city"
            type="text"
            label="CIty"
            variant="outlined"
          />
        </Box>
        {apiErrorState && <p>{users.message}</p>}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <BlackButton
            sx={{
              margin: "10px",
            }}
            onClick={() => navigate("/")}
          >
            Cancel
          </BlackButton>
          <BlackButton
            sx={{
              margin: "10px",
            }}
            onClick={saveUser}
          >
            Save
          </BlackButton>
        </div>
      </FormBox>
    </>
  );
}
