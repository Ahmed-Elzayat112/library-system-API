import { Model, FindAndCountOptions } from "sequelize";

interface PaginationOptions {
    page?: number;
    pageSize?: number;
}

interface PaginationResult<T> {
    data: T[];
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
}
export const paginate = async <T extends Model>(
    model: { new (): T } & typeof Model,
    options: FindAndCountOptions,
    { page = 1, pageSize = 10 }: PaginationOptions = {}
): Promise<PaginationResult<T>> => {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    const { count, rows } = await model.findAndCountAll({
        ...options,
        offset,
        limit,
    });

    const totalPages = Math.ceil(count / pageSize);

    return {
        data: rows as T[],
        page,
        pageSize,
        totalCount: count,
        totalPages,
    };
};
