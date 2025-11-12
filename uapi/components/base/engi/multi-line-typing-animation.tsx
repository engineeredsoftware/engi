"use client";

import React, { useEffect, useLayoutEffect, useRef, useState, useMemo } from 'react';
import type { FC } from 'react';
import { cn } from '@engi/styling';
import dynamic from 'next/dynamic';
const ParticleEffect = dynamic(() => import('./particle-effect'), { ssr: false, loading: () => null });

interface Props {
  text: string;
  charDelay?: number;
  startDelay?: number;
  className?: string;
  onComplete?: () => void;
  highlightText?: string;
  highlightClass?: string;
  showCursor?: boolean;
  disableParticleEffect?: boolean;
}

const MultiLineTypingAnimation: FC<Props> = ({
  text,
  charDelay = 40,
  startDelay = 0,
  className = '',
  onComplete,
  highlightText = '',
  highlightClass = '',
  showCursor = true,
  disableParticleEffect = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement | null>(null);
  const [lines, setLines] = useState<string[] | null>(null);

  const measureLines = () => {
    if (!containerRef.current) return;
    let ghost = ghostRef.current;
    if (!ghost) {
      ghost = document.createElement('div');
      ghost.setAttribute('data-ghost', 'true');
      containerRef.current.appendChild(ghost);
      ghostRef.current = ghost;
    } else {
      while (ghost.firstChild) ghost.removeChild(ghost.firstChild);
    }

    let anchor: HTMLElement | null = containerRef.current.parentElement;
    let anchorWidth = 0;
    while (anchor && anchorWidth === 0) {
      anchorWidth = anchor.getBoundingClientRect().width;
      if (anchorWidth === 0) anchor = anchor.parentElement;
    }
    anchorWidth = anchorWidth || window.innerWidth;
    let cssMax = window.getComputedStyle(anchor || document.body).maxWidth;
    let cssMaxPx = Number.POSITIVE_INFINITY;
    if (cssMax && cssMax !== 'none') {
      if (cssMax.endsWith('px')) cssMaxPx = parseFloat(cssMax);
      else if (cssMax.endsWith('rem')) {
        const rootFont = parseFloat(getComputedStyle(document.documentElement).fontSize || '16');
        cssMaxPx = parseFloat(cssMax) * (rootFont || 16);
      }
    }
    let measureWidth = Math.min(anchorWidth, cssMaxPx);
    if (!measureWidth || Number.isNaN(measureWidth)) measureWidth = window.innerWidth;
    containerRef.current.style.minWidth = '0px';

    ghost.style.position = 'absolute';
    ghost.style.top = '0';
    ghost.style.left = '0';
    ghost.style.width = measureWidth ? `${measureWidth}px` : '100%';
    ghost.style.maxWidth = measureWidth ? `${measureWidth}px` : '100%';
    ghost.style.visibility = 'hidden';
    ghost.style.pointerEvents = 'none';
    ghost.style.whiteSpace = 'pre-wrap';
    const cs = window.getComputedStyle(containerRef.current);
    ghost.style.fontFamily = cs.fontFamily;
    ghost.style.fontSize = cs.fontSize;
    ghost.style.fontWeight = cs.fontWeight;
    ghost.style.fontStyle = cs.fontStyle;
    ghost.style.letterSpacing = cs.letterSpacing;
    ghost.style.textTransform = cs.textTransform;

    const tokens = text.split(/(\s+)/);
    tokens.forEach((tok, i) => {
      const span = document.createElement('span');
      span.textContent = tok;
      span.dataset.i = String(i);
      ghost!.appendChild(span);
    });
    containerRef.current.appendChild(ghost);
    const spans = Array.from(ghost.children) as HTMLSpanElement[];
    if (spans.length === 0) return;
    const detected: string[] = [];
    let current: string[] = [spans[0].textContent || ''];
    for (let i = 1; i < spans.length; i++) {
      const prev = spans[i - 1];
      const curr = spans[i];
      if (curr.offsetTop !== prev.offsetTop) {
        detected.push(current.join(''));
        current = [];
      }
      current.push(curr.textContent || '');
    }
    detected.push(current.join(''));
    setLines(detected);
  };

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    measureLines();
  }, [text]);

  const resizeTimerRef = useRef<number | null>(null);
  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current || !(window as any).ResizeObserver) return;
    let observed: HTMLElement | null = containerRef.current.parentElement;
    while (observed && observed.getBoundingClientRect().width === 0) observed = observed.parentElement;
    if (!observed) observed = containerRef.current;
    const debounced = () => {
      if (resizeTimerRef.current !== null) clearTimeout(resizeTimerRef.current);
      resizeTimerRef.current = window.setTimeout(() => {
        measureLines();
        resizeTimerRef.current = null;
      }, 100);
    };
    const ro = new ResizeObserver(debounced);
    ro.observe(observed);
    return () => {
      ro.disconnect();
      if (resizeTimerRef.current !== null) clearTimeout(resizeTimerRef.current);
    };
  }, []);

  const [displayed, setDisplayed] = useState<string[]>([]);
  const [complete, setComplete] = useState(false);
  const [typingStarted, setTypingStarted] = useState(false);
  const [highlightVisible, setHighlightVisible] = useState(false);
  const highlightRef = useRef<HTMLSpanElement | null>(null);
  const [highlightStartIdx, highlightEndIdx] = useMemo(() => {
    const plain = text.replace(/\n/g, ' ');
    const start = highlightText ? plain.indexOf(highlightText) : -1;
    const end = start !== -1 ? start + highlightText.length : -1;
    return [start, end];
  }, [text, highlightText]);

  useEffect(() => {
    if (!lines) return;
    setTypingStarted(false);
    setDisplayed(Array.from({ length: lines.length }, () => ''));
    setHighlightVisible(false);
    highlightRef.current = null;

    const timerIds: number[] = [];
    const schedule = (fn: () => void, delay: number) => {
      const id = window.setTimeout(fn, delay);
      timerIds.push(id);
    };
    let globalIndex = 0;
    let lineIndex = 0;
    let charIndexInLine = 0;
    const totalChars = lines.reduce((acc, l) => acc + l.length, 0);

    const typeNext = () => {
      if (globalIndex >= totalChars) {
        setComplete(true);
        onComplete?.();
        return;
      }
      const currentLine = lines[lineIndex];
      const nextChar = currentLine[charIndexInLine];
      setDisplayed((prev) => {
        const copy = [...prev];
        copy[lineIndex] = currentLine.substring(0, charIndexInLine + 1);
        return copy;
      });
      if (
        highlightText &&
        !highlightVisible &&
        highlightStartIdx !== -1 &&
        globalIndex >= highlightStartIdx + highlightText.length - 1
      ) {
        setHighlightVisible(true);
      }
      globalIndex++;
      charIndexInLine++;
      if (charIndexInLine >= currentLine.length) {
        lineIndex++;
        charIndexInLine = 0;
      }
      let nextDelay = charDelay;
      if (nextChar === '.') nextDelay *= 6;
      else if (nextChar === ',') nextDelay *= 4;
      else if (nextChar === ' ') nextDelay *= 1.5;
      if (globalIndex / totalChars > 0.85) nextDelay *= 1.15;
      nextDelay *= 0.9 + Math.random() * 0.2;
      schedule(typeNext, nextDelay);
    };
    const cursorLeadTime = 100;
    const cursorDelay = Math.max(0, startDelay - cursorLeadTime);
    schedule(() => setTypingStarted(true), cursorDelay);
    schedule(() => {
      setTypingStarted(true);
      typeNext();
    }, startDelay + charDelay);
    return () => timerIds.forEach((id) => clearTimeout(id));
  }, [lines]);

  if (!lines) {
    return (
      <div ref={containerRef} className={cn('typing-animation inline-block', className)} style={{ visibility: 'hidden' }}>
        {text}
      </div>
    );
  }

  const captureHighlightRef = (el: HTMLSpanElement | null) => {
    if (el && !highlightRef.current) highlightRef.current = el;
  };

  return (
    <div ref={containerRef} className={cn('typing-animation relative flex flex-col items-center', className)}>
      {lines.map((fullLine, i) => {
        const shown = displayed[i] ?? '';
        const globalLineStart = lines.slice(0, i).reduce((s, l) => s + l.length, 0);
        const globalLineEnd = globalLineStart + fullLine.length;
        let rendered: React.ReactNode = shown;
        if (
          highlightText &&
          highlightVisible &&
          highlightStartIdx !== -1 &&
          globalLineEnd > highlightStartIdx &&
          globalLineStart < highlightEndIdx
        ) {
          const sliceStart = Math.max(0, highlightStartIdx - globalLineStart);
          const sliceEnd = Math.min(fullLine.length, highlightEndIdx - globalLineStart);
          const before = shown.slice(0, sliceStart);
          const highlightPart = shown.slice(sliceStart, sliceEnd);
          const after = shown.slice(sliceEnd);
          rendered = (
            <>
              {before}
              {highlightPart && (
                <span ref={captureHighlightRef} className={highlightClass} style={{ display: 'inline' }}>
                  {highlightPart}
                </span>
              )}
              {after}
            </>
          );
        }
        const isActiveLine = i === displayed.findIndex((l, idx) => l.length < (lines[idx]?.length || 0));
        return (
          <span key={i} className="relative inline-block whitespace-pre-wrap" style={{ width: 'max-content' }}>
            <span aria-hidden="true" className="invisible select-none pointer-events-none">
              {fullLine}
            </span>
            <span className="absolute inset-0 text-left">
              {rendered}
              {isActiveLine && showCursor && !complete && typingStarted && <span className="typing-cursor" aria-hidden="true" />}
            </span>
          </span>
        );
      })}
      {!disableParticleEffect && highlightVisible && highlightRef.current && (
        <ParticleEffect targetRef={highlightRef} particleCount={70} delay={0} duration={2500} />)
      }
    </div>
  );
};

export default MultiLineTypingAnimation;
 
