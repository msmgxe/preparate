import { INTL_LOCALE, type Locale } from '@/lib/i18n/config';

/**
 * Precios en la moneda de quien mira, cobrados siempre en soles.
 *
 * Los importes viven en la base en soles porque es lo que entra en la cuenta:
 * el pago es por Yape, Plin o transferencia a un banco peruano. Lo que cambia
 * por idioma es solo cómo se muestran, para que un brasileño no tenga que
 * abrir la calculadora antes de decidir.
 *
 * Por eso el número mostrado es orientativo y se redondea: fingir dos decimales
 * daría a entender una precisión que el tipo de cambio del día no tiene. Cada
 * pantalla de precios lo dice con todas sus letras (`priceNote`).
 *
 * ⚠️ Los tipos de cambio son fijos y hay que revisarlos de vez en cuando. Están
 * puestos con holgura a la baja: si el sol se aprecia, cobras un poco más de lo
 * anunciado, no menos.
 */
export const CURRENCIES: Record<
  Locale,
  { code: string; symbol: string; perSol: number; space: boolean }
> = {
  es: { code: 'PEN', symbol: 'S/', perSol: 1, space: true },
  /** ≈ 3,75 soles por dólar. En inglés el símbolo va pegado: `$10`. */
  en: { code: 'USD', symbol: '$', perSol: 0.267, space: false },
  /** ≈ 1,45 reales por sol. */
  pt: { code: 'BRL', symbol: 'R$', perSol: 1.45, space: true },
};

/**
 * Redondea a una cifra que se lea como un precio y no como una conversión.
 * Cuanto mayor el importe, más grueso el redondeo: nadie compara 157 con 160.
 */
function round(value: number): number {
  if (value < 100) return Math.round(value);
  if (value < 500) return Math.round(value / 5) * 5;
  return Math.round(value / 10) * 10;
}

/** Convierte de soles a la moneda del idioma, ya redondeado. */
export function convert(soles: number, locale: Locale): number {
  const currency = CURRENCIES[locale];
  return locale === 'es' ? soles : round(soles * currency.perSol);
}

/**
 * El precio listo para pintar: `S/ 39`, `$10`, `R$ 1.290`.
 * El separador de miles es el del idioma: en Brasil es el punto, no la coma.
 */
export function money(soles: number, locale: Locale): string {
  const currency = CURRENCIES[locale];
  const amount = convert(soles, locale).toLocaleString(INTL_LOCALE[locale]);
  return `${currency.symbol}${currency.space ? ' ' : ''}${amount}`;
}

/**
 * El mismo importe en soles, sin traducir.
 *
 * Va en los mensajes de WhatsApp: quien los recibe cobra en soles, así que el
 * mensaje tiene que traer la cifra que de verdad se va a pagar.
 */
export function soles(amount: number): string {
  return `S/ ${amount.toLocaleString('es-PE')}`;
}
