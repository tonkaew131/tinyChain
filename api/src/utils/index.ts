import { customAlphabet } from 'nanoid';

export const getContractsDir = () => {
    return '../contracts';
};

export const generateNanoId = (length = 12) => {
    const nanoid = customAlphabet(
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
        length
    );
    return nanoid();
};
