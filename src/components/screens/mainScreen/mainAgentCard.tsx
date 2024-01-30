import { Button } from "@/components/UI/button";
import { TextCard } from "@/components/UI/textCard";
import { FormConstructor } from "@/components/formConstructor/formConstructor";
import { ModalComponent } from "@/components/modal";
import { RespondAgentForm } from "@/forms/respondForm";
import { useModal } from "@/hooks/useModal";
import { useApplicationGetAllAgentQuery, useApplicationGetAllDangerQuery, useApplicationGetAllRespondAgentQuery } from "@/services/calculationService";
import { useRespondApproveStatusAgentClientSuccessMutation, useRespondApproveStatusClientCancelMutation, useRespondNewCreateMutation, useRespondStartUpAgentByIdQuery } from "@/services/requestService";
import { IApplicationDanger } from "@/types/application";
import { IRespond } from "@/types/respond";
import formatDateDistanceToNow from "@/utils/formatDateDistanceToNow";
import { CreateRespondApplicationSchema, ICreateRespondApplication } from "@/utils/yupSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const MainAgentCard = () => {
    const { data: allAgentApplication } = useApplicationGetAllAgentQuery(undefined);
    const { t } = useTranslation('locale')
    return (
        <div className="flex flex-col gap-5 mt-10">
            {allAgentApplication && allAgentApplication.map(item => {
                return (
                    <div key={item._id} className="border-1 rounded-15xl border-borderGray py-3 px-6 ">
                        <div className="flex flex-col gap-3">
                            <TextCard first={t('main_page.agent_card.pointOfDeparture')}>{item.pointOfDeparture}</TextCard>
                            <TextCard first={t('main_page.agent_card.pointOfArrival')}>{item.pointOfArrival}</TextCard>
                            <TextCard first={t('main_page.agent_card.containerType')}>{item.containerType}</TextCard>
                            <TextCard first={t('main_page.agent_card.characteristicsOfTheCargo')}>{item.characteristicsOfTheCargo}</TextCard>
                            <TextCard first={t('main_page.agent_card.phoneNumber')}>{item.phoneNumber}</TextCard>
                            <TextCard first={t('main_page.agent_card.countResponses')}>{item.countResponses}</TextCard>
                            <TextCard first={t('main_page.agent_card.createdAt')}>{item.createdAt && formatDateDistanceToNow(item.createdAt)}</TextCard>
                        </div>
                        <div className="mt-5">
                            <Button>{t('main_page.agent_btn.getAllApp_btn_chose')}</Button>
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

    const { t } = useTranslation('locale')

    const { isOpen: isOpenConfirm, modalChoise: onChoiseConfirm, onCloseModal: onCloseConfirm, onOpenModal: onOpenModalConfirm } = useModal<IApplicationDanger>();

    const { register, handleSubmit, formState: { errors } } = useForm<ICreateRespondApplication>({
        resolver: yupResolver(CreateRespondApplicationSchema)
    });

    const sendForm: SubmitHandler<ICreateRespondApplication> = (data) => {
        if (onChoiseConfirm)
            createRequest({ data: data, id: onChoiseConfirm?._id }).unwrap()
                .then((res) => {
                    toast.success(t('main_page.agent_request.confirm_request_success'), {
                        position: 'bottom-right'
                    });
                    onCloseConfirm()
                }).catch(() => {
                    toast.error(t('main_page.agent_request.confirm_request_error'), {
                        position: 'bottom-right'
                    });
                    onCloseConfirm()
                })
    }


    const [choiseCard, setChoiseCard] = useState<string | undefined>(undefined);

    return (
        <div className="flex flex-col gap-5 mt-10">
            <ModalComponent title={`${t('main_page.agent_card.request_respond')} ${onChoiseConfirm?._id}`} isOpen={isOpenConfirm} closeModal={onCloseConfirm}>
                {onChoiseConfirm &&
                    <FormConstructor
                        containerClassName="mt-7 lg:w-1/2"
                        formClassName="grid grid-cols-1 gap-2.5"
                        sendForm={handleSubmit(data => sendForm(data))}
                        register={register} fieldList={RespondAgentForm}
                        errors={errors}
                    >
                        <div className="flex w-full mt-5 items-center gap-5 justify-center">
                            <Button color="gray56" onClick={onCloseConfirm}>{t('main_page.agent_btn.request_cancel')}</Button>
                            <Button submit>{t('main_page.agent_btn.request_confirm')}</Button>
                        </div>
                    </FormConstructor>
                }
            </ModalComponent>

            {choiseCard === undefined ? allAgentApplication && allAgentApplication.map(item => {
                return (
                    <div key={item._id} className="border-1 rounded-15xl border-borderGray py-3 px-6 ">
                        <div className="flex flex-col gap-3">
                            <TextCard first={t('main_page.agent_card.pointOfDeparture')}>{item.pointOfDeparture}</TextCard>
                            <TextCard first={t('main_page.agent_card.pointOfArrival')}>{item.pointOfArrival}</TextCard>
                            <TextCard first={t('main_page.agent_card.containerType')}>{item.containerType}</TextCard>
                            <TextCard first={t('main_page.agent_card.characteristicsOfTheCargo')}>{item.characteristicsOfTheCargo}</TextCard>
                            <TextCard first={t('main_page.agent_card.phoneNumber')}>{item.phoneNumber}</TextCard>
                            <TextCard first={t('main_page.agent_card.countResponses')}>{item.countResponses}</TextCard>
                            <TextCard first={t('main_page.agent_card.createdAt')}>{item.createdAt && formatDateDistanceToNow(item.createdAt)}</TextCard>
                        </div>
                        <div className="mt-5">
                            <Button onClick={() => setChoiseCard(item._id)} color="gray56">{t('main_page.agent_btn.request_vision')}</Button>
                        </div>
                        <div className="mt-5">
                            <Button onClick={() => onOpenModalConfirm(item)}>{t('main_page.agent_btn.request_confirm')}</Button>
                        </div>
                    </div>
                )
            })
                :
                <div>
                    <Button onClick={() => setChoiseCard(undefined)}>{t('main_page.agent_btn.come_back')}</Button>
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

    const { t } = useTranslation('locale')

    const { isOpen: isOpenCancel, modalChoise: modalChoseCancel, onCloseModal: onCloseCancel, onOpenModal: onOpenModalCancel } = useModal<IRespond>();

    const { isOpen, onCloseModal, modalChoise, onOpenModal } = useModal<IRespond>();

    const [cancelRequest] = useRespondApproveStatusClientCancelMutation()

    const [confirmRequest] = useRespondApproveStatusAgentClientSuccessMutation()

    const cancelSend = () => {
        if (modalChoseCancel)
            cancelRequest({ applicationId: id, responseId: (modalChoseCancel.application as any)._id }).unwrap()
                .then((res) => {
                    toast.success(t('main_page.agent_request.confirm_success_request_respond'), {
                        position: 'bottom-right'
                    });
                    onCloseCancel()
                }).catch(() => {
                    toast.error(t('main_page.agent_request.confirm_error_request_respond'), {
                        position: 'bottom-right'
                    });
                    onCloseCancel()
                })
    }

    const confirmSend = () => {
        if (modalChoise)
            confirmRequest({ applicationId: id, responseId: modalChoise._id }).unwrap()
                .then((res) => {
                    toast.success(t('main_page.agent_request.confirm_success_request_respond'), {
                        position: 'bottom-right'
                    });
                    onCloseModal()
                }).catch(() => {
                    toast.error(t('main_page.agent_request.confirm_error_request_respond'), {
                        position: 'bottom-right'
                    });
                    onCloseModal()
                })
    }

    return (
        <>
            <ModalComponent title={`Согласие на выполнение заказа ${id}`} isOpen={isOpen} closeModal={onCloseModal}>
                <div className="flex w-full mt-5 items-center gap-5 justify-center">
                    <Button color="gray56" onClick={onCloseModal}>{t('main_page.agent_btn.cancel_btn_cancel')}</Button>
                    <Button onClick={confirmSend}>{t('main_page.agent_btn.cancel_btn_confirm')}</Button>
                </div>
            </ModalComponent>

            <ModalComponent title={`${t('main_page.agent_card.cancel_request_respond')} ${id}`} isOpen={isOpenCancel} closeModal={onCloseCancel}>
                <div className="flex w-full mt-5 items-center gap-5 justify-center">
                    <Button color="gray56" onClick={onCloseCancel}>{t('main_page.agent_btn.cancel_btn_cancel')}</Button>
                    <Button onClick={cancelSend}>{t('main_page.agent_btn.cancel_btn_confirm')}</Button>
                </div>
            </ModalComponent>
            <div className="bg-bgGray border-1 mt-5 px-5 py-4 border-borderGray rounded-15xl">
                {t('main_page.agent_card.request_respond_id')} {id}
            </div>
            <div className="flex flex-col gap-5 mt-10">
                {cardId && cardId.length > 0 ? cardId.map(item => {
                    return (
                        <div key={item._id} className="flex flex-col gap-3 border-1 rounded-15xl border-borderGray py-3 px-6">
                            <div className="text-center text-xl">{t('main_page.agent_card.request_respond_respond')}</div>
                            <TextCard first={t('main_page.agent_card.respond_answer')}>{(item.application as any).statusRequestForAgent}</TextCard>
                            <TextCard first={t('main_page.agent_card.respond_agent')}>{item.fullname}</TextCard>
                            {item.phoneNumber && <TextCard first={t('main_page.agent_card.respond_phonenumber')}>{item.phoneNumber}</TextCard>}
                            <TextCard first={t('main_page.agent_card.respond_respond_price')}>{item.price}</TextCard>
                            <TextCard first={t('main_page.agent_card.respond_respond_agent')}>{item.description}</TextCard>
                            <TextCard first={t('main_page.agent_card.respond_respond_created')}>{item.createdAt && formatDateDistanceToNow(item.createdAt)}</TextCard>

                            {item.startUpStatus === true &&
                                <div className="mt-3">
                                    <Button onClick={() => onOpenModal(item)} color="greenSm">Готов к сотрудничеству</Button>
                                </div>
                            }

                            <div className="mt-4">
                                <Button onClick={() => onOpenModalCancel(item)} color="redSm">{t('main_page.agent_btn.cancel_respond_agent')}</Button>
                            </div>
                        </div>

                    )
                })
                    :
                    <div>{t('main_page.agent_card.respond_not_found')}</div>
                }
            </div>
        </>
    );
};

// all request respond agent

export const MainCardAgentRespond = () => {
    const { data: cardsRespond } = useApplicationGetAllRespondAgentQuery(undefined, {
        refetchOnReconnect: true,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    const { t } = useTranslation('locale')

    const [choiseCard, setChoiseCard] = useState<string | undefined>(undefined);

    return (
        <div className="flex flex-col gap-5 mt-10">
            {choiseCard === undefined ? cardsRespond && cardsRespond.map(item => {
                return (
                    <div key={item._id} className="border-1 rounded-15xl border-borderGray py-3 px-6 ">
                        <div className="flex flex-col gap-3">
                            <div className="bg-bgGray border-1 mt-5 px-5 py-4 border-borderGray rounded-15xl">
                                {t('main_page.agent_card.request_respond_id')} {item.application._id}
                            </div>
                            <TextCard first={t('main_page.agent_card.pointOfDeparture')}>{item.application.pointOfDeparture}</TextCard>
                            <TextCard first={t('main_page.agent_card.pointOfArrival')}>{item.application.pointOfArrival}</TextCard>
                            <TextCard first={t('main_page.agent_card.containerType')}>{item.application.containerType}</TextCard>
                            <TextCard first={t('main_page.agent_card.createdAt')}>{item.createdAt && formatDateDistanceToNow(item.application.createdAt)}</TextCard>
                        </div>
                        <div className="mt-5">
                            <Button onClick={() => setChoiseCard(item.application._id)}>{t('main_page.agent_btn.getAllApp_btn_chose')}</Button>
                        </div>
                    </div>
                )
            })
                :
                <div>
                    <Button onClick={() => setChoiseCard(undefined)}>{t('main_page.agent_btn.come_back')}</Button>
                    <MainAgentCardById id={choiseCard} />
                </div>
            }
        </div>
    );
};