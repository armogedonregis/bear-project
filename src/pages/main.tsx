import { Button } from "@/components/UI/button";
import { MainAgentCard, MainAgentDangerCard } from "@/components/screens/mainScreen/mainAgentCard";
import { MainClientCard } from "@/components/screens/mainScreen/mainClientCard";
import { selectGetMe } from "@/services/authService";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCredentialsNull } from "@/store/slice/authSlice";
import { authLogout, isAuth } from "@/utils/isAuth";
import { NextPageContext } from "next";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { toast } from "react-toastify";

const Main = () => {
    const { t } = useTranslation('locale')
    const dispatch = useAppDispatch()

    const user = useAppSelector((state) => selectGetMe(state))

    const handleLogout = () => {
        window.localStorage.setItem('token', '')
        toast.success('Вы вышли из профиля', {
            position: 'bottom-center'
        });
        dispatch(setCredentialsNull())
        authLogout()
    }

    const role = (user && user?.data?.typeUser !== 'Agent')

    const [changePage, setChangePage] = useState<number>(0);

    return (
        <section className="mt-6 lg:mt-20">
            <div className="flex lg:flex-row flex-col gap-5 lg:gap-12">
                <div className="flex flex-col gap-5 lg:w-[300px] lg:h-[600px]">
                    {role ?
                        <>
                        <Button href="/">Создать новую заявку</Button>
                        <Button active={changePage === 0} onClick={() => setChangePage(0)}>Мои заявки</Button>
                        </>
                        :
                        <>
                            <Button active={changePage === 0} onClick={() => setChangePage(0)}>Все новые заявки</Button>
                            <Button active={changePage === 1} onClick={() => setChangePage(1)}>Заявки в работе</Button>
                        </>
                    }
                    <Button href="/settings/change-password">Настройки</Button>
                    <div className="lg:mt-auto">
                        <Button onClick={handleLogout} color="red">Выход</Button>
                    </div>
                </div>
                <div className="lg:w-1/2">
                    {user.isLoading ?
                        null :
                        role ?
                        <>
                            {changePage === 0 && <MainClientCard />}
                            {changePage === 1 && <MainClientCard />}
                        </>
                            :
                            <>
                            {changePage === 0 && <MainAgentDangerCard />}
                            {changePage === 1 && <MainAgentCard />}
                            </>
                    }
                </div>
            </div>
        </section>
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

        },
    }
};