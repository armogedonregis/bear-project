import Link from "next/link";
import Logo from "/public/assets/vector/logo.svg";
import { selectGetMe } from "@/services/authService";
import { Button } from "../UI/button";
import { Loader } from "../loader";
import { useAppSelector } from "@/store/hooks";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

export const Header = () => {

    const { data: profile, isLoading } = useAppSelector((state) => selectGetMe(state))

    const { t } = useTranslation('locale');

    const router = useRouter()

    return (
        <header className="flex justify-between items-center">
            <Link href="/main">
                <Logo />
            </Link>
            <div>
                <div className="space-x-4">
                    <Link className="text-blue-500 hover:underline" href={router.asPath} locale={'ru'}>
                        Русский
                    </Link>
                    <Link className="text-blue-500 hover:underline" href={router.asPath} locale={'en'}>
                        English
                    </Link>
                    <Link className="text-blue-500 hover:underline" href={router.asPath} locale={'ch'}>
                        中文
                    </Link>
                </div>
            </div>
            <div>
                {isLoading ?
                    <Loader /> : profile ?
                        <div className="">
                            <Button href={profile.roles.find(x => x === 'ADMIN') ? "/dashboard" : profile.roles.find(x => x === 'AGENT') ? "/profile" : "/profile"}>
                                {profile.fullname}
                            </Button>
                            <div className="mt-1">
                                <Button color="gray">
                                    {t('header.status')} {profile.roles.find(x => x === 'ADMIN') ? t('header.admin') : profile.roles.find(x => x === 'AGENT') ? t('header.agent') : t('header.client')}
                                </Button>
                            </div>
                        </div>
                        :
                        <Button href="/login">{t('header.btn_reg')}</Button>
                }
            </div>
        </header>
    );
}


{/* <div>
                {isLoading ?
                    <Loader /> : profile ?
                        <div className="">
                            <Button href={profile.roles.find(x => x === 'ADMIN') ? "/dashboard" : profile.roles.find(x => x === 'AGENT') ? "/profile" : "/profile"}>
                                {profile.fullname}
                            </Button>
                            <div className="mt-1">
                                <Button color="gray">
                                    {t('header.status')} {profile.roles.find(x => x === 'ADMIN') ? t('header.admin') : profile.roles.find(x => x === 'AGENT') ? t('header.agent') : t('header.client')}
                                </Button>
                            </div>
                        </div>
                        :
                        <Button href="/login">{t('header.btn_reg')}</Button>
                }
            </div> */}