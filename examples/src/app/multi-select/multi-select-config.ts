export interface MultiSelectConfig<T> {
    displayText: string | ((_: T) => string);
}