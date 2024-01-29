import { AuthLink } from "@/components/UI/authLink";
import { Button } from "@/components/UI/button";
import { FormConstructor } from "@/components/formConstructor/formConstructor";
import { authResetPasswordForm } from "@/forms/authForm";
import { useUserResetPasswordMutation } from "@/services/authService";
import { useAppDispatch } from "@/store/hooks";
import { IResetPassword, ResetPasswordSchema } from "@/utils/yupSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ResetPassword = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<IResetPassword>({
        resolver: yupResolver(ResetPasswordSchema),
    });

    const [changePassword] = useUserResetPasswordMutation()

    const router = useRouter()

    const sendForm: SubmitHandler<IResetPassword> = (data) => {
        changePassword(data).unwrap()
            .then((res) => {
                localStorage.setItem('email', res)
                router.push('/change-password')
                toast.success(`Письмо отправлено на email`, {
                    position: 'bottom-right'
                });
            }).catch(() => {
                toast.error(`Что-то пошло не так или такого email не существует`, {
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
                register={register} fieldList={authResetPasswordForm}
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

export default ResetPassword;