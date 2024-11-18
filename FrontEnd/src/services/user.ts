import { customFetch } from '@/lib';
import { UserMaster } from '@/types';
import { getAccessToken } from '@/utils';
const baseURL = `${import.meta.env.VITE_BACKEND_URL}/api/users`;

export const Login = async (email: string, password: string) => {
    try {
        const response = await customFetch<UserMaster>({
            url: `${baseURL}/login`,
            method: 'POST',
            body: {
                email: email,
                password: password,
            },
            useCredentials: true,
        });
        return response;
    } catch (error) {
        throw new Error('Error logging in');
    }
}

export const getAllRoles = async (accessToken: string | undefined) => {
    try {
        const response = await customFetch<UserMaster[]>(
            {
                url: `${baseURL}/roles`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                method: 'GET',
            }
        );
        return response.data;
    } catch (error) {
        throw new Error('Error fetching roles');
    }
}

export const getAllUsers = async (accessToken: string | undefined, includeDeleted: boolean = false) => {
    try {
        const response = await customFetch<UserMaster[]>(
            {
                url: `${baseURL}/get-all-users?includeDeleted=${includeDeleted}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                method: 'GET',
            }
        );
        return response.data;
    } catch (error) {
        throw new Error('Error fetching users');
    }
};

export const getUser = async (userId: string) => {
    try {
        const accessToken = await getAccessToken();

        const response = await customFetch<UserMaster[]>(
            {
                url: `${baseURL}/get-user/${userId}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                method: 'GET',
            }
        );
        return response.data;
    } catch (error) {
        throw new Error('Error fetching users');
    }
};

export const createUser = async (userData: UserMaster, accessToken: string | undefined) => {
    try {
        const response = await customFetch<UserMaster>(
            {
                url: `${baseURL}/add-user`,
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                },
                body: userData,
            }
        )
        return response;
    } catch (error) {
        throw new Error('Error creating user');
    }
};

export const updateUser = async (userId: string, userData: UserMaster, accessToken: string | undefined) => {
    try {
        const response = await customFetch<UserMaster>(
            {
                url: `${baseURL}/${userId}`,
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                },
                body: userData,
            }
        )
        return response;
    } catch (error) {
        throw new Error('Error updating user');
    }
};

export const deleteUser = async (userId: string) => {
    try {
        const accessToken = await getAccessToken();

        const response = await customFetch(
            {
                url: `${baseURL}/${userId}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                method: 'DELETE',
            }
        )
        return response;
    } catch (error) {
        throw new Error('Error deleting user');
    }
};


export const restoreUser = async (userId: string) => {
    try {
        const accessToken = await getAccessToken();

        const response = await customFetch(
            {
                url: `${baseURL}/restore/${userId}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                method: 'DELETE',
            }
        )
        return response;
    } catch (error) {
        throw new Error('Error deleting user');
    }
};

export const updateUserProfile = async (profileData: any) => {
    try {
        const formData = new FormData();
        for (const key in profileData) {
            formData.append(key, profileData[key]);
        }
        const accessToken = await getAccessToken();

        const response = await fetch(`${baseURL}/profile`, {
            method: 'PATCH',
            body: formData,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        const data = await response.json();
        return data;
    } catch (error: any) {
        console.error('Error updating profile:', error.message);
        throw error;
    }
};