import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { FormConstructor } from "@/components/formConstructor/formConstructor";
import { Button } from "@/components/UI/button";
import { SignUpAuth, SignUpSchema } from "@/utils/yupSchema";
import { AuthLangingForm } from "@/forms/authForm";
import { useUserRegisterMutation } from "@/services/authService";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/router";
import { setCredentials } from "@/store/slice/authSlice";
import { authLogin } from "@/utils/isAuth";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";

export const FormRegistrationScreen = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<SignUpAuth>({
        resolver: yupResolver(SignUpSchema),
    });

    const [regUser] = useUserRegisterMutation()

    const dispatch = useAppDispatch()
    const router = useRouter()

    const sendForm: SubmitHandler<SignUpAuth> = (data) => {
        regUser(data).unwrap()
        .then((res) => {
            localStorage.setItem('token', res.token)
            dispatch(setCredentials({ token: res.token }))
            authLogin(res.token)
            router.push('/main')
            toast.success(`Вы успешно зарегистрировались`, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }).catch(() => {
            toast.error(`Ошибка во время регистрации`, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        })
    }
    return (
        <FormConstructor
            sendForm={handleSubmit(data => sendForm(data))}
            register={register}
            fieldList={AuthLangingForm}
            formStyle="formLanging"
            landing
            errors={errors}
            containerClassName="mt-7 mb-7 lg:px-20 w-full"
            inputClassName="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 w-full"
            checkBoxLabel={
                <p className="text-black text-xs lg:text-nowrap">
                    я подтверждаю, что ознакомился с <Link href="/privacy-policy" className="text-primary">Условиями Пользования и
                        Политикой
                        Конфиденциальности</Link> CatchMe
                </p>
            }
        >
            <div className="mt-5 flex flex-col items-center">
                <Button submit color="signUp">Регистрация</Button>
            </div>
        </FormConstructor>
    )
};