import { IForm } from "@/types/form";
import { IChangePassword, ICreateAgentProfile } from "@/utils/yupSchema";

// create agent profile
export const createAgentForm: IForm<ICreateAgentProfile>[] = [
    {
        fieldName: "freightRate",
        type: "input",
        placeholder: "Freight Rate",
        label: "Freight Rate"
    },
    {
        fieldName: "conversionIndication",
        type: "input",
        placeholder: "Conversion Indication",
        label: "Conversion Indication"
    },
    {
        fieldName: "walrusСompany",
        type: "input",
        placeholder: "Walrus Company",
        label: "Walrus Company"
    },
    {
        fieldName: "containerRental",
        type: "input",
        placeholder: "Container Rental",
        label: "Container Rental"
    },
    {
        fieldName: "walrusPerContainer",
        type: "input",
        placeholder: "Walrus Per Container",
        label: "Walrus Per Container"
    }
];

// change password profile
export const changePasswordProfileForm: IForm<IChangePassword>[] = [
    {
        fieldName: "newPassword",
        type: "input",
        placeholder: "Введите новый пароль",
        label: "Новый пароль"
    },
    {
        fieldName: "confirmNewPassword",
        type: "input",
        placeholder: "Повторите новый пароль",
        label: "Повторите новый пароль"
    }
];