export interface SelectData{
    default: string
    type: "single"|"multiple"
    search: boolean
    showLabel : boolean
    list: SelectValues[]
}
export interface SelectValues{
    id: any
    value: string | number
}
