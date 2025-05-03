import axiosInstance from '../utils/axiosInstance';

export async function getTasks() {
  try {
    return await axiosInstance.get('/tasks/');
  }catch(error: any) {
    return error.response;
  }
}
