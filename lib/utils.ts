import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getQueryStrings(params: {key: string, value: string}[]) {
  const searchParams = new URLSearchParams();
  for(const {key, value} of params) {
    searchParams.set(key, value);
  }

  return searchParams.toString();
}

export const colors = [
  '#FF6384',
  '#36a2eb',
  '#ff6384',
  '#ff9f40',
  '#ffcd56',
  '#4bc0c0',
  '#9966ff',
  '#f5b7f7'
];