import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserMaster } from '@/types';
import { loginUser } from '@/redux/thunks/authThunks';

interface AuthState {
    isAuthenticated: boolean;
    user: UserMaster | null;
    loading: boolean;
    error: string | null;
    accessToken: string | null;
    accessTokenExpiry: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
    accessToken: null,
    accessTokenExpiry: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<UserMaster>) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.data.metadata;
                state.accessToken = action.payload.data.result.access_token;
                state.accessTokenExpiry = action.payload.data.result.access_token_expires_at;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = "Unable to connect to the server";
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
