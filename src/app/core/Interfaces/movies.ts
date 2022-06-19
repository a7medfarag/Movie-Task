import { DatePipe } from "@angular/common";

export interface moviesObj{
    id: number,
    name: string,
    image: string,
    description: string,
    category_id: string,
    created_at: DatePipe,
    updated_at: DatePipe
}