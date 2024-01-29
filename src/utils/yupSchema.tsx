import * as Yup from "yup";

// Form registration
export const SignUpSchema = Yup.object({
    typeUser: Yup.string().required('Поле обязательно'),
    fullname: Yup.string().required('Поле обязательно'),
    email: Yup.string().email('Неправильный формат email')
        .required('Обязательное поле'),
    password: Yup.string()
        .min(8, 'Минимум 8 символов')
        .required('Не может быть пустым'),
    password_repeat: Yup.string()
        .oneOf([Yup.ref('password')], 'Пароли не совпадают')
        .required('Поле обязательно'),
    phoneNumber: Yup.string()
        .min(8, 'Минимум 8 символов')
        .required('Поле обязательно'),
    typeOrg: Yup.string(),
    typeDeal: Yup.string()
})

export const SignUpAgentSchema = Yup.object().shape({
    typeOrg: Yup.string().required('Тип организации обязательное поле'),
    typeDeal: Yup.string().required('Тип сделки обязательное поле')
})

export type SignUpAgentAuth = Yup.InferType<typeof SignUpAgentSchema>;
export type SignUpUserAuth = Yup.InferType<typeof SignUpSchema>;
export type SignUpAuth = SignUpUserAuth | SignUpAgentAuth;

// Form authorization
export const SignInSchema = Yup.object({
    email: Yup.string()
        .email('Неправильный формат email')
        .required('Обязательное поле'),
    password: Yup.string()
        .min(8, 'Минимум 8 символов')
        .required('Не может быть пустым'),
})

export type SignInAuth = Yup.InferType<typeof SignInSchema>;


// form reset password
export const ResetPasswordSchema = Yup.object({
    email: Yup.string()
        .email('Неправильный формат email')
        .required('Обязательное поле'),
})

export type IResetPassword = Yup.InferType<typeof ResetPasswordSchema>;

// Form change reset password
export const ChangeResetPasswordSchema = Yup.object({
    newPassword: Yup.string()
        .required('Обязательное поле'),
    confirmNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Пароли не совпадают')
        .required('Не может быть пустым'),
    secretCode: Yup.string()
        .required('Не может быть пустым'),
})

export type IChangeResetPassword = Yup.InferType<typeof ChangeResetPasswordSchema>;
export type IChangeResetPasswordWithEmail = IChangeResetPassword & { email: string };

// Form change password
export const ChangePasswordSchema = Yup.object({
    newPassword: Yup.string()
        .min(8, 'Минимум 8 символов')
        .required('Обязательное поле'),
    confirmNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Пароли не совпадают')
        .required('Поле обязательно'),
})

export type IChangePassword = Yup.InferType<typeof ChangePasswordSchema>;


// Form create Agent profiles
export const CreateAgentProfileSchema = Yup.object({
    freightRate: Yup.number()
        .required('Обязательное поле'),
    conversionIndication: Yup.number()
        .required('Не может быть пустым'),
    walrusСompany: Yup.number()
        .required('Не может быть пустым'),
    containerRental: Yup.number()
        .required('Не может быть пустым'),
    walrusPerContainer: Yup.number()
        .required('Не может быть пустым'),
})

export type ICreateAgentProfile = Yup.InferType<typeof CreateAgentProfileSchema>;


// Form create Application For Calculation
export const CreateApplicationSchema = Yup.object({
    pointOfDeparture: Yup.string()
        .required('Не может быть пустым'),
    pointOfArrival: Yup.string()
        .required('Не может быть пустым'),
    containerType: Yup.string()
        .required('Не может быть пустым'),
    totalWeight: Yup.string()
        .required('Не может быть пустым'),
    totalVolume: Yup.string()
        .required('Не может быть пустым'),
    maximumDimensions: Yup.string()
        .required('Не может быть пустым'),
    numberOfSeats: Yup.string()
        .required('Не может быть пустым'),
    characteristicsOfTheCargo: Yup.string()
        .required('Не может быть пустым'),
    statusDanger: Yup.string(),
})

export type ICreateAppliaction = Yup.InferType<typeof CreateApplicationSchema>;


// Form create new respond for application
export const CreateRespondApplicationSchema = Yup.object({
    description: Yup.string()
        .required('Не может быть пустым'),
})

export type ICreateRespondApplication = Yup.InferType<typeof CreateRespondApplicationSchema>;
