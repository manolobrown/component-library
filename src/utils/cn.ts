import { clsx, type ClassValue } from 'clsx'

/**
 * Utility function for conditionally joining class names together.
 * A thin wrapper around clsx for consistent usage across the component library.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs)
}
