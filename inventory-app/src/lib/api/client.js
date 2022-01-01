import axios from 'axios';

const client = axios.create();
client.defaults.baseURL = "https://localhost:5001/inventory";
export default client;