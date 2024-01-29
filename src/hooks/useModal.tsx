import { useState } from "react";

type Props<T> = {
    isOpen: boolean;
    modalChoise: T | undefined;
    onOpenModal: (e?: T) => void;
    onCloseModal: () => void;
}

export const useModal = <T,>(): Props<T> => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [modalChoise, setModalChoise] = useState<T | undefined>();

    const onOpenModal = (item: T | undefined) => {
        setIsOpen(true)
        setModalChoise(item)
    };

    const onCloseModal = () => setIsOpen(false);

    return {
        isOpen, modalChoise, onOpenModal, onCloseModal
    }
};