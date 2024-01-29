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
    createdAt: Date;
    updatedAt: Date;
    statusRequestForAgent: string;
    statusRequestForClient: string;
}