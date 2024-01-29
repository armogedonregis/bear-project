import { ICreateAgentProfile } from "@/utils/yupSchema";
import { bearplusApi } from "./bearplusApi";
import { IAgent } from "@/types/user";


const agentService = bearplusApi.injectEndpoints({
    endpoints: (build) => ({
        // create agent profile
        agentCreateProfile: build.mutation<IAgent, ICreateAgentProfile>({
            query: (data) => ({
                method: 'POST',
                url: '/agent-profile/create',
                body: data
            }),
        }),
        // get agent profile
        agentGetProfile: build.query<IAgent, unknown>({
            query: () => ({
                url: '/agent-profile',
            }),
        }),
        // agent update profile
        agentUpdateProfile: build.mutation<IAgent, ICreateAgentProfile>({
            query: (data) => ({
                method: 'PUT',
                url: '/agent-profile/update',
                body: data
            }),
        }),
    }),
    overrideExisting: false,
})

export const {
    useAgentCreateProfileMutation,
    useAgentGetProfileQuery,
    useAgentUpdateProfileMutation
} = agentService;