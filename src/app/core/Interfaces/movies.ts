
export interface IMovie{
    id?: number,
    name: string,
    image: File,
    description: string,
    category_id: number | string ,
    created_at?: Date,
    updated_at?: Date
}