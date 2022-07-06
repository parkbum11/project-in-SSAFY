import axios from "axios";

export const register = (newUser) => {
  return axios
    .post("/api/users/register", {
      name: newUser.name,
      userid: newUser.userid,
      password: newUser.password,
      region_id: newUser.region_id,
    })
    .then((res) => {
      console.log("Registered");
    });
};

export const login = (user) => {
  return axios
    .post("/api/users/login", {
      userid: user.userid,
      password: user.password,
    })
    .then((res) => {
      localStorage.setItem("usertoken", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
