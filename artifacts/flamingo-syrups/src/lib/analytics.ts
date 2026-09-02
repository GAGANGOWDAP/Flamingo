export function trackAnalyticsEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;

  // Safe analytics event dispatcher for Google Analytics / Tag Manager
  if (typeof (window as unknown as { gtag?: Function }).gtag === 'function') {
    (window as unknown as { gtag: Function }).gtag('event', eventName, params);
  }

  if (Array.isArray((window as unknown as { dataLayer?: unknown[] }).dataLayer)) {
    (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
      event: eventName,
      ...params,
    });
  }
}
