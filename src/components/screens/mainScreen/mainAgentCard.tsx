import { Button } from "@/components/UI/button";
import { TextCard } from "@/components/UI/textCard";
import { FormConstructor } from "@/components/formConstructor/formConstructor";
import { ModalComponent } from "@/components/modal";
import { RespondAgentForm } from "@/forms/respondForm";
import { useModal } from "@/hooks/useModal";
import { useApplicationGetAllAgentQuery, useApplicationGetAllDangerQuery } from "@/services/calculationService";
import { useRespondApproveStatusClientCancelMutation, useRespondNewCreateMutation, useRespondStartUpAgentByIdQuery } from "@/services/requestService";
import { IApplicationDanger } from "@/types/application";
import { IRespond } from "@/types/respond";
import formatDateDistanceToNow from "@/utils/formatDateDistanceToNow";
import { CreateRespondApplicationSchema, ICreateRespondApplication } from "@/utils/yupSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const MainAgentCard = () => {
    const { data: allAgentApplication } = useApplicationGetAllAgentQuery(undefined);
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
                            <TextCard first="Создан: ">{item.createdAt && formatDateDistanceToNow(item.createdAt)}</TextCard>
                        </div>
                        <div className="w-[350px] mt-5">
                            <Button>Выбрать</Button>
                        </div>
                    </div>
                )
            })}
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


    const [choiseCard, setChoiseCard] = useState<string | undefined>(undefined);

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

            {choiseCard === undefined ? allAgentApplication && allAgentApplication.map(item => {
                return (
                    <div key={item._id} className="border-1 rounded-15xl border-borderGray py-3 px-6 ">
                        <div className="flex flex-col gap-3">
                            <TextCard first="Пункт отправления: ">{item.pointOfDeparture}</TextCard>
                            <TextCard first="Пункт прибытия: ">{item.pointOfArrival}</TextCard>
                            <TextCard first="Тип контейнера: ">{item.containerType}</TextCard>
                            <TextCard first="Характеристика Груза: ">{item.characteristicsOfTheCargo}</TextCard>
                            <TextCard first="Телефон: ">{item.phoneNumber}</TextCard>
                            <TextCard first="Количество откликов: ">{item.countResponses}</TextCard>
                            <TextCard first="Создан: ">{item.createdAt && formatDateDistanceToNow(item.createdAt)}</TextCard>
                        </div>
                        <div className="mt-5">
                            <Button onClick={() => setChoiseCard(item._id)} color="gray56">Просмотреть</Button>
                        </div>
                        <div className="mt-5">
                            <Button onClick={() => onOpenModalConfirm(item)}>Откликнуться</Button>
                        </div>
                    </div>
                )
            })
                :
                <div>
                    <Button onClick={() => setChoiseCard(undefined)}>Вернуться назад</Button>
                    <MainAgentCardById id={choiseCard} />
                </div>
            }
        </div>
    );
};

type MainAgentCardByIdProps = {
    id: string;
}

export const MainAgentCardById = ({ id }: MainAgentCardByIdProps) => {
    const { data: cardId } = useRespondStartUpAgentByIdQuery(id)

    const { isOpen: isOpenCancel, modalChoise: modalChoseCancel, onCloseModal: onCloseCancel, onOpenModal: onOpenModalCancel } = useModal<IRespond>();

    const [cancelRequest] = useRespondApproveStatusClientCancelMutation()

    const cancelSend = () => {
        if(modalChoseCancel)
        cancelRequest({ applicationId: id, responseId:  (modalChoseCancel.application as any)._id }).unwrap()
            .then((res) => {
                toast.success(`Вы подтвердили отклик`, {
                    position: 'bottom-right'
                });
                onCloseCancel()
            }).catch(() => {
                toast.error(`При оставлении отклика что-то пошло не так`, {
                    position: 'bottom-right'
                });
                onCloseCancel()
            })
    }

    return (
        <>

            <ModalComponent title={`Отказаться от выполнения к заявке ${id}`} isOpen={isOpenCancel} closeModal={onCloseCancel}>
                <div className="flex w-full mt-5 items-center gap-5 justify-center">
                    <Button color="gray56" onClick={onCloseCancel}>Отменить</Button>
                    <Button onClick={cancelSend}>Подтвердить</Button>
                </div>
            </ModalComponent>
            <div className="bg-bgGray border-1 mt-5 px-5 py-4 border-borderGray rounded-15xl">
                Заявка {id}
            </div>
            <div className="flex flex-col gap-5 mt-10">
                {cardId && cardId.length > 0 ? cardId.map(item => {
                    return (
                        <div key={item._id} className="flex flex-col gap-3 border-1 rounded-15xl border-borderGray py-3 px-6">
                            <div className="text-center text-xl">Отклик</div>
                            <TextCard first="Ответ: ">{(item.application as any).statusRequestForAgent}</TextCard>
                            <TextCard first="Агент: ">{item.fullname}</TextCard>
                            {item.phoneNumber && <TextCard first="Телефон: ">{item.phoneNumber}</TextCard>}
                            <TextCard first="Цена: ">{item.price}</TextCard>
                            <TextCard first="Отклик: ">{item.description}</TextCard>
                            <TextCard first="Оставлен: ">{item.createdAt && formatDateDistanceToNow(item.createdAt)}</TextCard>

                            <div className="mt-4">
                                <Button onClick={() => onOpenModalCancel(item)} color="redSm">Отказаться</Button>
                            </div>
                        </div>

                    )
                })
                    :
                    <div>Нет возможности посмотреть отклики</div>
                }
            </div>
        </>
    );
};