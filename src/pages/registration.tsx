import { AuthLink } from "@/components/UI/authLink";
import { Button } from "@/components/UI/button";
import { FormConstructor } from "@/components/formConstructor/formConstructor";
import { authRegisterAgentForm, authRegisterForm } from "@/forms/authForm";
import { useUserRegisterMutation } from "@/services/authService";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slice/authSlice";
import { BaseSelectList } from "@/types/form";
import { authLogin } from "@/utils/isAuth";
import { SignUpAgentSchema, SignUpAuth, SignUpSchema } from "@/utils/yupSchema";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Registration = () => {

    const [state, setState] = useState(authRegisterForm)

    const { register, handleSubmit, watch, control, formState: { errors } } = useForm<SignUpAuth>({

    });

    const containerType = watch('typeUser')

    useEffect(() => {
        if (containerType === 'Agent') {
            setState((prev) => [...prev, ...authRegisterAgentForm])
        } else {
            setState(authRegisterForm)
        }
    }, [containerType])

    const [registerUser] = useUserRegisterMutation()

    const dispatch = useAppDispatch()
    const router = useRouter()

    const sendForm: SubmitHandler<SignUpAuth> = (data) => {
        registerUser(data).unwrap()
            .then((res) => {
                localStorage.setItem('token', res.token)
                dispatch(setCredentials({ token: res.token }))
                authLogin(res.token)
                router.push('/main')
                toast.success(`Вы успешно зарегистрировались`, {
                    position: 'bottom-right'
                });
            }).catch(() => {
                toast.error(`Что-то пошло не так`, {
                    position: 'bottom-right'
                });
            })
    }
    return (
        <section className="flex flex-col mt-6 lg:mt-20 items-center">
            <FormConstructor
                containerClassName="mt-7 w-9/12 lg:w-1/2"
                formClassName="grid grid-cols-1 gap-2.5"
                sendForm={handleSubmit(data => sendForm(data))}
                register={register} fieldList={state}
                errors={errors} control={control}
            >
                <div className="flex justify-center">
                    <div className="lg:w-5/12">
                        <Button submit color="green">Вход</Button>
                    </div>
                </div>

                <AuthLink title="Уже есть аккаунт?" link="Войти" href="/login" />
            </FormConstructor>
        </section>
    );
}

export default Registration;