// request respond to request Application
export type IRespond = {
    _id: string;
    fullname: string;
    phoneNumber: string;
    price: number;
    description: string;
    user: string;
    agent: string;
    application: string;
    createdAt: Date;
    updatedAt: Date;
    startUpStatus: boolean;
    statusRequestForClient: string;
    statusRequestForAgent: string;
}