import { ICreateAppliaction } from "@/utils/yupSchema";
import { bearplusApi } from "./bearplusApi";
import { IApplicationDanger, IApplicationResponse } from "@/types/application";


const calculationService = bearplusApi.injectEndpoints({
    endpoints: (build) => ({
        // create application for calculation
        applicationCreate: build.mutation<IApplicationResponse, ICreateAppliaction>({
            query: (data) => ({
                method: 'POST',
                url: '/applications/create',
                body: data
            }),
        }),
        // get all client requests
        applicationGetAllClient: build.query<IApplicationDanger[], unknown>({
            query: () => ({
                url: '/applications/client',
            }),
        }),
        // get all agent requests
        applicationGetAllAgent: build.query<IApplicationDanger[], unknown>({
            query: () => ({
                url: '/applications/agent',
            }),
        }),
        // get all danger requests
        applicationGetAllDanger: build.query<IApplicationDanger[], unknown>({
            query: () => ({
                url: '/applications/danger-requests',
            }),
        }),
        // get application by id
        applicationGetById: build.query<IApplicationDanger, string>({
            query: (id) => ({
                url: `/applications/danger-requests/${id}`,
            }),
        }),
    }),
    overrideExisting: false,
})

export const {
    useApplicationCreateMutation,
    useApplicationGetAllDangerQuery,
    useApplicationGetByIdQuery,
    useApplicationGetAllClientQuery,
    useApplicationGetAllAgentQuery
} = calculationService;