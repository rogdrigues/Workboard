import { createAsyncThunk } from '@reduxjs/toolkit';
import { Login } from '@/services';

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await Login(email, password);

            if (response.EC === 0) {
                return response.data;
            } else {
                return rejectWithValue(response.message);
            }
        } catch (error: any) {
            return rejectWithValue('Unable to connect to the server');
        }
    }
);
