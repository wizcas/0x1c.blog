import Tippy from '@tippyjs/react';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import Typography from '@tiptap/extension-typography';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import classNames from 'classnames';
import { useRef, useState } from 'react';
import { CornerUpLeft, Trash2 } from 'react-feather';
import { Form } from 'remix';
import invariant from 'tiny-invariant';
import TurndownService from 'turndown';

import { i } from '~/helpers/i18n';
import { CommentFormData } from '~/services/blog/comment';
import { Comment } from '~/services/blog/models';

import type { DataFunctionArgs } from '@remix-run/server-runtime';

export async function getCommentFormData({
  request,
  params,
}: DataFunctionArgs): Promise<CommentFormData> {
  const formData = await request.formData();
  const errors: Record<string, string> = {};
  const email = formData.get('email')?.toString();
  const name = formData.get('name')?.toString();
  const website = formData.get('website')?.toString();
  const markdown = formData.get('markdown')?.toString();
  const text = formData.get('text')?.toString();
  const parentId = formData.get('parentId')?.toString() || undefined;
  if (!email) {
    errors.email = 'required';
  }
  if (!name) {
    errors.name = 'required';
  }
  if (!markdown) {
    errors.content = 'required';
  }
  const articleId = params.id;
  invariant(articleId, 'article id is required');
  invariant(name, 'name is required');
  invariant(email, 'email is required');
  invariant(markdown, 'markdown is required');
  invariant(text, 'text is required');

  return {
    articleId,
    markdown,
    text,
    reader: {
      name,
      email,
      website,
    },
    parentId,
  };
}

interface Props {
  parent?: Comment;
  onClearParent?: () => void;
  className?: string;
}

export default function CommentEditor({
  parent,
  className,
  onClearParent,
}: Props) {
  const [content, setContent] = useState<{
    markdown: string;
    text: string;
  }>({
    markdown: '',
    text: '',
  });
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
      const text = editor.getText().replace(/^\s*\n/gm, '');
      setContent({ markdown, text });
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
      <input type="hidden" name="markdown" value={content.markdown} />
      <input type="hidden" name="text" value={content.text} />
      <input type="hidden" name="parentId" value={parent?.id ?? ''} />
      <EditorContent
        editor={editor}
        className={classNames('comment-editor', 'lg:col-span-3')}
      />
      {parent && (
        <div className={classNames('flex items-center gap-4', 'lg:col-span-2')}>
          <CornerUpLeft className="text-gray-300" />
          <div className="text-sm text-gray-400">
            <span>{i(`将回复`)}</span>
            <span>
              <strong>{parent.reader?.name}</strong>的<br />
            </span>
            <span className="line-clamp-1 italic">{parent.text}</span>
          </div>
          <Tippy content={i(`不再作为回复`)}>
            <button
              type="button"
              className="btn btn-plain"
              onClick={onClearParent}
            >
              <Trash2 />
            </button>
          </Tippy>
        </div>
      )}
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
