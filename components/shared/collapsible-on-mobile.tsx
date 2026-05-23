"use client";

import useDeviceType from "@/hooks/use-device-type";
import React, { useEffect, useState, useTransition } from "react";
import { Button } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

export default function CollapsibleOnMobile({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const deviceType = useDeviceType();
  const [isPending, startTransition] = useTransition();

  const [open, setOpen] = useState(true);

  useEffect(() => {
    // 🧠 الحل: جدولة تحديث الـ State داخل الانتقالات (Transition)
    // لمنع الـ Cascading Renders المتزامنة وحل خطأ الـ Console تماماً
    startTransition(() => {
      if (deviceType === "mobile") {
        setOpen(false);
      } else if (deviceType === "desktop") {
        setOpen(true);
      }
    });
  }, [deviceType]); // 🚨 قمنا بإزالة searchParams لحماية القائمة من الانغلاق العشوائي عند الفلترة

  // بدلاً من عمل return null يكسر الهيكل، نترك الـ Collapsible يفرش بشكل طبيعي
  const isMobile = deviceType === "mobile";

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      {isMobile && (
        <CollapsibleTrigger asChild>
          <Button
            disabled={isPending} // 🟩 يمنع الضغط المتكرر أثناء تغير الحالة
            onClick={() => setOpen(!open)}
            variant="outline"
            className="w-full my-2 flex items-center justify-between"
          >
            <span>{title}</span>
            <span className="text-xs text-muted-foreground">
              {open ? "▲" : "▼"}
            </span>
          </Button>
        </CollapsibleTrigger>
      )}
      <CollapsibleContent className="transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
