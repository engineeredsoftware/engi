"use client";

export const OPEN_CONVERSATIONS_OVERLAY_EVENT = 'bitcode:open-conversations-overlay';

export interface OpenConversationsOverlayDetail {
  fullscreen?: boolean;
}

export function openConversationsOverlay(detail: OpenConversationsOverlayDetail = { fullscreen: true }) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(OPEN_CONVERSATIONS_OVERLAY_EVENT, { detail }));
}
