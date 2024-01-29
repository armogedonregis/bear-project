import { Button } from "@/components/UI/button";
import { FormConstructor } from "@/components/formConstructor/formConstructor";
import { ModalComponent } from "@/components/modal";
import { portfolioForm } from "@/forms/porfolioForm";
import { useCreateNewPortfolioMutation } from "@/services/portfolioService";
import { PortfolioFormSchema } from "@/utils/yupSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Props = {
    isOpen: boolean;
    onCloseModal: () => void;

}

export const PorfolioModalCreate = ({ isOpen, onCloseModal }: Props) => {
    const { register, control, reset, formState: { errors }, getValues, setValue, watch, handleSubmit } = useForm<PortfolioFormSchema>();

    const [createPortfolio] = useCreateNewPortfolioMutation()

    const sendForm: SubmitHandler<PortfolioFormSchema> = (data) => {
        const formData = new FormData();

        for (const key in data) {
            if (key === "proofs") {
                data.proofs.forEach((image) => {
                    formData.append(`proofs`, image);
                });
            } else {
                formData.append(key, (data as any)[key]);
            }
        }
        createPortfolio(formData).unwrap()
            .then(() => {
                toast.success(`Портфолио успешно добавлено`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                onCloseModal()
                reset()
            }).catch(() => {
                toast.error(`Что-то пошло не так...`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                reset()
            })
    }
    return (
        <ModalComponent width="lg:w-5/12" title="Портфолио - добавление" isOpen={isOpen} closeModal={onCloseModal}>
            {isOpen &&
                <FormConstructor
                    containerClassName="mt-8 w-full"
                    formClassName="grid grid-cols-1 gap-2 w-full"
                    sendForm={handleSubmit(data => sendForm(data))}
                    register={register}
                    getValues={getValues} errors={errors}
                    watch={watch} control={control} setValue={setValue} fieldList={portfolioForm}
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