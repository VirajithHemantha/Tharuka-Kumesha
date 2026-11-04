/**
 * Shared guest/couple helpers used by both the invitation (App) and the
 * link generator (Admin), so links and on-page names always agree.
 */

export const groomName = 'Tharuka';
export const brideName = 'Kumesha';
export const coupleNames = `${groomName} & ${brideName}`;

export const guestPrefixes = ['Mr.', 'Mrs.', 'Miss', 'Mr. & Mrs.', 'Family', 'Dear'] as const;

/** Combines prefix + name. "Dear" is a greeting style, so it never appears in the name itself. */
export function buildDisplayName(prefix: string, name: string): string {
  const cleanName = name.trim().replace(/\s+/g, ' ');
  if (!cleanName) return '';
  switch (prefix.trim().toLowerCase()) {
    case 'dear':
      return cleanName;
    case 'family':
      return `${cleanName} and Family`;
    default:
      return `${prefix.trim()} ${cleanName}`;
  }
}

/** {baseURL}/{displayName}, safely encoded (spaces, &, /, etc.). */
export function buildInviteLink(baseUrl: string, displayName: string): string {
  return `${baseUrl.replace(/\/+$/, '')}/${encodeURIComponent(displayName)}`;
}

export function buildInviteMessage(displayName: string, link: string): string {
  return `Dear ${displayName} ❤️

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${link}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ ${groomName} & ${brideName}`;
}

/** Reads the guest display name from /{name}. Returns '' when there is none. */
export function readGuestFromUrl(location: Location = window.location): string {
  const segment = location.pathname.replace(/^\/+|\/+$/g, '');
  if (!segment || segment.toLowerCase() === 'admin') return '';
  try {
    return decodeURIComponent(segment).trim().slice(0, 80);
  } catch {
    return '';
  }
}
