import { customAxios } from '@/api/customAxios';

export const signin = async (loginData: {
  userEmail: string;
  userPassword: string;
}) => {
  const response = await customAxios.post('/v2/auth/signin', loginData, {
    withCredentials: true,
  });
  return response;
};
