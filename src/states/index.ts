import { atom } from 'jotai';
import { atomWithImmer } from 'jotai-immer';

export const testState = atom(0);
export const countAtom = atomWithImmer({ value: 0 });
