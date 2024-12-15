'use client';
import { useState, useLayoutEffect, useCallback, useEffect } from 'react';

interface AdaptiveLayoutOptions {
  designWidth?: number;
  designHeight?: number;
  minWidth?: number;
  maxWidth?: number;
  basePixelSize?: number;
  minFontSize?: number;
  debounceDelay?: number;
}

export function useAdaptiveLayout({
  designWidth = 1920,
  designHeight = 919,
  minWidth = 320,
  maxWidth = 2560,
  basePixelSize = 16,
  minFontSize = 12,
  debounceDelay = 250,
}: AdaptiveLayoutOptions = {}) {
  const [scale, setScale] = useState<number>(1);
  const [isInitialized, setIsInitialized] = useState(false);

  const calculateScale = useCallback(() => {
    if (typeof window === 'undefined') return 1;

    const width = Math.min(Math.max(window.innerWidth, minWidth), maxWidth);
    const height = window.innerHeight;

    const widthScale = width / designWidth;
    const heightScale = height / designHeight;

    // 使用较小的缩放比例以确保内容完全适应屏幕
    return Math.min(widthScale, heightScale);
  }, [designWidth, designHeight, minWidth, maxWidth]);

  const updateLayout = useCallback(() => {
    const newScale = calculateScale();
    if (typeof document !== 'undefined') {
      const html = document.documentElement;
      const calculatedFontSize = basePixelSize * newScale;
      const finalFontSize = Math.max(calculatedFontSize, minFontSize);
      html.style.fontSize = `${finalFontSize}px`;
      html.style.setProperty('--adaptive-font-size', `${finalFontSize}px`);
      html.style.setProperty('--adaptive-scale', String(newScale));
      html.style.height = '100%';
      html.style.overflow = 'hidden';
      document.body.style.height = '100%';
      document.body.style.overflow = 'hidden';
    }
    setScale(newScale);
  }, [calculateScale, basePixelSize, minFontSize]);

  useLayoutEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const debouncedUpdateLayout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateLayout, debounceDelay);
    };

    // Initial update
    updateLayout();
    setIsInitialized(true);

    // Add event listeners
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', debouncedUpdateLayout);
      window.addEventListener('orientationchange', debouncedUpdateLayout);
    }

    // Clean up
    return () => {
      clearTimeout(timeoutId);
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', debouncedUpdateLayout);
        window.removeEventListener('orientationchange', debouncedUpdateLayout);
      }
    };
  }, [updateLayout, debounceDelay]);

  // Prevent FOUC
  useEffect(() => {
    if (typeof document !== 'undefined' && !isInitialized) {
      document.documentElement.style.setProperty('opacity', '0');
    } else if (typeof document !== 'undefined') {
      document.documentElement.style.removeProperty('opacity');
    }
  }, [isInitialized]);

  return scale;
}
