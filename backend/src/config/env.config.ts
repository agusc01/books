import { Env } from '../models/enums/env.enum';


export const envConfig = (key: Env): string | number => {
    const value = process.env[key];
    if (!value) { throw new Error(`ENVIRONMENT ERROR : ${key}!`); }
    return isNaN(+value) ? value : Number(value);
};

export const checkEnvironments = (show: 'value' | 'key' | 'key value' | 'nothing' = 'nothing'): void => {
    console.log('-----------------checkEnvironments-------------------');
    Object.values(Env).forEach(key => {

        const value = envConfig(key as any);

        if (show === 'value') {
            console.log({ value });
            return;
        }
        if (show == 'key') {
            console.log({ key });
            return;
        }
        if (show === 'key value') {
            console.log({ key, value });
            return;
        }
    });
    console.log('-----------------------------------------------------\n');
};
