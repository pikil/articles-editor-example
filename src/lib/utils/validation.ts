import { emailPattern } from '$data/regexes';

export const isValidEmail = (email: string): boolean => emailPattern.test(email);
