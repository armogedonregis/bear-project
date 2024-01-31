import { Button } from "@/components/UI/button";
import { MainAgentCard, MainAgentDangerCard, MainCardAgentRespond } from "@/components/screens/mainScreen/mainAgentCard";
import { MainClientCard } from "@/components/screens/mainScreen/mainClientCard";
import { useUserGetQuery } from "@/services/authService";
import { bearplusApi } from "@/services/bearplusApi";
import { useAppDispatch } from "@/store/hooks";
import { setCredentialsNull } from "@/store/slice/authSlice";
import { authLogout, isAuth } from "@/utils/isAuth";
import { NextPageContext } from "next";
import { useState } from "react";
import { useTranslation } from 'next-i18next';
import { toast } from "react-toastify";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import HeadLayout from "@/layout/headLayout";
import { useModal } from "@/hooks/useModal";
import { ModalComponent } from "@/components/modal";


const Main = () => {
    const { t } = useTranslation('locale')
    const dispatch = useAppDispatch()

    const { data: user, isLoading } = useUserGetQuery(undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true
    })

    const { isOpen: isOpenLogout, onCloseModal: onCloseLogout, onOpenModal: onOpenLogout } = useModal();

    const handleLogout = () => {
        window.localStorage.setItem('token', '')
        toast.success(t('main_page.modal_logout'), {
            position: 'bottom-center'
        });
        dispatch(setCredentialsNull())
        dispatch(bearplusApi.util.resetApiState())
        authLogout()
    }

    const role = user?.typeUser !== 'Agent';

    const [changePage, setChangePage] = useState<number>(0);

    return (
        <HeadLayout title={t('metategs.main_page.title')} description={t('metategs.main_page.description')} keywords={t('metategs.main_page.keywords')}>

            <ModalComponent title={t('logout_modal.title')} isOpen={isOpenLogout} closeModal={onCloseLogout}>
                <div className="flex w-full mt-5 items-center gap-5 justify-center">
                    <Button color="gray56" onClick={onCloseLogout}>{t('logout_modal.btn_cancel')}</Button>
                    <Button onClick={handleLogout}>{t('logout_modal.btn_confirm')}</Button>
                </div>
            </ModalComponent>

            <section className="mt-6 lg:mt-20">
                <div className="flex lg:flex-row flex-col gap-5 lg:gap-12">
                    <div className="flex flex-col gap-5 lg:w-[300px] lg:h-[600px]">
                        {user && role ?
                            <>
                                <Button href="/">{t('main_page.client.create_btn')}</Button>
                                <Button active={changePage === 0} onClick={() => setChangePage(0)}>{t('main_page.client.my_btn')}</Button>
                            </>
                            :
                            <>
                                <Button active={changePage === 0} onClick={() => setChangePage(0)}>{t('main_page.agent.all_request_btn')}</Button>
                                <Button active={changePage === 1} onClick={() => setChangePage(1)}>{t('main_page.agent.request_work')}</Button>
                                <Button active={changePage === 2} onClick={() => setChangePage(2)}>{t('main_page.agent.request_respond_btn')}</Button>
                            </>
                        }
                        <Button href="/settings/change-password">{t('main_page.settings_btn')}</Button>
                        <div className="lg:mt-auto">
                            <Button onClick={onOpenLogout} color="red">{t('main_page.logout')}</Button>
                        </div>
                    </div>
                    <div className="lg:w-1/2">
                        {isLoading ?
                            null :
                            user && role ?
                                <>
                                    {changePage === 0 && <MainClientCard />}
                                    {changePage === 1 && <MainClientCard />}
                                </>
                                :
                                <>
                                    {changePage === 0 && <MainAgentDangerCard />}
                                    {changePage === 1 && <MainAgentCard />}
                                    {changePage === 2 && <MainCardAgentRespond />}
                                </>
                        }
                    </div>
                </div>
            </section>
        </HeadLayout>
    );
}

export default Main;

export const getServerSideProps = async (ctx: NextPageContext) => {

    // Определяем локализацию
    const lang = ctx.locale

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
        props: {
            ...(await serverSideTranslations(lang ?? 'ru', [
                'common',
                'locale'
            ])),
        },
    }
};
