import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import classNames from 'classnames';

interface Props {
  className?: string;
}
export default function CommentEditor({ className }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
  });
  return (
    <EditorContent
      editor={editor}
      className={classNames('comment-editor', className)}
    />
  );
}
