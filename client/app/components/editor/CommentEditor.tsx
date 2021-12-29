import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import Typography from '@tiptap/extension-typography';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import classNames from 'classnames';
import { Form } from 'remix';

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
    <Form
      method="post"
      className={classNames('p-4 grid grid-cols-3 gap-2', className)}
    >
      <input type="text" placeholder="名字" name="name" />
      <input type="email" placeholder="邮箱" name="email" />
      <input type="text" placeholder="个人网站" name="website" />
      <EditorContent
        editor={editor}
        className={classNames('comment-editor not-prose', 'col-span-3')}
      />
      <button
        type="submit"
        className={classNames(
          'col-start-3 bg-primary-500 rounded-md',
          'transition-all duration-300',
          'shadow-lg hover:shadow-lg shadow-primary-600/10 hover:shadow-primary-600/30',
          'px-4 py-2 mt-1'
        )}
      >
        发表评论
      </button>
    </Form>
  );
}
