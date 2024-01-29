import { BaseSelectList, IForm } from "@/types/form";
import { ICreateAppliaction } from "@/utils/yupSchema";

// select type typePointOfDeparture
const typePointOfDeparture: BaseSelectList[] = [
    {
        value: 'Из Китая',
        label: 'Из Китая'
    },
    {
        value: 'Из Кореи',
        label: "Из Кореи"
    },
    {
        value: 'Из Японии',
        label: "Из Японии"
    }
]

// select type pointOfArrival
const typePointOfArrival: BaseSelectList[] = [
    {
        value: 'в Китая',
        label: 'в Китая'
    },
    {
        value: 'в Кореи',
        label: 'в Кореи'
    },
    {
        value: 'в Японии',
        label: 'в Японии'
    }
]

// select type containerType
const typeContainerType: BaseSelectList[] = [
    {
        value: '20DC',
        label: '20DC'
    },
    {
        value: '40HC',
        label: '40HC'
    },
    {
        value: 'Сборка',
        label: 'Сборка'
    }
]

// select type statusDanger
const typeStatusDanger: BaseSelectList[] = [
    {
        value: 'Опасный',
        label: 'Опасный'
    },
    {
        value: 'Не опасный',
        label: 'Не опасный'
    }
]

// create application for calculation
export const createApplicationCalculationForm: IForm<ICreateAppliaction>[] = [
    {
        fieldName: "pointOfDeparture",
        type: "select",
        placeholder: "Введите пункт отправления отправления",
        label: "Пункт отправления",
        listItem: typePointOfDeparture
    },
    {
        fieldName: "pointOfArrival",
        type: "select",
        placeholder: "Введите пункт прибытия",
        label: "Пункт прибытия",
        listItem: typePointOfArrival
    },
    {
        fieldName: "containerType",
        type: "select",
        placeholder: "Укажите тип контейнера",
        label: "Тип контейнера",
        listItem: typeContainerType
    },
    {
        fieldName: "statusDanger",
        type: "select",
        placeholder: "Укажите вид груза",
        label: "Характеристика Груза",
        listItem: typeStatusDanger
    }
];

export const testForm: IForm<ICreateAppliaction>[] = [
    {
        type: "title",
        label: "Данные о грузе"
    },
    {
        fieldName: "totalWeight",
        type: "input",
        label: "Общий вес",
        placeholder: "Общий вес, кг"
    },
    {
        fieldName: "totalVolume",
        type: "input",
        label: "Общий объем",
        placeholder: "Общий объем, м3"
    },
    {
        fieldName: "maximumDimensions",
        type: "input",
        label: "Максимальные габариты",
        placeholder: "Максимальные габариты, м"
    },
    {
        fieldName: "numberOfSeats",
        type: "input",
        label: "Кол-во мест",
        placeholder: "Кол-во мест"
    }
];