import type { BankQuestion } from './types';
import { MAT } from './mat';

/**
 * El balotario completo, área por área.
 *
 * Se añade un archivo por área a medida que se escribe. El sembrador recorre
 * esta lista, así que basta con importarlo aquí para que entre.
 */
export const BANK: BankQuestion[] = [...MAT];
