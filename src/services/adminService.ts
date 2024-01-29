import { bearplusApi } from "./bearplusApi";
import { IUser } from "@/types/user";


const adminService = bearplusApi.injectEndpoints({
    endpoints: (build) => ({
        // confirm agent
        adminConfirmAgentById: build.mutation<IUser, string>({
            query: (id) => ({
                method: 'POST',
                url: `/admin/comfirm-agent-profile/${id}`,
            }),
            invalidatesTags: [{ type: 'Admin', id: 'LIST' }],
        }),
        // get all users
        adminGetAllUsers: build.query<IUser[], unknown>({
            query: () => ({
                url: '/admin/users',
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ _id }) => ({ type: 'Admin' as const, _id })),
                        { type: 'Admin', id: 'LIST' },
                    ]
                    : [{ type: 'Admin', id: 'LIST' }],
        }),
        // get all not verified users
        adminGetAllNotVerifiedUsers: build.query<IUser[], unknown>({
            query: () => ({
                url: '/admin/users/not-verified',
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ _id }) => ({ type: 'Admin' as const, _id })),
                        { type: 'Admin', id: 'LIST' },
                    ]
                    : [{ type: 'Admin', id: 'LIST' }],
        }),
        // get user by id
        adminGetUserById: build.query<IUser, string>({
            query: (id) => ({
                url: `/admin/users/${id}`,
            }),
        }),
    }),
    overrideExisting: false,
})

export const {
    useAdminConfirmAgentByIdMutation,
    useAdminGetAllUsersQuery,
    useAdminGetUserByIdQuery,
    useAdminGetAllNotVerifiedUsersQuery
} = adminService;