import axiosInstance from '../utils/axiosInstance';

export async function getTasks() {
  try {
    const response = await axiosInstance.get('/tasks', {
    });
    return response.data;
  }catch(error: any) {
    return error.response;
  }
}
