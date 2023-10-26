import axios from "axios";

const Api=axios.create({
    baseURL:"https://fakestoreapi.com",
    headers:{"Content-Type":"application/json"},
    // withCredentials:true
})
export default Api