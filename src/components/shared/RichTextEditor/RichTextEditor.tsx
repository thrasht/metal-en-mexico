"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { type JSONContent } from "@tiptap/react";
import styles from "./RichTextEditor.module.css";

interface ToolbarProps {
  editor: Editor;
}

function Toolbar({ editor }: ToolbarProps) {
  const btn = (
    label: string,
    action: () => void,
    isActive: boolean = false
  ) => (
    <button
      type="button"
      onClick={action}
      className={`${styles.toolbarButton} ${isActive ? styles.active : ""}`}
      title={label}
    >
      {label}
    </button>
  );

  return (
    <div className={styles.toolbar}>
      {btn("B", () => editor.chain().focus().toggleBold().run(), editor.isActive("bold"))}
      {btn("I", () => editor.chain().focus().toggleItalic().run(), editor.isActive("italic"))}
      {btn("S", () => editor.chain().focus().toggleStrike().run(), editor.isActive("strike"))}
      <div className={styles.toolbarDivider} />
      {btn("H2", () => editor.chain().focus().toggleHeading({ level: 2 }).run(), editor.isActive("heading", { level: 2 }))}
      {btn("H3", () => editor.chain().focus().toggleHeading({ level: 3 }).run(), editor.isActive("heading", { level: 3 }))}
      <div className={styles.toolbarDivider} />
      {btn("•", () => editor.chain().focus().toggleBulletList().run(), editor.isActive("bulletList"))}
      {btn("1.", () => editor.chain().focus().toggleOrderedList().run(), editor.isActive("orderedList"))}
      <div className={styles.toolbarDivider} />
      {btn("❝", () => editor.chain().focus().toggleBlockquote().run(), editor.isActive("blockquote"))}
      {btn("—", () => editor.chain().focus().setHorizontalRule().run())}
    </div>
  );
}

interface RichTextEditorProps {
  content?: JSONContent;
  onChange?: (json: JSONContent) => void;
  placeholder?: string;
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder = "Escribe tu reseña...",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: content ?? "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class: "tiptap",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className={styles.editorWrapper}>
      <Toolbar editor={editor} />
      <div className={styles.editor}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
