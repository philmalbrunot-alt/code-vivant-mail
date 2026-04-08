export function cn(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(' ');
}

export function compact(text: string, max = 450) {
  return text.length <= max ? text : `${text.slice(0, max - 1)}…`;
}
