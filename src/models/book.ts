import {
    Table,
    Column,
    Model,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";
import { Author } from "./author";

@Table
export class Book extends Model {
    @Column
    title!: string;

    @ForeignKey(() => Author)
    @Column
    authorId!: number;

    @BelongsTo(() => Author)
    author!: Author;
}
