import { Button } from "@/components/UI/button";
import Image from "next/image";

type Props = {
    fullname: string;
    img?: string;
    username: string;
    categories: string[];
    active: boolean;
};

export const SearchedCard = ({ fullname, img, username, categories, active }: Props) => {
    return (
        <div className={`px-6 h-fit ${active ? "w-full justify-between flex-col lg:flex-row" : "lg:w-[224px] flex-col"} rounded-20xl py-5 flex items-center border-1 border-main`}>
            {!active && <h4 className="font-semibold text-base text-black">{fullname}</h4>}
            <div className={`${active ? "flex-col lg:flex-row items-start gap-4 w-full lg:w-8/12" : "flex-col items-center"} flex`}>
                <div className="mt-4 w-full lg:w-[100px] lg:h-[100px]">
                    <Image className="rounded-2xl object-cover w-full h-full" width={100} height={100} src={img ? img : '/assets/images/avatar.png'} alt={fullname} />
                </div>
                <div className={`mt-3.5 ${active ? "lg:w-9/12" : "flex flex-col items-center"}`}>
                    {active && <h4 className="font-semibold text-base text-black">{fullname}</h4>}
                    <div className="text-primary text-base">
                        @{username}
                    </div>
                    <h5 className="font-bold text-graySm text-2xl">
                        Мои теги
                    </h5>
                    <div className="flex flex-wrap gap-1 text-second">
                        {categories.map(item => (
                            <span key={item}>#{item}</span>
                        ))}
                    </div>
                </div>
            </div>
            <div className={`mt-5 ${active ? "w-full max-w-[300px] lg:max-w-[176px] lg:w-[176px]": "w-full max-w-[300px] lg:max-w-full lg:w-full"}`}>
                <Button href={`/profile/${username}`} color="blue">Перейти</Button>
            </div>
        </div>
    );
};