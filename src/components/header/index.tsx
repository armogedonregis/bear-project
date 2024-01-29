import Link from "next/link";
import Logo from "/public/assets/vector/logo.svg";
import { selectGetMe, useUserGetQuery } from "@/services/authService";
import { Button } from "../UI/button";
import { Loader } from "../loader";
import { useAppSelector } from "@/store/hooks";

export const Header = () => {

    const { data: profile, isLoading } = useAppSelector((state) => selectGetMe(state))

    return (
        <header className="flex justify-between items-center">
            <Link href="/main">
                <Logo />
            </Link>
            <div>
                {isLoading ?
                <Loader /> : profile ? 
                        <div className="">
                            <Button href={profile.roles.find(x => x === 'ADMIN') ? "/dashboard" : profile.roles.find(x => x === 'AGENT') ? "/profile" : "/profile"}>
                                {profile.fullname}
                            </Button>
                            <div className="mt-1">
                                <Button color="gray">
                                    Статус: {profile.roles.find(x => x === 'ADMIN') ? "Админ" : profile.roles.find(x => x === 'AGENT') ? "Агент" : "Клиент"}
                                </Button>
                            </div>
                        </div>
                        :
                        <Button href="/login">Регистрация/Вход</Button>
                }
            </div>
        </header>
    );
}