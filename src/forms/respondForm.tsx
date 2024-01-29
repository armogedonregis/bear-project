import { IForm } from "@/types/form";
import { ICreateRespondApplication } from "@/utils/yupSchema";

export const RespondAgentForm: IForm<ICreateRespondApplication>[] = [
    {
        fieldName: "description",
        type: "input",
        label: "Описание",
        placeholder: "Добавьте описание к отклику"
    }
];