import { formatAddress, AddressFormatError } from '@utils/index';

describe('formatAddress', () => {
  const validAddress = '0x1234567890123456789012345678901234567890';

  describe('valid addresses', () => {
    it('should format address with default chars (3)', () => {
      expect(formatAddress(validAddress)).toBe('0x123...890');
    });

    it('should format address with custom chars length', () => {
      expect(formatAddress(validAddress, 4)).toBe('0x1234...7890');
      expect(formatAddress(validAddress, 6)).toBe('0x123456...567890');
    });

    it('should handle minimum chars value of 1', () => {
      expect(formatAddress(validAddress, 1)).toBe('0x1...0');
    });
  });

  describe('error handling', () => {
    it('should throw AddressFormatError for non-string input', () => {
      expect(() => formatAddress(null as any)).toThrow(
        new AddressFormatError('Address must be a string'),
      );
      expect(() => formatAddress(undefined as any)).toThrow(
        new AddressFormatError('Address must be a string'),
      );
      expect(() => formatAddress(123 as any)).toThrow(
        new AddressFormatError('Address must be a string'),
      );
    });

    it('should throw AddressFormatError for address not starting with 0x', () => {
      expect(() => formatAddress('1234567890123456789012345678901234567890')).toThrow(
        new AddressFormatError('Address must start with 0x'),
      );
    });

    it('should throw AddressFormatError for invalid address length', () => {
      expect(() => formatAddress('0x123456789')).toThrow(
        new AddressFormatError('Address must be 42 characters long'),
      );
      expect(() => formatAddress('0x123456789012345678901234567890123456789012')).toThrow(
        new AddressFormatError('Address must be 42 characters long'),
      );
    });

    it('should throw AddressFormatError for invalid hex characters', () => {
      expect(() => formatAddress('0x12345678901234567890123456789012345678zz')).toThrow(
        new AddressFormatError('Address contains invalid characters'),
      );
    });
  });
});
