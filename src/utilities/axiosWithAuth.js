import axios from "axios";
require("dotenv").config();

const axiosWithAuth = {
  endpoint: process.env.REACT_APP_BASE_URL || "http://localhost:5000/",

  axiosHeaders: function() {
    console.log(this.endpoint, localStorage.getItem("key"));
    return axios.create({
      baseURL: this.endpoint,
      headers: {
        Authorization: `Token ${localStorage.getItem("key")}` || null
      }
    });
  }
};

export default axiosWithAuth;