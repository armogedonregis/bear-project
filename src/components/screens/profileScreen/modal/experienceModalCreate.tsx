import { Button } from "@/components/UI/button";
import { FormConstructor } from "@/components/formConstructor/formConstructor";
import { ModalComponent } from "@/components/modal";
import { experienceForm } from "@/forms/experience";
import { useCreateNewExperienceMutation } from "@/services/experienceService";
import { ExperienceFormchema, ExperienceSchema, PortfolioFormSchema } from "@/utils/yupSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Props = {
    isOpen: boolean;
    onCloseModal: () => void;

}

export const ExperienceModalCreate = ({ isOpen, onCloseModal }: Props) => {
    const { register, control, reset, formState: { errors }, getValues, setValue, watch, handleSubmit } = useForm<ExperienceFormchema>({
        resolver: yupResolver(ExperienceSchema),
    });

    const [createExperience] = useCreateNewExperienceMutation()

    const sendForm: SubmitHandler<ExperienceFormchema> = (data) => {
        const formData = new FormData();

        for (const key in data) {
            if (key === "attachments") {
                data.attachments.forEach((image: any) => {
                    formData.append(`attachments`, image);
                });
            } else {
                formData.append(key, (data as any)[key]);
            }
        }
        createExperience(formData).unwrap()
            .then(() => {
                toast.success(`Опыт успешно добавлен`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                reset()
                onCloseModal()
            }).catch(() => {
                toast.error(`Что-то пошло не так...`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                reset()
                onCloseModal()
            })
    }
    return (
        <ModalComponent width="lg:w-5/12" title="Опыт - добавление" isOpen={isOpen} closeModal={onCloseModal}>
            {isOpen &&
                <FormConstructor
                    containerClassName="mt-8 w-full"
                    formClassName="grid grid-cols-1 gap-2 w-full"
                    sendForm={handleSubmit(data => sendForm(data))}
                    register={register} fieldList={experienceForm}
                    errors={errors}
                    getValues={getValues} watch={watch} control={control} setValue={setValue}
                >
                    <div className="flex items-center mt-5 justify-between w-full gap-5">
                        <Button onClick={onCloseModal} color="gray">Отмена</Button>
                        <Button submit color="blue">Подтвердить</Button>
                    </div>
                </FormConstructor>
            }
        </ModalComponent>
    );
};