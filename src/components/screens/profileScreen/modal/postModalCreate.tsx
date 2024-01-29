import { Button } from "@/components/UI/button";
import { FormConstructor } from "@/components/formConstructor/formConstructor";
import { ModalComponent } from "@/components/modal";
import { postCreateForm } from "@/forms/postCreateForm";
import { useCreateNewPostMutation } from "@/services/postService";
import { PostFormSchema, PostSchema } from "@/utils/yupSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Props = {
    isOpen: boolean;
    onCloseModal: () => void;

}

export const PostModalCreate = ({ isOpen, onCloseModal }: Props) => {
    const [createNewPost] = useCreateNewPostMutation()

    const { register, reset, control, formState: { errors }, setValue, getValues, watch, handleSubmit } = useForm<PostFormSchema>({
        resolver: yupResolver(PostSchema),
    });

    const sendForm: SubmitHandler<PostFormSchema> = (data) => {
        const formData = new FormData();
        formData.append("description", data.description);
        data.images.forEach((image) => {
            formData.append(`images`, image);
        });
        createNewPost(formData).unwrap()
            .then(() => {
                reset()
                toast.success(`Пост успешно создан`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                onCloseModal()
            }).catch(() => {
                toast.error(`Что-то пошло не так...`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                reset()
            })
    }
    return (
        <ModalComponent width="lg:w-5/12" title="Портфолио - добавление" isOpen={isOpen} closeModal={onCloseModal}>
            {isOpen &&
                <FormConstructor
                    containerClassName="mt-8 w-full"
                    formClassName="grid grid-cols-1 gap-2 w-full"
                    sendForm={handleSubmit(data => sendForm(data))}
                    errors={errors}
                    register={register} fieldList={postCreateForm} getValues={getValues} watch={watch} control={control} setValue={setValue}
                >
                    <div className="flex items-center mt-5 justify-between w-full gap-5">
                        <Button onClick={onCloseModal} color="gray">Отмена</Button>
                        <Button submit color="blue">Подтвердить</Button>
                    </div>
                </FormConstructor>
            }
        </ModalComponent>
    );
};