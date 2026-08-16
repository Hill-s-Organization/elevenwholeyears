export type ApiResult<T> =
    | { success: true; data: T }
    | { success: false; error: string };

export const ApiResult = {
    success<T>(data: T): ApiResult<T> {
        return { success: true, data };
    },

    failure<T>(error: string): ApiResult<T> {
        return { success: false, error };
    }
};