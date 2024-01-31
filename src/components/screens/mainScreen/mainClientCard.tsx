import { Button } from "@/components/UI/button";
import { TextCard } from "@/components/UI/textCard";
import { ModalComponent } from "@/components/modal";
import { useModal } from "@/hooks/useModal";
import { useApplicationGetAllClientQuery } from "@/services/calculationService";
import { useRespondApproveStatusClientCancelMutation, useRespondApproveStatusClientMutation, useRespondApproveStatusClientStepTwoMutation, useRespondClientByApplicationIdQuery, useRespondClientByResponseIdQuery } from "@/services/requestService";
import { IRespond } from "@/types/respond";
import formatDateDistanceToNow from "@/utils/formatDateDistanceToNow";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { toast } from "react-toastify";

export const MainClientCard = () => {

    const { t } = useTranslation('locale');

    const { data: allClientApplication } = useApplicationGetAllClientQuery(undefined);
    const [choiseReq, setChoiseReq] = useState<string | undefined>(undefined);
    const [agent, setAgent] = useState<IRespond | undefined>();

    const choiseAgent = (item: IRespond) => {
        setAgent(item)
    };
    return (
        <>
            <div className="bg-bgGray border-1 px-5 py-4 border-borderGray rounded-15xl">
                {t('main_page.client.my_request')}
            </div>
            <div className="flex flex-col gap-5 mt-10">
                {choiseReq === undefined && agent === undefined ?
                    allClientApplication && allClientApplication.map(item => {
                        return (
                            <div key={item._id} className="border-1 rounded-15xl border-borderGray py-3 px-6 ">
                                <div className="flex flex-col gap-3">
                                    <TextCard first={t('main_page.client.card_app.pointOfDeparture')}>{item.pointOfDeparture}</TextCard>
                                    <TextCard first={t('main_page.client.card_app.pointOfArrival')}>{item.pointOfArrival}</TextCard>
                                    <TextCard first={t('main_page.client.card_app.containerType')}>{item.containerType}</TextCard>
                                    <TextCard first={t('main_page.client.card_app.characteristicsOfTheCargo')}>{item.characteristicsOfTheCargo}</TextCard>
                                    <TextCard first={t('main_page.client.card_app.phoneNumber')}>{item.phoneNumber}</TextCard>
                                    <TextCard first={t('main_page.client.card_app.countResponses')}>{item.countResponses}</TextCard>
                                    <TextCard first={t('main_page.client.card_app.createdAt')}>{item.createdAt && formatDateDistanceToNow(item.createdAt)}</TextCard>
                                </div>
                                <div className="w-[350px] mt-5">
                                    <Button onClick={() => setChoiseReq(item._id)}>{t('main_page.client.card_app.btn_choise')}</Button>
                                </div>
                            </div>
                        )
                    })
                    :
                    choiseReq && agent === undefined ?
                        <div>
                            <Button onClick={() => setChoiseReq(undefined)}>{t('main_page.client.btn_back')}</Button>
                            <MainClientIdCard choiseAgent={choiseAgent} id={choiseReq} />
                        </div>

                        :

                        <div>
                            <Button onClick={() => setAgent(undefined)}>{t('main_page.client.btn_back_request')}</Button>
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

    const { t } = useTranslation('locale');

    const { data: cardClient } = useRespondClientByApplicationIdQuery(id)
    return (
        <>
            <div className="bg-bgGray border-1 mt-5 px-5 py-4 border-borderGray rounded-15xl">
                {t('main_page.client.request_num')} {id}
            </div>
            <div className="flex flex-col gap-5 mt-10">
                {cardClient && cardClient.length > 0 ? cardClient.map(item => {
                    return (
                        <div key={item._id} className="flex flex-col gap-3 border-1 rounded-15xl border-borderGray py-3 px-6">
                            <div className="text-center text-xl">{t('main_page.client.card_agent.title')}</div>
                            <TextCard first={t('main_page.client.card_agent.fullname')}>{item.fullname}</TextCard>
                            <TextCard first={t('main_page.client.card_agent.phoneNumber')}>{item.phoneNumber}</TextCard>
                            <TextCard first={t('main_page.client.card_agent.price')}>{item.price}</TextCard>
                            <TextCard first={t('main_page.client.card_agent.description')}>{item.description}</TextCard>
                            <TextCard first={t('main_page.client.card_agent.createdAt')}>{item.createdAt && formatDateDistanceToNow(item.createdAt)}</TextCard>

                            <div className="mt-10">
                                <Button onClick={() => choiseAgent(item)}>{t('main_page.client.card_agent.choise_agent')}</Button>
                            </div>
                        </div>

                    )
                })
                    :
                    <div>{t('main_page.client.card_agent.not_req')}</div>
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

    const { t } = useTranslation('locale');

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
                toast.success(t('main_page.client.modal.success_confirm_req'), {
                    position: 'bottom-right'
                });
                onCloseConfirm()
            }).catch(() => {
                toast.error(t('main_page.client.modal.error_confirm_req'), {
                    position: 'bottom-right'
                });
                onCloseConfirm()
            })
    }

    const confirmTwoSend = () => {
        confirmStepTwo({ applicationId: appId, responseId: respId }).unwrap()
            .then((res) => {
                toast.success(t('main_page.client.modal.success_two_confirm_req'), {
                    position: 'bottom-right'
                });
                onCloseModal()
            }).catch(() => {
                toast.error(t('main_page.client.modal.error_two_confirm_req'), {
                    position: 'bottom-right'
                });
                onCloseModal()
            })
    }

    const cancelSend = () => {
        cancelRequest({ applicationId: appId, responseId: respId }).unwrap()
            .then((res) => {
                toast.success(t('main_page.client.modal.sucess_cancel_req'), {
                    position: 'bottom-right'
                });
                onCloseModal()
            }).catch(() => {
                toast.error(t('main_page.client.modal.error_cancel_req'), {
                    position: 'bottom-right'
                });
                onCloseModal()
            })
    }


    return (
        <>

            <ModalComponent title={`${t('main_page.client.cancel_title')} ${agent?.fullname}`} isOpen={isOpenCancel} closeModal={onCloseModalCancel}>
                <div className="flex w-full mt-5 items-center gap-5 justify-center">
                    <Button color="gray56" onClick={onCloseModalCancel}>{t('main_page.client.btn_cancel')}</Button>
                    <Button onClick={cancelSend}>{t('main_page.client.btn_confirm')}</Button>
                </div>
            </ModalComponent>

            <ModalComponent title={`${t('main_page.client.confirm_title')} ${agent?.fullname}`} isOpen={isOpen} closeModal={onCloseModal}>
                <div className="flex w-full mt-5 items-center gap-5 justify-center">
                    <Button color="gray56" onClick={onCloseModal}>{t('main_page.client.btn_cancel')}</Button>
                    <Button onClick={confirmTwoSend}>{t('main_page.client.btn_confirm')}</Button>
                </div>
            </ModalComponent>

            <ModalComponent title={`${t('main_page.client.confirm_two_title')} ${agent?.fullname}`} isOpen={isOpenConfirm} closeModal={onCloseConfirm}>
                <div className="flex w-full mt-5 items-center gap-5 justify-center">
                    <Button color="gray56" onClick={onCloseConfirm}>{t('main_page.client.btn_cancel')}</Button>
                    <Button onClick={confirmSend}>{t('main_page.client.btn_confirm')}</Button>
                </div>
            </ModalComponent>

            <div className="bg-bgGray border-1 mt-5 px-5 py-4 border-borderGray rounded-15xl">
                {t('main_page.client.agent')} {agent?.fullname}
            </div>
            <div className="flex flex-col gap-5 mt-10">

                {agent && <div className="flex flex-col gap-3 border-1 rounded-15xl border-borderGray py-3 px-6">
                    <div className="text-center text-xl">{t('main_page.client.request')}</div>
                    <TextCard first={t('main_page.client.phoneNumber')}>{agent?.phoneNumber}</TextCard>
                    <TextCard first={t('main_page.client.price')}>{agent?.price}</TextCard>
                    <TextCard first={t('main_page.client.description')}>{agent?.description}</TextCard>
                    <div className="mt-10">
                        {agent.startUpStatus === false ?
                            <div className="w-[400px] mb-3">
                                <Button onClick={onOpenModalConfirm} color="greenSm">{t('main_page.client.btn_step_confirm')}</Button>
                            </div>
                            :
                            <div className="w-[400px] mb-3">
                                <Button onClick={onOpenModal} color="greenSm">{t('main_page.client.btn_final_confirm')}</Button>
                            </div>
                        }
                        <div className="w-[250px]">
                            <Button onClick={onOpenModalCancel} color="redSm">{t('main_page.client.btn_cancel_confirm')}</Button>
                        </div>
                    </div>
                </div>}
            </div>
        </>
    );
};