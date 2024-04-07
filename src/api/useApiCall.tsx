import {useState} from "react";
import api from "./axiosConfig";

// Custom hook for handling API calls

export const useApiCall = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean | undefined>(undefined);

  const sendRequest = async (url: string, method: string, data: any, headers: any)=> {
    setLoading(true);
    try {
      const response = await api.request({
        url,
        method,
        data,
        headers,
      });
      setSuccess(true);
      console.log("Request sent successfully:", response.status);
      return response.data;
    } catch (error) {
      setSuccess(false);
      console.error("Error sending data:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, success, sendRequest };
}