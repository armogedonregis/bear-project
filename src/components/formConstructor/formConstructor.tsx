import { Control, Controller, FieldValues, UseFormRegister } from "react-hook-form";
import { BaseInput } from "../UI/form/baseInput";
import { BaseSelect } from "../UI/form/baseSelect";
import { BaseSelectList, IForm, IFormType } from "@/types/form";



type Props<T extends FieldValues> = {
    containerClassName?: string;
    formClassName?: string;
    fieldList: IForm<T>[];
    sendForm: (event: React.FormEvent<HTMLFormElement>) => void;
    register: UseFormRegister<T>;
    children?: React.ReactNode;
    control?: Control<T, any>;
    errors?: Record<string, any>;
    inputClassName?: string;
    noEnter?: boolean;
}

export function FormConstructor<T extends FieldValues>({
    containerClassName, formClassName,
    fieldList, sendForm, register, children, control,
    errors, inputClassName, noEnter
}: Props<T>) {

    const renderMap: Record<IFormType, (item: IForm<T>, index: number) => JSX.Element> = {
        input: (item: IForm<T>, index: number) => (
            <BaseInput
                key={index}
                {...register(item.fieldName!)}
                pass={item.pass}
                iconLeft={item.iconLeft}
                postLabel={item.postLabel}
                iconRight={item.iconRight}
                label={item.label}
                placeholder={item.placeholder}
                error={item.fieldName && errors && errors[item.fieldName]?.message}
            />
        ),
        title: (item: IForm<T>, index: number) => (
            <h4 key={index} className="text-textPrimary py-5 font-bold text-base">{item.label}</h4>
        ),
        select: (item: IForm<T>, index: number) => (
            <Controller
                name={item.fieldName!}
                key={index}
                control={control}
                render={({ field }) => (
                    <BaseSelect
                        {...field}
                        placeholder={item.placeholder}
                        iconLeft={item.iconLeft}
                        error={item.fieldName && errors && errors[item.fieldName]?.message}
                        iconRight={item.iconRight}
                        label={item.label}
                        listItem={item.listItem}
                        onChange={(value) => field.onChange(value)}
                    />
                )}
            />
        ),
    };
    return (
        <div className={containerClassName}>
            <form onKeyDown={noEnter ? (e) => { if (e.key === 'Enter') e.preventDefault() } : undefined} className={formClassName} onSubmit={sendForm}>
                {inputClassName ?
                    <>
                        <div className={inputClassName}>
                            {fieldList.map((item, index) => {
                                return renderMap[item.type](item, index)
                            })}
                        </div>
                        <div>
                            {children}
                        </div>
                    </>
                    :
                    <>
                        {fieldList.map((item, index) => {
                            return renderMap[item.type](item, index)
                        })}
                        {children}
                    </>
                }
            </form>
        </div>
    );
};