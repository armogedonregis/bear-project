import { AuthLink } from "@/components/UI/authLink";
import { Button } from "@/components/UI/button";
import { FormConstructor } from "@/components/formConstructor/formConstructor";
import { changePasswordProfileForm } from "@/forms/profileForm";
import { useUserChangeProfilePasswordMutation } from "@/services/authService";
import { ChangePasswordSchema, IChangePassword } from "@/utils/yupSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ChangePasswordProfile = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IChangePassword>({
        resolver: yupResolver(ChangePasswordSchema),
    });

    const [changePassword] = useUserChangeProfilePasswordMutation()

    const router = useRouter()

    const sendForm: SubmitHandler<IChangePassword> = (data) => {
            changePassword(data).unwrap()
                .then((res) => {
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
            <div className="text-xl">Смена пароля</div>
            <FormConstructor
                containerClassName="mt-7 w-9/12 lg:w-1/2"
                formClassName="grid grid-cols-1 gap-2.5"
                sendForm={handleSubmit(data => sendForm(data))}
                register={register} fieldList={changePasswordProfileForm}
                errors={errors}
            >
                <AuthLink title="Вернуться" link="назад" href="/main" />
                <div className="flex justify-center">
                    <div className="lg:w-7/12">
                        <Button submit color="green">Сменить пароль</Button>
                    </div>
                </div>
            </FormConstructor>
        </section>
    );
}

export default ChangePasswordProfile;