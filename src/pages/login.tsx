import { AuthLink } from "@/components/UI/authLink";
import { Button } from "@/components/UI/button";
import { FormConstructor } from "@/components/formConstructor/formConstructor";
import { authLoginForm } from "@/forms/authForm";
import { useUserLoginMutation } from "@/services/authService";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slice/authSlice";
import { authLogin } from "@/utils/isAuth";
import { SignInAuth, SignInSchema } from "@/utils/yupSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<SignInAuth>({
        resolver: yupResolver(SignInSchema),
    });

    const [loginUser] = useUserLoginMutation()

    const dispatch = useAppDispatch()
    const router = useRouter()

    const sendForm: SubmitHandler<SignInAuth> = (data) => {
        loginUser(data).unwrap()
            .then((res) => {
                localStorage.setItem('token', res.token)
                dispatch(setCredentials({ token: res.token }))
                authLogin(res.token)
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
                register={register} fieldList={authLoginForm}
                errors={errors}
            >
                <AuthLink title="Забыли пароль?" link="Восстановить" href="/reset-password" />
                <div className="flex justify-center">
                    <div className="lg:w-5/12">
                        <Button submit color="green">Вход</Button>
                    </div>
                </div>

                <AuthLink title="Нет аккаунта?" link="Регистрация" href="/registration" />
            </FormConstructor>
        </section>
    );
}

export default Login;