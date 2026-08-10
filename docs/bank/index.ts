import type { BankQuestion } from './types';
import { MAT } from './mat';
import { RM } from './rm';
import { RV } from './rv';
import { CG } from './cg';

/**
 * El balotario completo, área por área.
 *
 * Se añade un archivo por área a medida que se escribe. El sembrador recorre
 * esta lista, así que basta con importarlo aquí para que entre.
 */
export const BANK: BankQuestion[] = [...RM, ...RV, ...MAT, ...CG];
