import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../index'

interface UserCreate {
    name: string;
    email: string;
    password: string;
}

interface User extends UserCreate {
    id: number;
}

interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse extends User {
    token: string;
}

const userApi = createApi({
    reducerPath: 'users',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['User'],
    endpoints(builder) {
        return {
            getUsers: builder.query<User, void>({
                query: () => ({
                    url: `/users/`,
                    method: 'GET',
                    providesTags: (result: User[] | undefined) =>
                        result
                            ? [...result.map(({ id }) => ({ type: 'User' as const, id })), { type: 'User', id: 'LIST' }]
                            : [{ type: 'User', id: 'LIST' }], //when result is falsy triggers refetch (useful if caused by mutated data or edge case)
                }),
            }),
            getUser: builder.query<User, number>({
                query: (id) => ({
                    url: `/users/${id}`,
                    method: 'GET',
                    providesTags: (result, error, id) => [{ type: 'User', id }]
                }),
            }),
            addUser: builder.mutation<User, UserCreate>({
                query: (user) => ({
                    url: '/users',
                    method: 'POST',
                    body: user
                }),
                invalidatesTags: [{ type: 'User', id: 'LIST' }],
            }),
            updateUser: builder.mutation<User, { id: number; changes: Partial<UserCreate> }>({
                query: ({ id, changes }) => ({
                    url: `/users/${id}`,
                    method: 'PUT',
                    body: changes
                }),
                invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
            }),
            removeUser: builder.mutation<void, number>({
                query: (id) => ({
                    url: `/users/${id}`,
                    method: 'DELETE'
                }),
                invalidatesTags: (result, error, id) => [{ type: 'User', id }],
            }),
            loginUser: builder.mutation<LoginResponse, LoginRequest>({
                query: (credentials) => ({
                    url: '/users/login',
                    method: 'POST',
                    body: 'credentials',
                }),
            })
        };
    }
});

export const { useGetUsersQuery, useGetUserQuery, useAddUserMutation, useUpdateUserMutation, useRemoveUserMutation, useLoginUserMutation } = userApi;
export { userApi };
