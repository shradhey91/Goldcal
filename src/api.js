import axios from "axios";
export const api = axios.create({
  baseURL: "http://goldcal-env.eba-qj4vmkkw.ap-south-1.elasticbeanstalk.com/api"
});