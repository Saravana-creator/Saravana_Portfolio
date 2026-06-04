export const cn = (...classes: (string | undefined | false | null)[]) =>
  classes.filter(Boolean).join(' ');

export const slugify = (str: string) =>
  str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

export const truncate = (str: string, n: number) =>
  str.length > n ? str.slice(0, n - 3) + '...' : str;
