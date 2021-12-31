import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import Typography from '@tiptap/extension-typography';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import classNames from 'classnames';
import { useRef, useState } from 'react';
import { Form } from 'remix';
import invariant from 'tiny-invariant';
import TurndownService from 'turndown';

import { ReaderFormData } from '~/services/blog/models';

import type { DataFunctionArgs } from '@remix-run/server-runtime';

interface Props {
  className?: string;
}

export interface CommentSubmitData {
  articleId: string;
  reader: ReaderFormData;
  parentId?: string;
  content: string;
}
export async function getCommentData({
  request,
  params,
}: DataFunctionArgs): Promise<CommentSubmitData> {
  const formData = await request.formData();
  const errors: Record<string, string> = {};
  const email = formData.get('email')?.toString();
  const name = formData.get('name')?.toString();
  const website = formData.get('website')?.toString();
  const content = formData.get('content')?.toString();
  if (!email) {
    errors.email = 'required';
  }
  if (!name) {
    errors.name = 'required';
  }
  if (!content) {
    errors.content = 'required';
  }
  const articleId = params.id;
  invariant(articleId, 'article id is required');
  invariant(name, 'name is required');
  invariant(email, 'email is required');
  invariant(content, 'content is required');

  return {
    articleId,
    content,
    reader: {
      name,
      email,
      website,
    },
  };
}

export default function CommentEditor({ className }: Props) {
  const [comment, setComment] = useState<string>('');
  const turndownService = useRef(
    new TurndownService({
      codeBlockStyle: 'fenced',
    })
  );
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: '来聊聊你的想法吧~',
      }),
      Highlight,
      Typography,
    ],
    onUpdate({ editor }) {
      const markdown = turndownService.current.turndown(editor.getHTML());
      setComment(markdown);
    },
  });
  return (
    <Form
      method="post"
      className={classNames(
        'p-4 grid grid-cols-1 lg:grid-cols-3 gap-2',
        className
      )}
    >
      <input
        type="email"
        placeholder="邮箱 (仅用于识别身份)*"
        name="email"
        required
      />
      <input type="text" placeholder="名字*" name="name" required />
      <input type="text" placeholder="个人网站" name="website" />
      <input type="hidden" name="content" value={comment} />
      <EditorContent
        editor={editor}
        className={classNames('comment-editor not-prose', 'lg:col-span-3')}
      />
      <button
        type="submit"
        className={classNames(
          'lg:col-start-3 bg-primary-500 rounded-md',
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
