import { AuthLink } from "@/components/UI/authLink";
import { Button } from "@/components/UI/button";
import { FormConstructor } from "@/components/formConstructor/formConstructor";
import { changePasswordProfileForm } from "@/forms/profileForm";
import { useUserChangeProfilePasswordMutation } from "@/services/authService";
import { isAuth } from "@/utils/isAuth";
import { ChangePasswordSchema, IChangePassword } from "@/utils/yupSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { NextPageContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ChangePasswordProfile = () => {

    const { t } = useTranslation('locale');

    const { register, handleSubmit, formState: { errors } } = useForm<IChangePassword>({
        resolver: yupResolver(ChangePasswordSchema),
    });

    const [changePassword] = useUserChangeProfilePasswordMutation()

    const router = useRouter()

    const sendForm: SubmitHandler<IChangePassword> = (data) => {
            changePassword(data).unwrap()
                .then((res) => {
                    router.push('/main')
                    toast.success(t('change_password_profile_page.success_change'), {
                        position: 'bottom-right'
                    });
                }).catch(() => {
                    toast.error(t('change_password_profile_page.error_change'), {
                        position: 'bottom-right'
                    });
                })
    }
    return (
        <section className="flex flex-col mt-6 lg:mt-20 items-center">
            <div className="text-xl">{t('change_password_profile_page.change_title')}</div>
            <FormConstructor
                containerClassName="mt-7 w-9/12 lg:w-1/2"
                formClassName="grid grid-cols-1 gap-2.5"
                sendForm={handleSubmit(data => sendForm(data))}
                register={register} fieldList={changePasswordProfileForm}
                errors={errors}
            >
                <AuthLink title={t('change_password_profile_page.return_title')} link={t('change_password_profile_page.return_link')} href="/main" />
                <div className="flex justify-center">
                    <div className="lg:w-7/12">
                        <Button submit color="green">{t('change_password_profile_page.change_password_btn')}</Button>
                    </div>
                </div>
            </FormConstructor>
        </section>
    );
}

export default ChangePasswordProfile;


export const getServerSideProps = async (ctx: NextPageContext) => {

    // Определяем локализацию
    const lang = ctx.locale

    const isAuthencate = await isAuth(ctx)

    if (!isAuthencate) {
        return {
            redirect: {
                destination: '/login',
                permanent: true,
            },
        }
    }

    return {
        props: {
            ...(await serverSideTranslations(lang ?? 'ru', [
                'common',
                'locale'
            ])),
        },
    }
};