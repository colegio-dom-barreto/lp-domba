declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...payload });
  window.gtag?.("event", eventName, payload);
}

export interface WebVitalsMetric {
  id: string;
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  label?: string;
}

/**
 * Envia métricas de Web Vitals para o dataLayer, para o GTM configurar
 * uma tag/trigger própria (não depende de um GA4 Measurement ID direto).
 */
export function reportWebVitals(metric: WebVitalsMetric) {
  if (metric.label !== "web-vital") return;
  const value = Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value);
  trackEvent("web_vitals", {
    metric_name: metric.name,
    metric_id: metric.id,
    metric_value: value,
    metric_rating: metric.rating,
    metric_delta: metric.delta,
  });
}
