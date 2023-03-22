import axios from 'axios';

const config = {
	baseURL: process.env.REACT_APP_BASE_URL,
};

export default axios.create(config);
