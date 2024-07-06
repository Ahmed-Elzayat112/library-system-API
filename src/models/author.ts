import { Table, Column, Model, HasMany } from "sequelize-typescript";
import { Book } from "./book";

@Table
export class Author extends Model {
    @Column
    name!: string;

    @HasMany(() => Book)
    books!: Book[];
}
