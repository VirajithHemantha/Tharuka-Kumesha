import React, { useEffect, useState } from 'react';
import { buildDisplayName, buildInviteLink, buildInviteMessage, coupleNames, guestPrefixes } from './guest';

type Generated = { displayName: string; link: string; message: string };

async function copyText(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  // Fallback for non-HTTPS / older browsers
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  const ok = document.execCommand('copy');
  document.body.removeChild(textarea);
  if (!ok) throw new Error('Copy failed');
}

const labelClass = 'font-sans uppercase tracking-[0.25em] text-brand-sage-deep text-[10px] font-semibold';
const fieldClass =
  'w-full p-3 bg-brand-white border border-brand-champagne/50 rounded-lg font-sans text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-sage';

export default function Admin() {
  const [prefix, setPrefix] = useState<string>('Mr.');
  const [guestName, setGuestName] = useState('');
  const [generated, setGenerated] = useState<Generated | null>(null);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  useEffect(() => {
    document.title = `Invitation Links | ${coupleNames}`;
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(''), 2000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const livePreview = buildDisplayName(prefix, guestName);

  const handleGenerateLink = () => {
    const displayName = buildDisplayName(prefix, guestName);
    if (!displayName) {
      setError('Please enter a guest name.');
      return;
    }
    setError('');
    const link = buildInviteLink(window.location.origin, displayName);
    setGenerated({ displayName, link, message: buildInviteMessage(displayName, link) });
  };

  const handleCopy = async (text: string, successMessage: string) => {
    try {
      await copyText(text);
      setToast(successMessage);
    } catch {
      setToast('Could not copy — please copy manually.');
    }
  };

  return (
    <div className="min-h-[100dvh] bg-brand-ivory flex flex-col px-4 py-10 sm:p-10 font-sans text-brand-dark">
      <div className="bg-brand-white p-6 sm:p-10 rounded-2xl shadow-xl border border-brand-champagne/30 w-full max-w-2xl m-auto">
        <p className={`${labelClass} text-center mb-3`}>Invitation Link Generator</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-center mb-8">{coupleNames}</h1>

        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleGenerateLink();
          }}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="prefix" className={labelClass}>Select Prefix</label>
            <select id="prefix" value={prefix} onChange={(e) => setPrefix(e.target.value)} className={fieldClass}>
              {guestPrefixes.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="guestName" className={labelClass}>Guest Name</label>
            <input
              id="guestName"
              type="text"
              value={guestName}
              onChange={(e) => {
                setGuestName(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g. Sanjaya"
              className={fieldClass}
            />
            {error ? (
              <p className="text-sm text-red-700">{error}</p>
            ) : (
              livePreview && (
                <p className="text-sm text-brand-sage-deep">
                  Greeting: <span className="font-semibold text-brand-dark">Dear {livePreview} ❤️</span>
                </p>
              )
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-brand-sage-deep text-brand-ivory p-4 rounded-full uppercase tracking-[0.25em] text-xs font-semibold hover:bg-brand-dark transition-colors shadow-md"
          >
            Generate Link
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-brand-champagne/30 space-y-6">
          <div className="flex flex-col gap-2">
            <span className={labelClass}>Generated Link</span>
            <div className="p-3 bg-brand-cream rounded-lg break-all text-sm font-mono min-h-[2.75rem]">
              {generated ? (
                <a href={generated.link} target="_blank" rel="noopener noreferrer" className="text-brand-sage-deep underline">
                  {generated.link}
                </a>
              ) : (
                <span className="text-brand-sage">Generate a link to see it here.</span>
              )}
            </div>
          </div>

          {generated && (
            <div className="flex flex-col gap-2">
              <span className={labelClass}>Message Preview</span>
              <div className="p-4 bg-brand-cream rounded-lg text-sm whitespace-pre-wrap border border-brand-champagne/30">
                {generated.message}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              disabled={!generated}
              onClick={() => generated && handleCopy(generated.link, 'Link copied!')}
              className="border border-brand-sage-deep text-brand-sage-deep p-3 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-brand-cream transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Copy Link Only
            </button>
            <button
              type="button"
              disabled={!generated}
              onClick={() => generated && handleCopy(generated.message, 'Message copied!')}
              className="bg-brand-champagne text-brand-dark p-3 rounded-full text-xs font-semibold uppercase tracking-wider hover:brightness-95 transition shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Copy Full Message
            </button>
          </div>
        </div>
      </div>

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-brand-dark text-brand-ivory text-sm font-semibold px-5 py-3 rounded-full shadow-lg"
        >
          {toast}
        </div>
      )}
    </div>
  );
}
