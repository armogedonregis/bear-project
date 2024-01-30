import { ICreateAppliaction } from "@/utils/yupSchema";
import { bearplusApi } from "./bearplusApi";
import { IAgentApplication, IApplicationDanger, IApplicationResponse } from "@/types/application";


const calculationService = bearplusApi.injectEndpoints({
    endpoints: (build) => ({
        // create application for calculation
        applicationCreate: build.mutation<IApplicationResponse, ICreateAppliaction>({
            query: (data) => ({
                method: 'POST',
                url: '/applications/create',
                body: data
            }),
            invalidatesTags: [{ type: 'Requests', id: 'LIST' }],
        }),
        // get all client requests
        applicationGetAllClient: build.query<IApplicationDanger[], unknown>({
            query: () => ({
                url: '/applications/client',
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ _id }) => ({ type: 'Requests' as const, _id })),
                        { type: 'Requests', id: 'LIST' },
                    ]
                    : [{ type: 'Requests', id: 'LIST' }],
        }),
        // get all agent requests
        applicationGetAllAgent: build.query<IApplicationDanger[], unknown>({
            query: () => ({
                url: '/applications/agent',
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ _id }) => ({ type: 'Requests' as const, _id })),
                        { type: 'Requests', id: 'LIST' },
                    ]
                    : [{ type: 'Requests', id: 'LIST' }],
        }),
        // get all agent application
        applicationGetAllRespondAgent: build.query<IAgentApplication[], unknown>({
            query: () => ({
                url: '/applications/agent-applications ',
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ _id }) => ({ type: 'Requests' as const, _id })),
                        { type: 'Requests', id: 'LIST' },
                    ]
                    : [{ type: 'Requests', id: 'LIST' }],
        }),
        // get all danger requests
        applicationGetAllDanger: build.query<IApplicationDanger[], unknown>({
            query: () => ({
                url: '/applications/danger-requests',
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ _id }) => ({ type: 'Requests' as const, _id })),
                        { type: 'Requests', id: 'LIST' },
                    ]
                    : [{ type: 'Requests', id: 'LIST' }],
        }),
        // get application by id
        applicationGetById: build.query<IApplicationDanger, string>({
            query: (id) => ({
                url: `/applications/danger-requests/${id}`,
            }),
            providesTags: [{ type: 'Requests', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
})

export const {
    useApplicationCreateMutation,
    useApplicationGetAllDangerQuery,
    useApplicationGetByIdQuery,
    useApplicationGetAllClientQuery,
    useApplicationGetAllAgentQuery,
    useApplicationGetAllRespondAgentQuery
} = calculationService;