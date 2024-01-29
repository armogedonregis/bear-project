import { BaseSelectList, IForm } from "@/types/form";
import { IChangePassword, IChangeResetPassword, IResetPassword, SignInAuth, SignUpAgentAuth, SignUpUserAuth } from "@/utils/yupSchema";


// login form
export const authLoginForm: IForm<SignInAuth>[] = [
    {
        fieldName: "email",
        placeholder: "Полное имя",
        type: "input",
        label: "Email"
    },
    {
        fieldName: "password",
        placeholder: "Имя пользователя",
        type: "input",
        pass: true,
        label: "Password"
    }
];

// select type user
const typeUser: BaseSelectList[] = [
    {
        value: 'Client',
        label: 'Клиент'
    },
    {
        value: 'Agent',
        label: "Агент"
    }
]

// register form
export const authRegisterForm: IForm<SignUpUserAuth>[] = [
    {
        fieldName: "typeUser",
        placeholder: "Выберите тип аккаунта",
        type: "select",
        label: "Тип аккаунта",
        listItem: typeUser
    },
    {
        fieldName: "fullname",
        placeholder: "ФИО",
        type: "input",
        label: "ФИО"
    },
    {
        fieldName: "email",
        placeholder: "Email",
        type: "input",
        label: "Email"
    },
    {
        fieldName: "password",
        placeholder: "Введите пароль",
        type: "input",
        label: "Пароль",
        pass: true
    },
    {
        fieldName: "password_repeat",
        placeholder: "Повторите пароль",
        type: "input",
        label: "Повторите пароль",
        pass: true
    }
];

// select type org
const typeOrg: BaseSelectList[] = [
    {
        value: 'ОАО',
        label: 'ОАО'
    },
    {
        value: 'ЗАО',
        label: "ЗАО"
    },
    {
        value: 'ООО',
        label: "ООО"
    },
    {
        value: 'ИП',
        label: "ИП"
    }
]

// select type deal
const typeDeal: BaseSelectList[] = [
    {
        value: 'Логистическая Компания',
        label: 'Логистическая Компания'
    },
    {
        value: 'Агентирование',
        label: "Агентирование"
    }
]

// agent form
export const authRegisterAgentForm: IForm<SignUpAgentAuth>[] = [
    {
        fieldName: "typeOrg",
        type: "select",
        placeholder: "Тип организации",
        listItem: typeOrg,
        label: "Тип организации"
    },
    {
        fieldName: "typeDeal",
        type: "select",
        listItem: typeDeal,
        placeholder: "Тип работы",
        label: "Тип работы"
    }
];

// reset password form
export const authResetPasswordForm: IForm<IResetPassword>[] = [
    {
        fieldName: "email",
        type: "input",
        placeholder: "Введите email",
        label: "Email"
    }
];

// reset change password form
export const authResetChangePasswordForm: IForm<IChangeResetPassword>[] = [
    {
        fieldName: "secretCode",
        type: "input",
        placeholder: "Введите код из email",
        label: "Код из email"
    },
    {
        fieldName: "newPassword",
        type: "input",
        placeholder: "Введите новый пароль",
        label: "Новый пароль",
        pass: true
    },
    {
        fieldName: "confirmNewPassword",
        type: "input",
        placeholder: "Повторите новый пароль",
        label: "Повторите пароль",
        pass: true
    }
];

// change password
export const authChangePasswordForm: IForm<IChangePassword>[] = [
    {
        fieldName: "newPassword",
        type: "input",
        placeholder: "Новый пароль",
        label: "Новый пароль",
        pass: true
    },
    {
        fieldName: "confirmNewPassword",
        type: "input",
        placeholder: "Повторите пароль",
        label: "Повторите пароль",
        pass: true
    }
];