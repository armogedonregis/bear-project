export type IApplicationResponse = StatusTrueDanger | StatusFalseDanger[];

type StatusTrueDanger = {
    message: string;
}

type StatusFalseDanger = {
    _id: string;
    price: number;
    nameAgent: string;
    phoneNumber: string;
}

export type IApplicationDanger = {
    _id: string;
    pointOfDeparture: string;
    pointOfArrival: string;
    containerType: string;
    characteristicsOfTheCargo: string;
    statusDanger: boolean;
    sendingUser: string;
    phoneNumber: string;
    countResponses: number;
    statusRequest: string;
    createdAt: string;
    updatedAt: string;
    statusRequestForAgent: string;
    statusRequestForClient: string;
}

export type IAgentApplication = {
    _id: string;
    application: {
        _id: string;
        pointOfDeparture: string;
        pointOfArrival: string;
        containerType: string;
        statusDanger: true,
        phoneNumber: string;
        createdAt: string;
        updatedAt: string;
    },
    user: string;
    createdAt: string;
    updatedAt: string;
}