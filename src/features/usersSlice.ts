import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const response = await fetch(
    `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data`
  );
  return await response.json();
});

export const RESPONSE = {
  SUCCESS: "success",
  ERROR: "error",
  PENDING: "pending",
};

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street?: string;
    country?: string;
    state?: string;
    suite?: string;
    city: string;
    zipcode?: string;
    geo?: {
      lat: string;
      lng: string;
    };
  };
  phone?: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface InitialState {
  value: User[];
  status: string | null;
  message: string;
}

const initialState: InitialState = {
  value: [],
  status: null,
  message: "",
};
export const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    resetUser: (state, {payload}: PayloadAction)=>{},
    addUser: (state, { payload }: PayloadAction<User>) => {
      
      state.status = RESPONSE.PENDING;
      const indexEmail = state.value.findIndex((user) => user.email === payload.email);
      const indexUsername = state.value.findIndex((user) => user.username === payload.username );
      if (indexEmail >= 0) {
        state.status = RESPONSE.ERROR;
        state.message =
          "User already exist, Kindly use another email";
        return state;
      }
      if (indexUsername >= 0) {
        state.status = RESPONSE.ERROR;
        state.message =
          "User already exist, Kindly use another username";
        return state;
      }
        payload.id = Math.floor(Math.random() * 91);
        state.value = [payload].concat(state.value);
        state.status = RESPONSE.SUCCESS;
        state.message = "User successfully created";
      
    },
    removeUser: (state, { payload }: PayloadAction<User>) => {
      state.status = RESPONSE.PENDING;
      const index = state.value.findIndex((user) => user.id === payload.id);
      if (index >= 0) {
        state.value.splice(index, 1);
        state.status = RESPONSE.SUCCESS;
        state.message = "User successfully deleted";
        return;
      }

      state.status = RESPONSE.ERROR;
      state.message = `User with id ${payload.id} not found`;
      return;
    },
    editUser: (state, { payload }: PayloadAction<User>) => {
      state.status = RESPONSE.PENDING;
      const index = state.value.findIndex((user) => user.id === payload.id);
      if (index >= 0) {
        state.value[index] = payload;
        state.status = RESPONSE.SUCCESS;
        state.message = "User successfully edited";
        return;
      }

      state.status = RESPONSE.ERROR;
      state.message = `User with id ${payload.id} not found`;
      return;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.status = RESPONSE.PENDING;
    });
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.value = state.value.concat(payload);
      state.status = RESPONSE.SUCCESS;
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.status = RESPONSE.ERROR;
    });
  },
});

export const { addUser, removeUser, editUser } = userSlice.actions;

export default userSlice.reducer;
