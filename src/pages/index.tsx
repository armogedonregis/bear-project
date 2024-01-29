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

const Home = () => {

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
        toast.error(`Неправильный email или пароль`, {
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
    <section className="flex flex-col mt-20 items-center">

      <ModalComponent title="С Вами свяжется менеджер! Все отклики на заявку можете посмотреть в личном кабинете" isOpen={isOpenConfirm} closeModal={onCloseConfirm}>
        <div className="flex w-full mt-5 items-center gap-5 justify-center">
          <Button color="gray56" onClick={onCloseConfirm}>Закрыть</Button>
          <Button href="/main">Личный кабинет</Button>
        </div>
      </ModalComponent>

      <ModalComponent title="Для продолжения нужно войти в систему" isOpen={isOpen} closeModal={onCloseModal}>
        <div className="flex mt-5 items-center gap-5 justify-center">
          <Button color="gray56" href="/login">Вход</Button>
          <Button href="/registration">Регистрация</Button>
        </div>
      </ModalComponent>

      <div className="text-xl">Создать заявку</div>
      {user && <AuthLink title="Вернуться в" link="профиль" href="/main" />}
      <FormConstructor
        containerClassName="mt-7 lg:w-1/2"
        formClassName="grid grid-cols-1 gap-2.5"
        sendForm={handleSubmit(data => sendForm(data))}
        register={register} fieldList={state}
        errors={errors} control={control}
      >
        <div className="w-[200px]">
          <Button onClick={profile ? undefined : onOpenModal} submit={profile ? true : false} color="blue">РАСЧЕТ СТОИМОСТИ</Button>
        </div>
      </FormConstructor>
    </section>
  );
}

export default Home;