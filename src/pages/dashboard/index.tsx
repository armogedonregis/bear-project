import { Button } from "@/components/UI/button";
import { TextCard } from "@/components/UI/textCard";
import { useAdminConfirmAgentByIdMutation, useAdminGetAllNotVerifiedUsersQuery, useAdminGetAllUsersQuery } from "@/services/adminService";
import { useAppDispatch } from "@/store/hooks";
import { setCredentialsNull } from "@/store/slice/authSlice";
import { IUser } from "@/types/user";
import { authLogout, isAuth } from "@/utils/isAuth";
import { NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  admin: IUser;
}

const AdminPage = ({ admin }: Props) => {
  const { data: allUsersNotVerified } = useAdminGetAllNotVerifiedUsersQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true
  })

  const { data: allUsers } = useAdminGetAllNotVerifiedUsersQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true
  })

  const [check, setCheck] = useState<boolean>(false)

  const [confirmUser] = useAdminConfirmAgentByIdMutation()

  const dispatch = useAppDispatch()

  const handleLogout = () => {
    window.localStorage.setItem('token', '')
    toast.success('Выйти', {
      position: 'bottom-center'
    });
    dispatch(setCredentialsNull())
    authLogout()
  }

  return (
    <section className="mt-6 lg:mt-20">
      <div className="flex lg:flex-row flex-col gap-5 lg:gap-12">
        <div className="flex flex-col gap-5 lg:h-[600px]">
          <Button onClick={() => setCheck(true)}>Все</Button>
          <Button onClick={() => setCheck(false)}>Неподтвержденные</Button>
          <div className="lg:mt-auto">
            <Button onClick={handleLogout} color="red">Выход</Button>
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="bg-bgGray border-1 px-5 py-4 border-borderGray rounded-15xl">
            Не подтвержденные пользователи
          </div>
          <div className="flex flex-col gap-5 mt-10">
            {check ?
              allUsers && allUsers.map(item => {
                return (
                  <div key={item._id} className="border-1 rounded-15xl border-borderGray py-3 px-6 ">
                    <div className="flex flex-col gap-3">
                      <TextCard first="ФИО: ">{item.fullname}</TextCard>
                      <TextCard first="Телефон: ">{item.phoneNumber}</TextCard>
                      <TextCard first="Email: ">{item.email}</TextCard>
                      <TextCard first="Тип аккаунта: ">{item.typeUser}</TextCard>
                      {item.typeOrg && <TextCard first="Тип организации: ">{item.typeOrg}</TextCard>}
                      {item.typeDeal && <TextCard first="Тип работ: ">{item.typeDeal}</TextCard>}
                      <div>Подтверждение: <span className={`${item.verified ? 'text-primary' : 'text-tertiary'} font-bold`}>{item.verified ? 'Подтвержден' : 'Не подтвержден'}</span></div>
                    </div>
                    <div className="w-[350px] mt-5">
                      <Button onClick={() => confirmUser(item._id)}>Подтвердить аккаунт</Button>
                    </div>
                  </div>
                )
              })
              :
              allUsersNotVerified && allUsersNotVerified.map(item => {
                return (
                  <div key={item._id} className="border-1 rounded-15xl border-borderGray py-3 px-6 ">
                    <div className="flex flex-col gap-3">
                      <TextCard first="ФИО: ">{item.fullname}</TextCard>
                      <TextCard first="Телефон: ">{item.phoneNumber}</TextCard>
                      <TextCard first="Email: ">{item.email}</TextCard>
                      <TextCard first="Тип аккаунта: ">{item.typeUser}</TextCard>
                      {item.typeOrg && <TextCard first="Тип организации: ">{item.typeOrg}</TextCard>}
                      {item.typeDeal && <TextCard first="Тип работ: ">{item.typeDeal}</TextCard>}
                      <div>Подтверждение: <span className={`${item.verified ? 'text-primary' : 'text-tertiary'} font-bold`}>{item.verified ? 'Подтвержден' : 'Не подтвержден'}</span></div>
                    </div>
                    <div className="w-[350px] mt-5">
                      <Button onClick={() => confirmUser(item._id)}>Подтвердить аккаунт</Button>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminPage;

export const getServerSideProps = async (ctx: NextPageContext) => {
  const isAuthencate = await isAuth(ctx)

  // Определяем локализацию
  const lang = ctx.locale

  if (!isAuthencate && (isAuthencate.data.roles.find((x: string) => x === 'ADMIN') ? true : false)) {
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
      admin: isAuthencate.data
    },
  }
};