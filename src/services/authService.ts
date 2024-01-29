import { IChangePassword, IChangeResetPassword, IChangeResetPasswordWithEmail, IResetPassword, SignInAuth } from "@/utils/yupSchema";
import { bearplusApi } from "./bearplusApi";
import { IUser } from "@/types/user";

const authService = bearplusApi.injectEndpoints({
    endpoints: (build) => ({
        // user register
        userRegister: build.mutation<{ token: string }, unknown>({
            query: (data) => ({
                method: 'POST',
                url: '/users/register',
                body: data
            }),
        }),
        // user login
        userLogin: build.mutation<{ token: string }, SignInAuth>({
            query: (data) => ({
                method: 'POST',
                url: '/users/login',
                body: data
            }),
        }),
        // user reset password
        userResetPassword: build.mutation<string, IResetPassword>({
            query: (data) => ({
                method: 'POST',
                url: '/users/forgot-password',
                body: data
            }),
        }),
        // user reset change password
        userChangeResetPassword: build.mutation<string, IChangeResetPasswordWithEmail>({
            query: (data) => ({
                method: 'POST',
                url: '/users/change-password',
                body: data
            }),
        }),
         // user change passsword profile
         userChangeProfilePassword: build.mutation<string, IChangePassword>({
            query: (data) => ({
                method: 'PUT',
                url: '/users/change-password-profile',
                body: data
            }),
        }),
        // user change password
        userGet: build.query<IUser, unknown>({
            query: () => ({
                url: '/users',
            }),
            providesTags: [{ type: 'Users', id: 'LIST' }],
            transformResponse: (res: { data: IUser }) => res.data
        }),
    }),
    overrideExisting: false,
})

export const {
    useUserRegisterMutation,
    useUserLoginMutation,
    useUserResetPasswordMutation,
    useUserChangeResetPasswordMutation,
    useUserChangeProfilePasswordMutation,
    useUserGetQuery
} = authService;

export const selectGetMe = authService.endpoints.userGet.select(undefined)
