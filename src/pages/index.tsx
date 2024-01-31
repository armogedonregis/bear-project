import { Button } from "@/components/UI/button";
import { FormConstructor } from "@/components/formConstructor/formConstructor";
import { createApplicationCalculationForm, testForm } from "@/forms/applicationForm";
import { useApplicationCreateMutation } from "@/services/calculationService";
import { ICreateAppliaction } from "@/utils/yupSchema";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import _ from 'lodash';
import { ModalComponent } from "@/components/modal";
import { useModal } from "@/hooks/useModal";
import { useAppSelector } from "@/store/hooks";
import { selectGetMe, useUserGetQuery } from "@/services/authService";
import { AuthLink } from "@/components/UI/authLink";
import HeadLayout from "@/layout/headLayout";
import { useTranslation } from "next-i18next";
import { NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Home = () => {

  const { t } = useTranslation('locale');

  const user = useAppSelector((state) => selectGetMe(state))

  const [state, setState] = useState(createApplicationCalculationForm)

  const { register, handleSubmit, control, watch, formState: { errors } } = useForm<ICreateAppliaction>();

  const [createApplication] = useApplicationCreateMutation()

  const containerType = watch('containerType')

  useEffect(() => {
    if (containerType === 'Сборка') {
      setState((prev) => [...prev, ...testForm])
    } else {
      setState(createApplicationCalculationForm)
    }
  }, [containerType])

  const { isOpen: isOpenConfirm, onCloseModal: onCloseConfirm, onOpenModal: onOpenModalConfirm } = useModal();


  const sendForm: SubmitHandler<ICreateAppliaction> = (data) => {
    const createData = {
      ...data,
      statusDanger: data.statusDanger === "Опасный" ? true : false
    }
    const filteredData = _.pickBy(createData, Boolean);
    createApplication(filteredData as ICreateAppliaction).unwrap()
      .then((res) => {
        toast.success(`Вы успешно вошли`, {
          position: 'bottom-right'
        });
        onOpenModalConfirm()
      }).catch(() => {
        toast.error(`При создании заявки что-то пошло не так`, {
          position: 'bottom-right'
        });
      })
  }

  const { isOpen, onCloseModal, onOpenModal } = useModal();

  const { data: profile } = useUserGetQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true
  })

  return (
    <HeadLayout title={t('metategs.home_page.title')} description={t('metategs.home_page.description')} keywords={t('metategs.home_page.keywords')}>
      <section className="flex flex-col mt-20 items-center">

        <ModalComponent title={t('home_page.modal_title')} isOpen={isOpenConfirm} closeModal={onCloseConfirm}>
          <div className="flex w-full mt-5 items-center gap-5 justify-center">
            <Button color="gray56" onClick={onCloseConfirm}>{t('home_page.close_modal')}</Button>
            <Button href="/main">{t('home_page.lk_link')}</Button>
          </div>
        </ModalComponent>

        <ModalComponent title={t('home_page.modal_lk')} isOpen={isOpen} closeModal={onCloseModal}>
          <div className="flex mt-5 items-center gap-5 justify-center">
            <Button color="gray56" href="/login">{t('home_page.sign_in')}</Button>
            <Button href="/registration">{t('home_page.sign_up')}</Button>
          </div>
        </ModalComponent>

        <div className="text-xl">{t('home_page.create_request')}</div>
        {user && <AuthLink title={t('home_page.link_back')} link={t('home_page.link_back_title')} href="/main" />}
        <FormConstructor
          containerClassName="mt-7 lg:w-1/2"
          formClassName="grid grid-cols-1 gap-2.5"
          sendForm={handleSubmit(data => sendForm(data))}
          register={register} fieldList={state}
          errors={errors} control={control}
        >
          <div className="w-[200px]">
            <Button onClick={profile ? undefined : onOpenModal} submit={profile ? true : false} color="blue">{t('home_page.calculate_price')}</Button>
          </div>
        </FormConstructor>
      </section>
    </HeadLayout>
  );
}

export default Home;


export const getServerSideProps = async (ctx: NextPageContext) => {

  // Определяем локализацию
  const lang = ctx.locale

  return {
      props: {
          ...(await serverSideTranslations(lang ?? 'ru', [
              'common',
              'locale'
          ])),
      },
  }
};