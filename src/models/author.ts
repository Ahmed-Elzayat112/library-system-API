import { Table, Column, Model, HasMany } from "sequelize-typescript";
import Book from "./book";

@Table
export default class Author extends Model {
    @Column
    name!: string;

    @HasMany(() => Book)
    books!: Book[];
}
