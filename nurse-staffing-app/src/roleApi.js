import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const roleApi = createApi({
    reducerPath: "roleApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SOME_KEY }),
    tagTypes: ['Role'],
    keepUnusedDataFor: 30,
    endpoints: (builder) => ({
        roles: builder.query({
            query: () => '/roles',
            providesTags: ['Role'],
            keepUnusedDataFor: 5,
        }),
        role: builder.query({
            query: (id) => `/roles/${id}`,
            providesTags: ['Role'],
        }),
        addRole: builder.mutation({
            query: role => ({
                url: '/roles',
                method: 'POST',
                body: role
            }),
            invalidatesTags: ['Role'],
        }),
        updateRole: builder.mutation({
            query: (data) => ({
                url: `/roles`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Role'],
        }),
        deleteRole: builder.mutation({
            query: (id) => ({
                url: `/roles/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Role'],
        }),
    })
})

export default roleApi.reducer
export const { useRolesQuery, useRoleQuery, useAddRoleMutation, useUpdateRoleMutation, useDeleteRoleMutation } = roleApi