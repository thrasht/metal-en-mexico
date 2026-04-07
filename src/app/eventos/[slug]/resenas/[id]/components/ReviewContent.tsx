"use client";

import dynamic from "next/dynamic";
import type { JSONContent } from "@tiptap/react";

const RichTextRenderer = dynamic(
  () => import("@/components/shared/RichTextRenderer/RichTextRenderer"),
  { ssr: false }
);

export default function ReviewContent({ content }: { content: JSONContent }) {
  return <RichTextRenderer content={content} />;
}
