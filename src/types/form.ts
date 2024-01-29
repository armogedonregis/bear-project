import { Path } from "react-hook-form";

export type IFormType = 'input' | 'title' | 'select';

export type IFormStyle = 'formAuth';

export type BaseSelectList = {
    value: string;
    label: string;
}

export type IFormArea<T, U extends IFormType>  = {
    fieldName?: U extends 'input' | 'select' ? Path<T> : never;
    type: U;
    label?: string;
    placeholder?: string;
    pass?: boolean;
    listItem?: BaseSelectList[];
    iconLeft?: React.ReactElement;
    iconRight?: React.ReactElement;
    postLabel?: string;
};

export type IForm<T> = IFormArea<T, "input"> | IFormArea<T, "title"> | IFormArea<T, "select">;