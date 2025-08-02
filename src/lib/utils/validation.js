import { emailPattern } from '$data/regexes';

/**
 * @param {String} email
 * @returns {Boolean}
 */
export const isValidEmail = email => emailPattern.test(email);
