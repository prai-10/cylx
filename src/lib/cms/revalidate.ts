/**
 * Cache Revalidation Utilities
 * Ensures public pages reflect CMS updates immediately without full redeployment.
 */

import { revalidatePath } from 'next/cache';

export function revalidateCmsPaths(paths: string[] = ['/']) {
  try {
    for (const path of paths) {
      revalidatePath(path);
    }
  } catch (err) {
    console.warn('[revalidateCmsPaths] Could not revalidate path:', err);
  }
}
