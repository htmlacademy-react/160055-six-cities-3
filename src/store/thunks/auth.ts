import { createAppAsyncThunk } from '../../hooks/store';
import { UserLogin } from '../../types/user-type';
import { Endpoint } from '../../const';
import { dropToken, saveToken } from '../../services/token';

export const checkAuth = createAppAsyncThunk<UserLogin, undefined>('auth/checkAuth', async (_arg, {extra: api}) => {
  const response = await api.get<UserLogin>(Endpoint.Login);
  return response.data;
});

interface LoginData {
  email: string;
  password: string;
}

export const login = createAppAsyncThunk<UserLogin, LoginData>('auth/login', async (body, {extra: api}) => {
  const response = await api.post<UserLogin>(Endpoint.Login, body);
  saveToken(response.data.token);
  return response.data;
});

export const logout = createAppAsyncThunk<unknown, undefined>('auth/logout', async (_, {extra: api}) => {
  await api.delete(Endpoint.Logout);
  dropToken();
});
