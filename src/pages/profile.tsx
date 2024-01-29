import { Button } from "@/components/UI/button";
import { FormConstructor } from "@/components/formConstructor/formConstructor";
import { createAgentForm } from "@/forms/profileForm";
import { useAgentCreateProfileMutation } from "@/services/agentService";
import { isAuth } from "@/utils/isAuth";
import { CreateAgentProfileSchema, ICreateAgentProfile } from "@/utils/yupSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { NextPageContext } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Profile = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ICreateAgentProfile>({
        resolver: yupResolver(CreateAgentProfileSchema),
    });

    const [createAgentProfile] = useAgentCreateProfileMutation()

    const sendForm: SubmitHandler<ICreateAgentProfile> = (data) => {
        createAgentProfile(data).unwrap()
            .then((res) => {
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
                        <Button submit color="green">Создать профиль</Button>
                    </div>
                </div>
            </FormConstructor>
        </section>
    );
}

export default Profile;


export const getServerSideProps = async (ctx: NextPageContext) => {
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
      props: {},
    }
  };