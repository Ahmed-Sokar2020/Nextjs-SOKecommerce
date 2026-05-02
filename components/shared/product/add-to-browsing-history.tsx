"use client";

import useBrowsingHistoryStore from "@/store/use-browsing-history-store";
import { useEffect } from "react";

export default function AddToBrowsingHistory({
  id,
  category,
}: {
  id: string;
  category: string;
}) {
  const { addItem } = useBrowsingHistoryStore();

  useEffect(() => {
    addItem({ id, category });
  }, [id, category, addItem]);
  return null;
}
