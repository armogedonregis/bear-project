// type user
export type IUser = {
    _id: string;
    typeUser: 'Agent' | 'Client';
    fullname: string;
    email: string;
    phoneNumber: string;
    typeOrg: string;
    typeDeal: string;
    roles: string[];
    verified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// type agent
export type IAgent = {
    _id: string;
    freightRate: string;
    conversionIndication: string;
    walrusCompany: string;
    containerRental: string;
    walrusPerContainer: number;
    price: number;
    nameAgent: string;
    phoneNumber: string;
    user: string;
    createdAt: Date;
    updatedAt: Date;
}