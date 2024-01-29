import { AuthLink } from "@/components/UI/authLink";
import { Button } from "@/components/UI/button";
import { FormConstructor } from "@/components/formConstructor/formConstructor";
import { authResetChangePasswordForm } from "@/forms/authForm";
import { useUserChangeResetPasswordMutation } from "@/services/authService";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slice/authSlice";
import { authLogin } from "@/utils/isAuth";
import { ChangeResetPasswordSchema, IChangeResetPassword } from "@/utils/yupSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ChangePassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IChangeResetPassword>({
        resolver: yupResolver(ChangeResetPasswordSchema),
    });

    const [changePassword] = useUserChangeResetPasswordMutation()

    const dispatch = useAppDispatch()
    const router = useRouter()

    const sendForm: SubmitHandler<IChangeResetPassword> = (data) => {
        const email = localStorage.getItem('email')
        if (email)
            changePassword({ ...data, email: email }).unwrap()
                .then((res) => {
                    localStorage.setItem('token', res)
                    dispatch(setCredentials({ token: res }))
                    authLogin(res)
                    localStorage.setItem('email', '')
                    router.push('/main')
                    toast.success(`Вы успешно вошли`, {
                        position: 'bottom-right'
                    });
                }).catch(() => {
                    toast.error(`Неправильный email или пароль`, {
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
                register={register} fieldList={authResetChangePasswordForm}
                errors={errors}
            >
                <AuthLink title="Вернуться" link="назад" href="/login" />
                <div className="flex justify-center">
                    <div className="lg:w-7/12">
                        <Button submit color="green">Сменить пароль</Button>
                    </div>
                </div>
            </FormConstructor>
        </section>
    );
}

export default ChangePassword;