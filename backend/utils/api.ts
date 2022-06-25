import axios from 'axios';
import { config } from 'dotenv';

config();

const client = axios.create({
  baseURL: process.env.BACKEND_API_BASE_URL as string,
});

export default client;

export const DEFAULT_QUERYS = {
  type: 'json',
  key: process.env.NEIS_KEY as string,
  pSize: 200,
};
