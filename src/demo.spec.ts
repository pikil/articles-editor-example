import { isValidEmail } from '$lib/utils/validation';
import { describe, it, expect } from 'vitest';

describe('email validations', () => {
  const validEmails = [
    "simple@example.com",
    "very.common@example.com",
    "disposable.style.email.with+symbol@example.com",
    "other.email-with-hyphen@example.com",
    "fully-qualified-domain@example.co.uk",
    "user.name+tag+sorting@example.com",
    "x@example.com",
    "example-indeed@strange-example.com",
    "admin@mailserver1.com",
    "user@subdomain.example.com",
    "user123@example.travel",
    "1234567890@example.com",
    "_______@example.com",
    "email@example.name",
    "user@[192.168.0.1]"
  ];

  const invalidEmails = [
    "plainaddress",
    "@missingusername.com",
    "username@.com",
    "username@.com.com",
    "username@yahoo..com",
    "username@.example.com",
    "username@.com.",
    "username@-example.com",
    "username@example..com",
    "”(),:;<>[]@example.com"
  ];

  for (let i = validEmails.length; i--;)
    it(validEmails[i], () => {
      expect(isValidEmail(validEmails[i])).toBe(true);
    });

  for (let i = invalidEmails.length; i--;)
    it(invalidEmails[i], () => {
      expect(isValidEmail(invalidEmails[i])).toBe(false);
    });
});
