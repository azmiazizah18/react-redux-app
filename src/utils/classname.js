import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export function classname(...classNames) {
  return twMerge(clsx(...classNames));
}
