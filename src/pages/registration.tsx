import { AuthLink } from "@/components/UI/authLink";
import { Button } from "@/components/UI/button";
import { FormConstructor } from "@/components/formConstructor/formConstructor";
import { authRegisterAgentForm, authRegisterForm } from "@/forms/authForm";
import HeadLayout from "@/layout/headLayout";
import { useUserRegisterMutation } from "@/services/authService";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slice/authSlice";
import { BaseSelectList } from "@/types/form";
import { authLogin } from "@/utils/isAuth";
import { SignUpAgentSchema, SignUpAuth, SignUpSchema } from "@/utils/yupSchema";
import { NextPageContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Registration = () => {

    const { t } = useTranslation('locale')

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
                toast.success(t('registration_page.success_registration'), {
                    position: 'bottom-right'
                });
            }).catch(() => {
                toast.error(t('registration_page.error_registration'), {
                    position: 'bottom-right'
                });
            })
    }
    return (
        <HeadLayout title={t('metategs.registration_page.title')} description={t('metategs.registration_page.description')} keywords={t('metategs.registration_page.keywords')}>
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
                            <Button submit color="green">{t('registration_page.sign_in')}</Button>
                        </div>
                    </div>

                    <AuthLink title={t('registration_page.already_account')} link={t('registration_page.sign_in_btn')} href="/login" />
                </FormConstructor>
            </section>
        </HeadLayout>
    );
}

export default Registration;


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