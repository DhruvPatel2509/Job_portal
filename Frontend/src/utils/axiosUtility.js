import axios from "axios";
import { setApiLoading } from "../redux/authSlice";

const BASEURI = "http://localhost:8000/api/v1/";

const apiClient = axios.create({
  baseURL: BASEURI,
  withCredentials: true,
});

/**
 * Utility function to make API requests.
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE).
 * @param {string} endpoint - The API endpoint.
 * @param {object} data - The request body (for POST and PUT).
 * @param {string} token - The authorization token (optional).
 * @returns {Promise<Object>} - The response data from the API.
 */
const apiRequest = async (
  method,
  endpoint,
  data = {},
  token = "",
  dispatch
) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  try {
    dispatch(setApiLoading(true));
    const response = await apiClient({
      method,
      url: endpoint,
      data,
      headers,
    });
    return response;
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  } finally {
    dispatch(setApiLoading(false));
  }
};

export default apiRequest;
