import { AuthLink } from "@/components/UI/authLink";
import { Button } from "@/components/UI/button";
import { FormConstructor } from "@/components/formConstructor/formConstructor";
import { authLoginForm } from "@/forms/authForm";
import HeadLayout from "@/layout/headLayout";
import { useUserLoginMutation } from "@/services/authService";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slice/authSlice";
import { authLogin } from "@/utils/isAuth";
import { SignInAuth, SignInSchema } from "@/utils/yupSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { NextPageContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Login = () => {

    const { t } = useTranslation('locale');

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
                toast.success(t('login_page.forgot_password'), {
                    position: 'bottom-right'
                });
            }).catch(() => {
                toast.error(t('login_page.error_modal'), {
                    position: 'bottom-right'
                });
            })
    }
    return (
        <HeadLayout title={t('metategs.login_page.title')} description={t('metategs.login_page.description')} keywords={t('metategs.login_page.keywords')}>
            <section className="flex flex-col mt-6 lg:mt-20 items-center">
                <FormConstructor
                    containerClassName="mt-7 w-9/12 lg:w-1/2"
                    formClassName="grid grid-cols-1 gap-2.5"
                    sendForm={handleSubmit(data => sendForm(data))}
                    register={register} fieldList={authLoginForm}
                    errors={errors}
                >
                    <AuthLink title={t('login_page.forgot_password')} link={t('login_page.forgot_link')} href="/reset-password" />
                    <div className="flex justify-center">
                        <div className="lg:w-5/12">
                            <Button submit color="green">{t('login_page.sign_in')}</Button>
                        </div>
                    </div>

                    <AuthLink title={t('login_page.dont_account')} link={t('login_page.register')} href="/registration" />
                </FormConstructor>
            </section>
        </HeadLayout>
    );
}

export default Login;


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