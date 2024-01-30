import { Button } from "@/components/UI/button";
import { TextCard } from "@/components/UI/textCard";
import { ModalComponent } from "@/components/modal";
import { useModal } from "@/hooks/useModal";
import { useApplicationGetAllClientQuery } from "@/services/calculationService";
import { useRespondApproveStatusClientCancelMutation, useRespondApproveStatusClientMutation, useRespondApproveStatusClientStepTwoMutation, useRespondClientByApplicationIdQuery, useRespondClientByResponseIdQuery } from "@/services/requestService";
import { IRespond } from "@/types/respond";
import formatDateDistanceToNow from "@/utils/formatDateDistanceToNow";
import { useState } from "react";
import { toast } from "react-toastify";

export const MainClientCard = () => {
    const { data: allClientApplication } = useApplicationGetAllClientQuery(undefined);
    const [choiseReq, setChoiseReq] = useState<string | undefined>(undefined);
    const [agent, setAgent] = useState<IRespond | undefined>();

    const choiseAgent = (item: IRespond) => {
        setAgent(item)
    };
    return (
        <>
            <div className="bg-bgGray border-1 px-5 py-4 border-borderGray rounded-15xl">
                Мои заявки
            </div>
            <div className="flex flex-col gap-5 mt-10">
                {choiseReq === undefined && agent === undefined ?
                    allClientApplication && allClientApplication.map(item => {
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
                                    <Button onClick={() => setChoiseReq(item._id)}>Выбрать</Button>
                                </div>
                            </div>
                        )
                    })
                    :
                    choiseReq && agent === undefined ?
                        <div>
                            <Button onClick={() => setChoiseReq(undefined)}>Вернуться назад</Button>
                            <MainClientIdCard choiseAgent={choiseAgent} id={choiseReq} />
                        </div>

                        :

                        <div>
                            <Button onClick={() => setAgent(undefined)}>Вернуться в заявку</Button>
                            {agent && <MainClientIdAgentCard appId={agent.application} respId={agent._id} />}
                        </div>

                }
            </div>
        </>
    );
};


type CardIdProps = {
    id: string;
    choiseAgent: (e: IRespond) => void;
}

export const MainClientIdCard = ({ id, choiseAgent }: CardIdProps) => {
    const { data: cardClient } = useRespondClientByApplicationIdQuery(id)
    return (
        <>
            <div className="bg-bgGray border-1 mt-5 px-5 py-4 border-borderGray rounded-15xl">
                Заявка {id}
            </div>
            <div className="flex flex-col gap-5 mt-10">
                {cardClient && cardClient.length > 0 ? cardClient.map(item => {
                    return (
                        <div key={item._id} className="flex flex-col gap-3 border-1 rounded-15xl border-borderGray py-3 px-6">
                            <div className="text-center text-xl">Отклик</div>
                            <TextCard first="Агент: ">{item.fullname}</TextCard>
                            <TextCard first="Телефон: ">{item.phoneNumber}</TextCard>
                            <TextCard first="Цена: ">{item.price}</TextCard>
                            <TextCard first="Отклик: ">{item.description}</TextCard>
                            <TextCard first="Оставлен: ">{item.createdAt && formatDateDistanceToNow(item.createdAt)}</TextCard>

                            <div className="mt-10">
                                <Button onClick={() => choiseAgent(item)}>Выбрать агента</Button>
                            </div>
                        </div>

                    )
                })
                    :
                    <div>Откликов нет</div>
                }
            </div>
        </>
    );
};

type MainClientIdAgentCardProps = {
    respId: string;
    appId: string;
}

export const MainClientIdAgentCard = ({ respId, appId }: MainClientIdAgentCardProps) => {
    const { data: agent } = useRespondClientByResponseIdQuery({ responseId: respId, applicationId: appId })

    const { isOpen: isOpenConfirm, onCloseModal: onCloseConfirm, onOpenModal: onOpenModalConfirm } = useModal();
    const { isOpen, onCloseModal, onOpenModal } = useModal();

    const { isOpen: isOpenCancel, onCloseModal: onCloseModalCancel, onOpenModal: onOpenModalCancel } = useModal();


    const [confirmAgent] = useRespondApproveStatusClientMutation()

    const [confirmStepTwo] = useRespondApproveStatusClientStepTwoMutation()

    const [cancelRequest] = useRespondApproveStatusClientCancelMutation()

    const confirmSend = () => {
        confirmAgent({ applicationId: appId, responseId: respId }).unwrap()
            .then((res) => {
                toast.success(`Вы подтвердили отклик`, {
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

    const confirmTwoSend = () => {
        confirmStepTwo({ applicationId: appId, responseId: respId }).unwrap()
            .then((res) => {
                toast.success(`Вы подтвердили отклик`, {
                    position: 'bottom-right'
                });
                onCloseModal()
            }).catch(() => {
                toast.error(`При оставлении отклика что-то пошло не так`, {
                    position: 'bottom-right'
                });
                onCloseModal()
            })
    }

    const cancelSend = () => {
        cancelRequest({ applicationId: appId, responseId: respId }).unwrap()
            .then((res) => {
                toast.success(`Вы отменили отклик`, {
                    position: 'bottom-right'
                });
                onCloseModal()
            }).catch(() => {
                toast.error(`При отмене отклика что-то пошло не так`, {
                    position: 'bottom-right'
                });
                onCloseModal()
            })
    }


    return (
        <>

            <ModalComponent title={`Отменить работу с агентом ${agent?.fullname}`} isOpen={isOpenCancel} closeModal={onCloseModalCancel}>
                <div className="flex w-full mt-5 items-center gap-5 justify-center">
                    <Button color="gray56" onClick={onCloseModalCancel}>Отменить</Button>
                    <Button onClick={cancelSend}>Подтвердить</Button>
                </div>
            </ModalComponent>

            <ModalComponent title={`Подтвердить агента к работе ${agent?.fullname}`} isOpen={isOpen} closeModal={onCloseModal}>
                <div className="flex w-full mt-5 items-center gap-5 justify-center">
                    <Button color="gray56" onClick={onCloseModal}>Отменить</Button>
                    <Button onClick={confirmTwoSend}>Подтвердить</Button>
                </div>
            </ModalComponent>

            <ModalComponent title={`Подтвердить агента ${agent?.fullname} к выполнение`} isOpen={isOpenConfirm} closeModal={onCloseConfirm}>
                <div className="flex w-full mt-5 items-center gap-5 justify-center">
                    <Button color="gray56" onClick={onCloseConfirm}>Отменить</Button>
                    <Button onClick={confirmSend}>Подтвердить</Button>
                </div>
            </ModalComponent>

            <div className="bg-bgGray border-1 mt-5 px-5 py-4 border-borderGray rounded-15xl">
                Агент {agent?.fullname}
            </div>
            <div className="flex flex-col gap-5 mt-10">

                {agent && <div className="flex flex-col gap-3 border-1 rounded-15xl border-borderGray py-3 px-6">
                    <div className="text-center text-xl">Отклик</div>
                    <TextCard first="Телефон: ">{agent?.phoneNumber}</TextCard>
                    <TextCard first="Цена: ">{agent?.price}</TextCard>
                    <TextCard first="Отклик: ">{agent?.description}</TextCard>
                    <div className="mt-10">
                        {agent.startUpStatus === false ?
                            <div className="w-[400px] mb-3">
                                <Button onClick={onOpenModalConfirm} color="greenSm">Подтвердить агента к работе</Button>
                            </div>
                            :
                            <div className="w-[400px] mb-3">
                                <Button onClick={onOpenModal} color="greenSm">Подтвердить агента ко второму этапу</Button>
                            </div>
                        }
                        <div className="w-[250px]">
                            <Button onClick={onOpenModalCancel} color="redSm">Отменить</Button>
                        </div>
                    </div>
                </div>}
            </div>
        </>
    );
};