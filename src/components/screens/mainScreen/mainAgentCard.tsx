import { Button } from "@/components/UI/button";
import { TextCard } from "@/components/UI/textCard";
import { FormConstructor } from "@/components/formConstructor/formConstructor";
import { ModalComponent } from "@/components/modal";
import { RespondAgentForm } from "@/forms/respondForm";
import { useModal } from "@/hooks/useModal";
import { useApplicationGetAllAgentQuery, useApplicationGetAllDangerQuery } from "@/services/calculationService";
import { useRespondNewCreateMutation } from "@/services/requestService";
import { IApplicationDanger } from "@/types/application";
import { CreateRespondApplicationSchema, ICreateRespondApplication } from "@/utils/yupSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const MainAgentCard = () => {
    const { data: allAgentApplication } = useApplicationGetAllAgentQuery(undefined)
    return (
        <div className="flex flex-col gap-5 mt-10">
            {allAgentApplication && allAgentApplication.map(item => {
                return (
                    <div key={item._id} className="border-1 rounded-15xl border-borderGray py-3 px-6 ">
                        <div className="flex flex-col gap-3">
                            <TextCard first="Пункт отправления: ">{item.pointOfDeparture}</TextCard>
                            <TextCard first="Пункт прибытия: ">{item.pointOfArrival}</TextCard>
                            <TextCard first="Тип контейнера: ">{item.containerType}</TextCard>
                            <TextCard first="Характеристика Груза: ">{item.characteristicsOfTheCargo}</TextCard>
                            <TextCard first="Телефон: ">{item.phoneNumber}</TextCard>
                            <TextCard first="Количество откликов: ">{item.countResponses}</TextCard>
                        </div>
                        <div className="w-[350px] mt-5">
                            <Button>Выбрать</Button>
                        </div>
                    </div>
                )
            })
            }
        </div>
    );
};

export const MainAgentDangerCard = () => {
    const { data: allAgentApplication } = useApplicationGetAllDangerQuery(undefined);
    const [createRequest] = useRespondNewCreateMutation();

    const { isOpen: isOpenConfirm, modalChoise: onChoiseConfirm, onCloseModal: onCloseConfirm, onOpenModal: onOpenModalConfirm } = useModal<IApplicationDanger>();

    const { register, handleSubmit, formState: { errors } } = useForm<ICreateRespondApplication>({
        resolver: yupResolver(CreateRespondApplicationSchema)
    });

    const sendForm: SubmitHandler<ICreateRespondApplication> = (data) => {
        if (onChoiseConfirm)
            createRequest({ data: data, id: onChoiseConfirm?._id }).unwrap()
                .then((res) => {
                    toast.success(`Вы оставили отклик`, {
                        position: 'bottom-right'
                    });
                    onCloseConfirm()
                }).catch(() => {
                    toast.error(`При оставлении отклика что-то пошло не так`, {
                        position: 'bottom-right'
                    });
                    onCloseConfirm()
                })
    }

    return (
        <div className="flex flex-col gap-5 mt-10">
            <ModalComponent title={`Отклик на ${onChoiseConfirm?._id}`} isOpen={isOpenConfirm} closeModal={onCloseConfirm}>
                {onChoiseConfirm &&
                    <FormConstructor
                        containerClassName="mt-7 lg:w-1/2"
                        formClassName="grid grid-cols-1 gap-2.5"
                        sendForm={handleSubmit(data => sendForm(data))}
                        register={register} fieldList={RespondAgentForm}
                        errors={errors}
                    >
                        <div className="flex w-full mt-5 items-center gap-5 justify-center">
                            <Button color="gray56" onClick={onCloseConfirm}>Отменить</Button>
                            <Button submit>Откликнуться</Button>
                        </div>
                    </FormConstructor>
                }
            </ModalComponent>

            {allAgentApplication && allAgentApplication.map(item => {
                return (
                    <div key={item._id} className="border-1 rounded-15xl border-borderGray py-3 px-6 ">
                        <div className="flex flex-col gap-3">
                            <TextCard first="Пункт отправления: ">{item.pointOfDeparture}</TextCard>
                            <TextCard first="Пункт прибытия: ">{item.pointOfArrival}</TextCard>
                            <TextCard first="Тип контейнера: ">{item.containerType}</TextCard>
                            <TextCard first="Характеристика Груза: ">{item.characteristicsOfTheCargo}</TextCard>
                            <TextCard first="Телефон: ">{item.phoneNumber}</TextCard>
                            <TextCard first="Количество откликов: ">{item.countResponses}</TextCard>
                        </div>
                        <div className="w-[350px] mt-5">
                            <Button onClick={() => onOpenModalConfirm(item)}>Откликнуться</Button>
                        </div>
                    </div>
                )
            })
            }
        </div>
    );
};