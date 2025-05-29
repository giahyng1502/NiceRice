import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../apis/axios";
import { User } from "../reducers/userSlice";

export const fetchParticipants = createAsyncThunk<User[]>(
    "participants/fetchParticipants",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get<User[]>("/users/getParticipant");
            console.log("participants response", response);
            return response as unknown as User[];
        } catch (error: any) {
            console.error("Error fetching participants:", error);
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);
