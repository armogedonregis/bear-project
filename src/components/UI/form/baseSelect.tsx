import { BaseSelectList } from "@/types/form";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import React, { Fragment, forwardRef, useState } from "react";

type Props = {
    error?: any;
    placeholder?: string;
    listItem?: BaseSelectList[];
    label?: string;
    onChange?: (value: any) => void;
    iconLeft?: React.ReactElement;
    iconRight?: React.ReactElement;
}

export const BaseSelect = forwardRef(
    ({ error, placeholder, onChange, listItem, label, iconLeft, iconRight }: Props, ref: React.Ref<HTMLDivElement>) => {

    const [selectedPerson, setSelectedPerson] = useState(placeholder);

    const handleChange = (newValue: any) => {
        setSelectedPerson(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };
    return (
        <Listbox value={selectedPerson} onChange={handleChange} ref={ref}>
            <div className={`relative mt-1`}>
                {label && <Listbox.Label className="text-xs text-left text-textPlaceholder">{label}</Listbox.Label>}
                <Listbox.Button className={`relative w-full cursor-default rounded-2xl text-black placeholder:text-textPlaceholder ${error ? 'border-tertiary border-2' : 'border-1 border-borderPrimary border-solid'} bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus:border-blue-600`}>
                    <span className="block truncate">{selectedPerson}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {listItem && listItem.map((item, key) => (
                            <Listbox.Option
                                key={key}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                    }`
                                }
                                value={item.value}
                            >
                                {({ selected }) => (
                                    <>
                                        <span
                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                }`}
                                        >
                                            {item.label}
                                        </span>
                                        {selected ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
                {error &&
                    <p className="text-xs text-tertiary mt-1">Обязательное поле</p>
                }
            </div>
        </Listbox>
    );
});

BaseSelect.displayName = "BaseSelect";