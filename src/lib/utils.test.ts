import { expect, test } from 'vitest';
import { getInitialName } from './utils';

test('generate initials from name', () => {
	expect(getInitialName('John')).toBe('J');
	expect(getInitialName('John Doe')).toBe('JD');
	expect(getInitialName('Andre Kusuma Jaya')).toBe('AK');
});
