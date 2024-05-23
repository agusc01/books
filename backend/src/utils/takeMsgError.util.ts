
export const takeMsgError = (error: Error): string => {
    return `${basicMsgError(error?.message)}. ${sequelizeMsgError(error)}`;
};

const sequelizeMsgError = (error: Error): string => {
    if ((error?.name as string).toLowerCase().includes('sequelize')) {
        return basicMsgError((error as any).original.sqlMessage);
    }
    return '';
};

const basicMsgError = (error: string): string => {
    return error
        .replaceAll('"', " ")
        .replaceAll('\\', " ")
        .replaceAll("'", " ");
};