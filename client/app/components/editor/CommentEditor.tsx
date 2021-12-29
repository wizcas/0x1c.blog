import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import Typography from '@tiptap/extension-typography';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import classNames from 'classnames';

interface Props {
  className?: string;
}
export default function CommentEditor({ className }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: '来聊聊你的想法吧~',
      }),
      Highlight,
      Typography,
    ],
  });
  return (
    <EditorContent
      editor={editor}
      className={classNames('comment-editor', className)}
    />
  );
}
