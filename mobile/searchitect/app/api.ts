// api.ts

import axios from 'axios';

// const BASE_URL = 'http://10.0.2.2:8000/';
const BASE_URL = 'http://165.232.66.11:8000/';


 
export const registerUser = async (userData: { username: string; email: string; password: string }): Promise<RegisterResponse> => {
  try {
    console.log(userData);
    console.log(`${BASE_URL}signup/`);
    const response = await axios.post<RegisterResponse>(`${BASE_URL}signup/`, userData);
    console.log(response.status);
    return response.data;
  } catch (error) {
    console.log(error)
    // console.log(response)
    // throw error.response.data;
  }
};

export const loginUser = async (credentials: { username: string; password: string }): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${BASE_URL}login/`, credentials);
    return response.data;
  } catch (error) {
    console.log(error)
    // throw error.response.data;
  }
};

export const searchQuery = async (query: string) => {
    try {
        console.log({query})
      const response = await axios.post(`${BASE_URL}search/`, {query: query});
      return response.data;
    } catch (error) {
      console.log(error)
      // throw error.response.data;
    }
  };

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  token: string;
  user: User;
}

interface LoginResponse {
  token: string;
  user: User;
}

// interface SearchResponse {
//     query: string;
//   }

