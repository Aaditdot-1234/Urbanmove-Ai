import {RegisterFormData, LoginFormData} from "@/types/authTypes";
import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json"
    }
});

export const registerUser = async (data: RegisterFormData) => {
    const response = await API.post("/auth/register", data);
    return response.data;
};

export const loginUser = async (data: LoginFormData) => {
    const response = await API.post("/auth/login", data);
    return response.data;
};