import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

type Props = {
    title?: string;
    href: Url;
    link: string;
}

export const AuthLink = ({ title, href, link }: Props) => {
    return (
        <div className="text-center">
            <span className="text-sm">{title} <Link className="text-primary" href={href}>{link}</Link></span>
        </div>
    );
};