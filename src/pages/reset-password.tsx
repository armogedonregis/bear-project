import { AuthLink } from "@/components/UI/authLink";
import { Button } from "@/components/UI/button";
import { FormConstructor } from "@/components/formConstructor/formConstructor";
import { authResetPasswordForm } from "@/forms/authForm";
import HeadLayout from "@/layout/headLayout";
import { useUserResetPasswordMutation } from "@/services/authService";
import { useAppDispatch } from "@/store/hooks";
import { IResetPassword, ResetPasswordSchema } from "@/utils/yupSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { NextPageContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ResetPassword = () => {

    const { t } = useTranslation('locale')

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
                toast.success(t('reset_password.success_reset') + ' ' + data.email, {
                    position: 'bottom-right'
                });
            }).catch(() => {
                toast.error(t('reset_password.error_reset'), {
                    position: 'bottom-right'
                });
            })
    }
    return (
        <HeadLayout title={t('metategs.reset_password_page.title')} description={t('metategs.reset_password_page.description')} keywords={t('metategs.reset_password_page.keywords')}>
            <section className="flex flex-col mt-6 lg:mt-20 items-center">
                <FormConstructor
                    containerClassName="mt-7 w-9/12 lg:w-1/2"
                    formClassName="grid grid-cols-1 gap-2.5"
                    sendForm={handleSubmit(data => sendForm(data))}
                    register={register} fieldList={authResetPasswordForm}
                    errors={errors}
                >
                    <AuthLink title={t('reset_password.return_title')} link={t('reset_password.return_link')} href="/login" />
                    <div className="flex justify-center">
                        <div className="lg:w-7/12">
                            <Button submit color="green">{t('reset_password.change_password_btn')}</Button>
                        </div>
                    </div>
                </FormConstructor>
            </section>
        </HeadLayout>
    );
}

export default ResetPassword;


export const getServerSideProps = async (ctx: NextPageContext) => {

    // Определяем локализацию
    const lang = ctx.locale

    return {
        props: {
            ...(await serverSideTranslations(lang ?? 'ru', [
                'common',
                'locale'
            ])),
        },
    }
};