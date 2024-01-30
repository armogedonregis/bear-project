import { ICreateRespondApplication } from "@/utils/yupSchema";
import { bearplusApi } from "./bearplusApi";
import { IRespond } from "@/types/respond";
import { IApplicationDanger } from "@/types/application";

const requestService = bearplusApi.injectEndpoints({
    endpoints: (build) => ({
        // create application for calculation
        respondNewCreate: build.mutation<IRespond, {id: any, data: ICreateRespondApplication}>({
            query: ({ id, data }) => ({
                method: 'POST',
                url: `/responds/create/${id}`,
                body: data
            }),
            invalidatesTags: [{ type: 'Requests', id: 'LIST' }],
        }),
        // Get Responds to Applications For Client By Application ID
        respondClientByApplicationId: build.query<IRespond[], string>({
            query: (id) => ({
                url: `/responds/client/${id}`,
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ _id }) => ({ type: 'Requests' as const, _id })),
                        { type: 'Requests', id: 'LIST' },
                    ]
                    : [{ type: 'Requests', id: 'LIST' }],
        }),
        // Get Respond to Application For Client By Application ID and Response ID
        respondClientByResponseId: build.query<IRespond, {applicationId: string, responseId: string}>({
            query: ({ applicationId, responseId }) => ({
                url: `/responds/client/${applicationId}/response/${responseId}`,
            }),
            providesTags: [{ type: 'Requests', id: 'LIST' }],
        }),
        // Get Responds to Applications For Agent By Application ID
        respondAgentApplicationById: build.query<IRespond[], string>({
            query: (id) => ({
                url: `/responds/agent/${id}`,
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ _id }) => ({ type: 'Requests' as const, _id })),
                        { type: 'Requests', id: 'LIST' },
                    ]
                    : [{ type: 'Requests', id: 'LIST' }],
        }),
        // Get Respond to Application For Agent By Application ID and Response ID
        respondAgentByResponseId: build.query<IRespond, {applicationId: string, responseId: string}>({
            query: ({ applicationId, responseId }) => ({
                url: `/responds/agent/${applicationId}/response/${responseId}`,
            }),
            providesTags: [{ type: 'Requests', id: 'LIST' }],
        }),
        // Get Responds to Applications Start Up Status For Agent By Application ID
        respondStartUpAgentById: build.query<IRespond[], string>({
            query: (id) => ({
                url: `/responds/agent/start-up-status/${id}`,
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ _id }) => ({ type: 'Requests' as const, _id })),
                        { type: 'Requests', id: 'LIST' },
                    ]
                    : [{ type: 'Requests', id: 'LIST' }],
        }),
        // Get Respond to Application Start Up Status For Agent By Application ID and Response ID
        respondApplicationStartUpAgentById: build.query<IRespond, {applicationId: string, responseId: string}>({
            query: ({ applicationId, responseId }) => ({
                url: `/responds/agent/start-up-status/${applicationId}/response/${responseId}`,
            }),
            providesTags: [{ type: 'Requests', id: 'LIST' }],
        }),
        // Change And Approve Respond Status For Client And Agent
        respondApproveStatusClient: build.mutation<IApplicationDanger, {applicationId: string, responseId: string}>({
            query: ({ applicationId, responseId }) => ({
                method: 'POST',
                url: `/responds/client/approve/${applicationId}/response/${responseId}`,
            }),
            invalidatesTags: [{ type: 'Requests', id: 'LIST' }],
        }),
        // Change And Approve Respond Status For Client And Agent Step Two
        respondApproveStatusClientStepTwo: build.mutation<IRespond, {applicationId: string, responseId: string}>({
            query: ({ applicationId, responseId }) => ({
                method: 'POST',
                url: `/responds/client/approve-step-two/${applicationId}/response/${responseId}`,
            }),
            invalidatesTags: [{ type: 'Requests', id: 'LIST' }],
        }),
        // Change Or Approve Respond Status For Agent And Client Step Cancel
        respondApproveStatusClientCancel: build.mutation<IApplicationDanger, {applicationId: string, responseId: string}>({
            query: ({ applicationId, responseId }) => ({
                method: 'POST',
                url: `/responds/agent/approve-step-cancel/${applicationId}/response/${responseId}`,
            }),
            invalidatesTags: [{ type: 'Requests', id: 'LIST' }],
        }),
        // Change And Approve Respond Status For Client And Agent Step Cancel
        respondApproveStatusAgentCancel: build.mutation<IApplicationDanger, {applicationId: string, responseId: string}>({
            query: ({ applicationId, responseId }) => ({
                method: 'POST',
                url: `/responds/client/approve-step-cancel/${applicationId}/response/${responseId}`,
            }),
            invalidatesTags: [{ type: 'Requests', id: 'LIST' }],
        }),
        // Change Or Approve Respond Status For Agent And Client Step Final Success
        respondApproveStatusAgentClientSuccess: build.mutation<IRespond, {applicationId: string, responseId: string}>({
            query: ({ applicationId, responseId }) => ({
                method: 'POST',
                url: `/responds/agent/approve-step-success/${applicationId}/response/${responseId}`,
            }),
            invalidatesTags: [{ type: 'Requests', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
})

export const {
    useRespondNewCreateMutation,
    useRespondClientByApplicationIdQuery,
    useRespondClientByResponseIdQuery,
    useRespondAgentApplicationByIdQuery,
    useRespondAgentByResponseIdQuery,
    useRespondStartUpAgentByIdQuery,
    useRespondApplicationStartUpAgentByIdQuery,
    // mutation
    useRespondApproveStatusClientMutation,
    useRespondApproveStatusClientStepTwoMutation,
    useRespondApproveStatusClientCancelMutation,
    useRespondApproveStatusAgentCancelMutation,
    useRespondApproveStatusAgentClientSuccessMutation
} = requestService;