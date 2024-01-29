import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

type BtnColor = 'green' | 'gray' | 'blue' | 'red' | 'gray56' | 'greenSm' | 'redSm';

type ButtonProps = {
    color?: BtnColor;
    href?: Url;
    children: React.ReactNode;
    wfull?: boolean;
    onClick?: () => void;
    target?: boolean;
    rel?: boolean;
    referrerPolicy?: boolean;
    submit?: boolean;
    active?: boolean;
}

export const Button = ({ color = 'green',target = false, rel = false, href, 
children, referrerPolicy = false, onClick, submit, active }: ButtonProps) => {
    const objColor: Record<BtnColor, string> = {
        green: `text-white px-10 text-base rounded-15xl font-normal  bg-primary h-[56px] ${active ? 'opacity-60' : 'active:opacity-70 lg:hover:opacity-70'}`,
        gray: "bg-grayBtn active:opacity-70 lg:hover:opacity-70 h-[27px] text-textBlack px-10 text-base rounded-lg",
        blue: "bg-teal-600 active:opacity-70 lg:hover:opacity-70 h-[30px] text-white px-3 text-xs rounded-15xl",
        red: "text-white px-10 text-base rounded-15xl font-normal active:opacity-70 lg:hover:opacity-70 bg-tertiary h-[56px]",
        gray56: "bg-grayBtn active:opacity-70 lg:hover:opacity-70 h-[56px] text-textBlack px-10 text-base rounded-15xl",
        greenSm: `text-white px-10 text-base rounded-15xl font-normal bg-primary h-[30px] ${active ? 'opacity-60' : 'active:opacity-70 lg:hover:opacity-70'}`,
        redSm: "text-white px-10 text-base rounded-15xl font-normal active:opacity-70 lg:hover:opacity-70 bg-tertiary h-[30px]",
    };

    const primaryClass = [
        'lg:hover:-translate-y-1',
        'duration-150', 'transition-all',
        'w-full',
        objColor[color]
    ];

    const componentPrimaryClass = primaryClass.join(' ')

    if(href) {
        return (
            <Link referrerPolicy={referrerPolicy ? "no-referrer" : undefined} className={componentPrimaryClass + " flex items-center justify-center"} rel={rel ? "nofollow noopener noreferrer" : undefined} target={target ? "_blank" : undefined} href={href}>{children}</Link>
        );
    }
    if(!href) {
        return (
            <button type={submit ? "submit" : "button"} onClick={onClick} className={componentPrimaryClass}>{children}</button>
        );
    }
    return <button>{children}</button>;
};