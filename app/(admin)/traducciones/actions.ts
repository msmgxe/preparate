'use server';

import { revalidatePath } from 'next/cache';
import { eq, sql } from 'drizzle-orm';
import { getDb } from '@/db';
import { areas, chapters, lessons, plans, questions } from '@/db/schema';
import { requireAdmin } from '@/lib/auth';
import { isLocale } from '@/lib/i18n/config';
import { GROUPS } from '@/lib/translatable';

const TABLES = { areas, chapters, lessons, plans, questions } as const;

/**
 * Guarda la traducción de una fila.
 *
 * Escribe solo la rama del idioma editado (`i18n.en` o `i18n.pt`) con
 * `jsonb_set`, así dos idiomas nunca se pisan. Un campo vacío se borra en vez
 * de guardarse como cadena vacía: así el respaldo al español vuelve a entrar.
 */
export async function saveTranslation(formData: FormData) {
  await requireAdmin();

  const table = String(formData.get('table') ?? '');
  const id = String(formData.get('id') ?? '');
  const locale = String(formData.get('locale') ?? '');
  const group = GROUPS.find((g) => g.table === table);

  if (!group || !id || !isLocale(locale) || locale === 'es') return;

  const bag: Record<string, string | string[]> = {};
  for (const field of group.fields) {
    const raw = String(formData.get(field.name) ?? '').trim();
    if (!raw) continue;
    bag[field.name] =
      field.kind === 'list' ? raw.split('\n').map((s) => s.trim()).filter(Boolean) : raw;
  }

  const target = TABLES[table as keyof typeof TABLES];
  await getDb()
    .update(target)
    .set({
      i18n: sql`jsonb_set(coalesce(${target.i18n}, '{}'::jsonb), ${`{${locale}}`}, ${JSON.stringify(bag)}::jsonb, true)`,
    })
    .where(eq(target.id, id));

  revalidatePath('/traducciones');
}
