import { Button } from "@/components/UI/button";
import { FormConstructor } from "@/components/formConstructor/formConstructor";
import { createAgentForm } from "@/forms/profileForm";
import HeadLayout from "@/layout/headLayout";
import { useAgentCreateProfileMutation } from "@/services/agentService";
import { isAuth } from "@/utils/isAuth";
import { CreateAgentProfileSchema, ICreateAgentProfile } from "@/utils/yupSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { NextPageContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Profile = () => {
    const { t } = useTranslation('locale')
    
    const { register, handleSubmit, formState: { errors } } = useForm<ICreateAgentProfile>({
        resolver: yupResolver(CreateAgentProfileSchema),
    });

    const [createAgentProfile] = useAgentCreateProfileMutation()

    const sendForm: SubmitHandler<ICreateAgentProfile> = (data) => {
        createAgentProfile(data).unwrap()
            .then((res) => {
                toast.success(t('profile_page.confirm_create_profile'), {
                    position: 'bottom-right'
                });
            }).catch(() => {
                toast.error(t('profile_page.error_create_profile'), {
                    position: 'bottom-right'
                });
            })
    }
    return (
        <HeadLayout title={t('metategs.profile_page.title')} description={t('metategs.profile_page.description')} keywords={t('metategs.profile_page.keywords')}>
            <section className="flex flex-col h-full items-center">
                <FormConstructor
                    containerClassName="mt-7 w-1/2"
                    formClassName="grid grid-cols-1 gap-2.5"
                    sendForm={handleSubmit(data => sendForm(data))}
                    register={register} fieldList={createAgentForm}
                    errors={errors}
                >
                    <div className="flex justify-center">
                        <div className="w-5/12">
                            <Button submit color="green">{t('profile_page.btn_create_profile')}</Button>
                        </div>
                    </div>
                </FormConstructor>
            </section>
        </HeadLayout>
    );
}

export default Profile;


export const getServerSideProps = async (ctx: NextPageContext) => {
    const isAuthencate = await isAuth(ctx)

     // Определяем локализацию
     const lang = ctx.locale
  
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