import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  token: string | null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: typeof window !== 'undefined' ? window.localStorage.getItem('token') : null,
  } as AuthState,
  reducers: {
    setCredentials: (state, { payload: { token } }: PayloadAction<{ token: string; }>) => {
      state.token = token
    },
    setCredentialsNull: (state: AuthState) => {
      state.token = null
    },
  },
})

export const { setCredentials, setCredentialsNull } = authSlice.actions

export default authSlice.reducer