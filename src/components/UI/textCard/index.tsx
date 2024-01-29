type Props = {
    first: string;
    children: React.ReactNode;
}

export const TextCard = ({ first, children }: Props) => {
    return (
        <div>{first} <span className="font-bold">{children}</span></div>
    );
};