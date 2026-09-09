"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function PageViewTracker({
  eventName,
  utms,
}: {
  eventName: string;
  utms: {
    source: string | string[] | undefined;
    medium: string | string[] | undefined;
    campaign: string | string[] | undefined;
    content: string | string[] | undefined;
  };
}) {
  useEffect(() => {
    trackEvent(eventName, {
      utm_source: utms.source,
      utm_medium: utms.medium,
      utm_campaign: utms.campaign,
      utm_content: utms.content,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
