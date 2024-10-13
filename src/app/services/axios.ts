import axios from "axios";

export const instance = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon/",
  timeout: 1000,
});
