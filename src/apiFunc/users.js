import axios from "axios";

// const url = "http://192.168.18.135:8000/";
const url = `${process.env.NEXT_PUBLIC_API_URL}/users/`;

export const signupApi = async (data) => {
  const response = await axios.post(`${url}register/`, data);
  return response;
};

export const loginApi = async (data) => {
  const response = await axios.post(`${url}login/`, data);
  return response;
};

export const metadataApi = async (token) => {
  const response = await axios.get(`${url}metadata/`, {
    headers: { 'Authorization': token },
  });
  return response;
};

export const logoutApi = async (token) => {
  const response=await axios.delete(`${url}logout/`,{headers:{'Authorization':`Token ${token}`}})
  return response;
}


