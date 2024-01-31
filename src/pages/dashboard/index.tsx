import { Button } from "@/components/UI/button";
import { TextCard } from "@/components/UI/textCard";
import { ModalComponent } from "@/components/modal";
import { useModal } from "@/hooks/useModal";
import { useAdminConfirmAgentByIdMutation, useAdminGetAllNotVerifiedUsersQuery, useAdminGetAllUsersQuery } from "@/services/adminService";
import { useUserGetQuery } from "@/services/authService";
import { useAppDispatch } from "@/store/hooks";
import { setCredentialsNull } from "@/store/slice/authSlice";
import { IUser } from "@/types/user";
import { authLogout, isAuth } from "@/utils/isAuth";
import { NextPageContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import { toast } from "react-toastify";


const AdminPage = () => {

  const { t } = useTranslation('locale')

  const { data: allUsersNotVerified } = useAdminGetAllNotVerifiedUsersQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true
  })

  const { data: allUsers } = useAdminGetAllUsersQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true
  })

  const { data: user } = useUserGetQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true
  })


  const [check, setCheck] = useState<number>(1)


  const { isOpen, onCloseModal, modalChoise, onOpenModal } = useModal<IUser>();
  const { isOpen: isOpenLogout, onCloseModal: onCloseLogout, onOpenModal: onOpenLogout } = useModal();


  const [confirmUser] = useAdminConfirmAgentByIdMutation()

  const dispatch = useAppDispatch()

  const handleLogout = () => {
    window.localStorage.setItem('token', '')
    toast.success(('logout_modal.logout_success'), {
      position: 'bottom-center'
    });
    dispatch(setCredentialsNull())
    authLogout()
    onCloseLogout()
  }


  const confirmAccount = () => {
    if (modalChoise)
      confirmUser(modalChoise._id).unwrap()
        .then(() => {
          toast.success(('dashboard_users_page.modal_confirm.success_confirm'), {
            position: 'bottom-right'
          });
          onCloseModal()
        }).catch(() => {
          toast.error(('dashboard_users_page.modal_confirm.error_confirm'), {
            position: 'bottom-right'
          });
          onCloseModal()
        })
  }

  return (
    <section className="mt-6 lg:mt-20">

      <ModalComponent title={t('logout_modal.title')} isOpen={isOpenLogout} closeModal={onCloseLogout}>
        <div className="flex w-full mt-5 items-center gap-5 justify-center">
          <Button color="gray56" onClick={onCloseLogout}>{t('logout_modal.btn_cancel')}</Button>
          <Button onClick={handleLogout}>{t('logout_modal.btn_confirm')}</Button>
        </div>
      </ModalComponent>

      <ModalComponent title={t('dashboard_users_page.modal_confirm.title')} isOpen={isOpen} closeModal={onCloseModal}>
        <div className="flex w-full mt-5 items-center gap-5 justify-center">
          <Button color="gray56" onClick={onCloseModal}>{t('dashboard_users_page.modal_confirm.cancel')}</Button>
          <Button onClick={confirmAccount}>{t('dashboard_users_page.modal_confirm.confirm')}</Button>
        </div>
      </ModalComponent>

      <div className="flex lg:flex-row flex-col gap-5 lg:gap-12">
        <div className="flex flex-col gap-5 lg:h-[600px]">
          <Button onClick={() => setCheck(1)}>{t('dashboard_users_page.btn_all')}</Button>
          <Button onClick={() => setCheck(2)}>{t('dashboard_users_page.btn_unconfirmed')}</Button>
          <div className="lg:mt-auto">
            <Button onClick={onOpenLogout} color="red">{t('dashboard_users_page.btn_logout')}</Button>
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="bg-bgGray border-1 px-5 py-4 border-borderGray rounded-15xl">
            {t('dashboard_users_page.title_box')}
          </div>
          <div className="flex flex-col gap-5 mt-10">
            {check === 1 &&
              allUsers && allUsers.map(item => {
                return (
                  <div key={item._id} className="border-1 rounded-15xl border-borderGray py-3 px-6 ">
                    <div className="flex flex-col gap-3">
                      <TextCard first={t('dashboard_users_page.card.fio')}>{item.fullname}</TextCard>
                      <TextCard first={t('dashboard_users_page.card.phoneNumber')}>{item.phoneNumber}</TextCard>
                      <TextCard first={t('dashboard_users_page.card.email')}>{item.email}</TextCard>
                      <TextCard first={t('dashboard_users_page.card.typeUser')}>{item.typeUser}</TextCard>
                      {item.typeOrg && <TextCard first={t('dashboard_users_page.card.typeOOO')}>{item.typeOrg}</TextCard>}
                      {item.typeDeal && <TextCard first={t('dashboard_users_page.card.typeDeal')}>{item.typeDeal}</TextCard>}
                      <div>{t('dashboard_users_page.card.confirm')} <span className={`${item.verified ? 'text-primary' : 'text-tertiary'} font-bold`}>{item.verified ? t('dashboard_users_page.card.confirmed') : t('dashboard_users_page.card.no_confirmed')}</span></div>
                    </div>
                  </div>
                )
              })
            }
            {check === 2 && allUsersNotVerified && allUsersNotVerified.map(item => {
              return (
                <div key={item._id} className="border-1 rounded-15xl border-borderGray py-3 px-6 ">
                  <div className="flex flex-col gap-3">
                    <TextCard first={t('dashboard_users_page.card.fio')}>{item.fullname}</TextCard>
                    <TextCard first={t('dashboard_users_page.card.phoneNumber')}>{item.phoneNumber}</TextCard>
                    <TextCard first={t('dashboard_users_page.card.email')}>{item.email}</TextCard>
                    <TextCard first={t('dashboard_users_page.card.typeUser')}>{item.typeUser}</TextCard>
                    {item.typeOrg && <TextCard first={t('dashboard_users_page.card.typeOOO')}>{item.typeOrg}</TextCard>}
                    {item.typeDeal && <TextCard first={t('dashboard_users_page.card.typeDeal')}>{item.typeDeal}</TextCard>}
                    <div>{t('dashboard_users_page.card.confirm')} <span className={`${item.verified ? 'text-primary' : 'text-tertiary'} font-bold`}>{item.verified ? t('dashboard_users_page.card.confirmed') : t('dashboard_users_page.card.no_confirmed')}</span></div>
                  </div>
                  <div className="w-[350px] mt-5">
                    <Button onClick={() => onOpenModal(item)}>{t('dashboard_users_page.card.btn_confirm')}</Button>
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