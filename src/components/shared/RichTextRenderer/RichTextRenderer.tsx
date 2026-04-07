"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { JSONContent } from "@tiptap/react";
import styles from "./RichTextRenderer.module.css";

interface RichTextRendererProps {
  content: JSONContent;
}

export default function RichTextRenderer({ content }: RichTextRendererProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
    ],
    content,
    editable: false,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "tiptap-readonly",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className={styles.content}>
      <EditorContent editor={editor} />
    </div>
  );
}
