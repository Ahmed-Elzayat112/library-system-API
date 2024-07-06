import {
    Table,
    Column,
    Model,
    BeforeSave,
    DataType,
} from "sequelize-typescript";
import bcrypt from "bcryptjs";

@Table({
    tableName: "users",
    timestamps: true,
})
export default class User extends Model {
    @Column({
        allowNull: false,
        type: DataType.STRING,
        unique: true,
    })
    username!: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    password!: string;

    @Column({
        allowNull: false,
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    isAdmin!: boolean;

    @BeforeSave
    static async hashPassword(instance: User) {
        if (instance.changed("password")) {
            if (typeof instance.password === "string") {
                instance.password = await bcrypt.hash(instance.password, 12);
            } else {
                throw new Error("Password must be a string");
            }
        }
    }

    async validatePassword(password: string): Promise<boolean> {
        if (typeof this.password === "string") {
            return await bcrypt.compare(
                password.toString(),
                this.password.toString()
            );
        }
        return false;
    }
}
