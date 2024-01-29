import { SubmitHandler, useForm } from "react-hook-form";
import { FormConstructor } from "@/components/formConstructor/formConstructor";
import { advancedLandingForm } from "@/forms/advancedSearchForm";
import { Button } from "@/components/UI/button";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILandingAdvancedSearchType, LandingSearchSchema } from "@/utils/yupSchema";


export const FormSearchScreen = () => {

    const { register, handleSubmit } = useForm<ILandingAdvancedSearchType>({
        resolver: yupResolver(LandingSearchSchema),
    });

    const router = useRouter()

    const sendForm: SubmitHandler<ILandingAdvancedSearchType> = (data) => {
        const params = new URLSearchParams();

        Object.entries(data).forEach(([key, value]) => {
            if (value !== '') {
                params.append(key, value);
            }
        });
        router.push(`/advanced-search?${params.toString()}`);
    }
    return (
        <FormConstructor
            sendForm={handleSubmit(data => sendForm(data))}
            register={register}
            fieldList={advancedLandingForm}
            formStyle="searchLanding"
            containerClassName="mt-7 lg:px-20 w-full"
            inputClassName="grid grid-cols-1 lg:grid-cols-2 gap-0.5 w-full"
            formClassName="flex items-center h-full"
        >
            <Button submit color="search">Найти</Button>
        </FormConstructor>
    )
};