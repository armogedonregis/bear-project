import Image from "next/image";
import formatDateDistanceToNow from "@/utils/formatDateDistanceToNow";
import { IPortfolio } from "@/types/portfolio";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Button } from "@/components/UI/button";
import { selectGetMe } from "@/services/authService";
import { useAppSelector } from "@/store/hooks";
import { LikeComponent } from "@/components/UI/likeComponent";
import { IProfile } from "@/types/profile";
import { ContextMenu } from "@/components/UI/contextMenu";
import { createSvgShimmer } from "@/utils/getBase64";

type Props = {
    user: IProfile;
    post: IPortfolio;
    onDeleteOpen: () => void;
    onEditOpen: () => void;
    onNoAuthUser: () => void;
    likePortfolio: () => void;
}

export const PortfolioUserCard = ({ user, post, onDeleteOpen, onEditOpen, onNoAuthUser, likePortfolio }: Props) => {
    const me = useAppSelector((state) => selectGetMe(state).data)
    return (
        <div className="border-1 w-full group rounded-2xl border-main pt-2 pb-4 pl-3 pr-5">
            <div className="flex justify-between">
                <div>
                    <h5 className="text-black font-bold font-balsamiq">{user.fullname}</h5>
                    <div className="text-grayTime text-xs">{post.createdAt && formatDateDistanceToNow(post.createdAt)}</div>
                    <p className="text-darkPost text-sm whitespace-break-spaces">{post.description}</p>
                </div>
                {me?.username === user.username &&
                    <ContextMenu onEditOpen={onEditOpen} onDeleteOpen={onDeleteOpen} />
                }
            </div>
            <PhotoProvider>
                <div className={`grid mt-5 ${post.proofs.length > 2 ? 'grid-cols-3' : post.proofs.length === 2 ? 'grid-cols-2' : 'grid-cols-1'} gap-2`}>
                    {post.proofs?.length > 0 && post.proofs.map((item, index) => {
                        if(index > 4) {
                            return (
                                <PhotoView key={index} src={item}>
                                    <div className={`hidden ${index === 3 && post.proofs.length === 4 ? 'col-span-2' : 'col-span-1'} cursor-pointer`}>
                                        <Image
                                            className="object-cover w-full h-[280px] rounded-2xl"
                                            width={1280}
                                            height={720}
                                            alt={'avatar'}
                                            placeholder="blur"
                                            blurDataURL={createSvgShimmer(1280, 720)}
                                            src={item ? item : "/assets/images/avatar_default.png"}
                                        />
                                    </div>
                                </PhotoView>
                            )
                        }
                        if(index === 4) {
                            return (
                                <PhotoView key={index} src={item}>
                                    <div className={`cursor-pointer relative`}>
                                        <button className="absolute top-1/2 z-10 bg-primary rounded-2xl text-nowrap px-3 py-2 -translate-x-1/2 left-1/2 -translate-y-1/2 text-white">смотреть больше</button>
                                        <Image
                                            className="object-cover opacity-70 w-full h-[280px] rounded-2xl"
                                            width={1280}
                                            height={720}
                                            alt={'avatar'}
                                            placeholder="blur"
                                            blurDataURL={createSvgShimmer(1280, 720)}
                                            src={item ? item : "/assets/images/avatar_default.png"}
                                        />
                                    </div>
                                </PhotoView>
                            )
                        } else {
                            return (
                                <PhotoView key={index} src={item}>
                                    <div className={`${index === 3 && post.proofs.length === 4 ? 'col-span-3' : 'col-span-1'} ${index === 3 && post.proofs.length > 4 ? 'col-span-2' : 'col-span-1'} cursor-pointer`}>
                                        <Image
                                            className="object-cover w-full h-[280px] rounded-2xl"
                                            width={1280}
                                            height={720}
                                            placeholder="blur"
                                            blurDataURL={createSvgShimmer(1280, 720)}
                                            alt={'avatar'}
                                            src={item ? item : "/assets/images/avatar_default.png"}
                                        />
                                    </div>
                                </PhotoView>
                            )
                        }
                    })
                    }
                </div>
            </PhotoProvider>
            <div className="flex items-center h-[30px] mt-4 justify-between">
                <LikeComponent onClick={!me ? onNoAuthUser : likePortfolio} likes={post.likes} me={post.likes.find(x => x.user === me?._id) ? true : false} />
                <div className="w-[180px] lg:hidden lg:group-hover:block">
                    <Button href={`/profile/${user.username}/portfolios/${post._id}`} color="smallBlue">Перейти в портфолио</Button>
                </div>
            </div>
        </div>
    );
};