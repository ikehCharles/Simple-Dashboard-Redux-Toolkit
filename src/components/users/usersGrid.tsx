import { Button } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridOverlay,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { getUsers, removeUser } from "../../features/usersSlice";
import { BlackButton } from "../styled/Button.styled";
import { Link, useNavigate } from "react-router-dom";
import AlertDialog from "../utilities/popup";
import { useHeaderTitle } from "../../context/headerTitle.ctx";

export default function UsersGrid() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openPopup, setOpenPopup] = useState(false)
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", minWidth: 100, flex: 1 },
    { field: "name", headerName: "Name", minWidth: 200, flex: 1 },
    { field: "username", headerName: "Username", minWidth: 200, flex: 1 },
    { field: "email", headerName: "Email", minWidth: 200, flex: 1 },
    {
      field: "city",
      headerName: "City",

      minWidth: 200,
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.address.city}`,
    },
    {
      field: "actionEdit",
      headerName: "Action",
      sortable: false,
      minWidth: 100,
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <>
            <EditIcon
              style={{ margin: 10, cursor: "pointer", fontSize: 18 }}
              onClick={() => {
                handleClick("edit", cellValues);
              }}
            />
            <DeleteIcon
              style={{ margin: 10, cursor: "pointer", fontSize: 18 }}
              onClick={() => {
                handleClick("delete", cellValues);
              }}
            />
          </>
        );
      },
    },
  ];
  const closeDialog = (val:string)=>{
    setOpenPopup(false);
    if(val === "proceed"){
      setTimeout(() => dispatch(removeUser(row)));
    }
  }
  const [row, setRow] = useState(null)
  const handleClick = (
    action: string,
    cellValues: GridRenderCellParams<any>
  ) => {
    if (action === "delete") {
      setRow(cellValues.row) 
      setOpenPopup(true)
    }
    if (action === "edit") {
      navigate(`/entry?${cellValues.row.id}`, {
        state: {
          userId: cellValues.row.id,
        },
      });
    }
  };
  const users = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (!users || !users.value.length) {
      dispatch(getUsers());
    }

  }, [dispatch]);

  const {setHeaderTitle} = useHeaderTitle()
  useEffect(()=>{
    setHeaderTitle("Dashboard")
  }, [setHeaderTitle])

  return (
    <>

      <div
        style={{
          border: "1px solid transparent",
          borderRadius: "2px",
          //   margin: 20,
          boxShadow: "0px 0px 1px #000",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 10px",
          }}
        >
          <h3>User List</h3>
          <BlackButton>
            <Link
              style={{ color: "#ffffff", textDecoration: "none" }}
              to="entry"
            >
              Add New
            </Link>
          </BlackButton>
        </div>
        <div
          style={{
            height: "80vh",
            width: "100%",
            boxShadow: "3px 3px 3px #0000",
          }}
        >
          <DataGrid
            components={{
              LoadingOverlay: CustomLoadingOverlay,
            }}
            rows={users.value}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </div>
      </div>
      <AlertDialog closeDialog={closeDialog} title={"You are about to delete this user"} openPopup={openPopup} >
        <p style={{color: 'red'}}>

          Would you like to proceed ?
        </p>
      </AlertDialog>
    </>
  );
}

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <div style={{ position: "absolute", top: 0, width: "100%" }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
}
