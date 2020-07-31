export interface MultiSelectOption<T> {
    displayText: string;
    value: T;
    selected: boolean;
    active: boolean;
}