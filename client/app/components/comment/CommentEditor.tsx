import Tippy from '@tippyjs/react';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import Typography from '@tiptap/extension-typography';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import classNames from 'classnames';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { CornerUpLeft, Trash2 } from 'react-feather';
import { useDebounce } from 'react-use';
import { Form, useActionData, useLoaderData, useSubmit } from 'remix';
import invariant from 'tiny-invariant';
import TurndownService from 'turndown';

import { i } from '~/helpers/i18n';
import { CommentFormData } from '~/services/blog/comment';
import type { Comment } from '~/services/blog/models';
import { findReader } from '~/services/blog/user';

import RequireMark from '../form/RequrieMark';

import type { DataFunctionArgs } from '@remix-run/server-runtime';

export async function getReaderInfo(request: DataFunctionArgs['request']) {
  const email = new URL(request.url).searchParams.get('email');
  const reader = email ? await findReader(email) : null;
  return {
    reader: { ...reader, email },
  };
}

export async function getCommentFormData({
  request,
  params,
}: DataFunctionArgs): Promise<{
  data: CommentFormData | null;
  errors?: Record<string, string>;
}> {
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
    errors.markdown = 'required';
  }
  if (Object.values(errors).filter(Boolean).length > 0) {
    return { errors, data: null };
  }
  const articleId = params.id;
  invariant(articleId, 'article id is required');
  invariant(name, 'name is required');
  invariant(email, 'email is required');
  invariant(markdown, 'markdown is required');
  invariant(text, 'text is required');

  return {
    data: {
      articleId,
      markdown,
      text,
      reader: {
        name,
        email,
        website,
      },
      parentId,
    },
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

  // Auto detect the commenting reader by email
  // If a reader is found, auto populate the other form fields
  const { reader } = useLoaderData();
  const readerEmail = reader?.email || '';
  const prevReaderEmail = useRef<string>('');
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [website, setWebsite] = useState<string>('');

  useEffect(() => {
    if (readerEmail !== prevReaderEmail.current) {
      prevReaderEmail.current = readerEmail;
      setEmail(readerEmail);
      setName(reader?.name || '');
      setWebsite(reader?.website || '');
    }
  }, [readerEmail]);

  const submit = useSubmit();
  useDebounce(
    () => {
      const trimmed = email.trim();
      localStorage.setItem('readerEmail', trimmed);
      if (!trimmed) return;
      submit(new URLSearchParams({ email: trimmed }));
    },
    500,
    [email, submit]
  );
  const handleEmailInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toString();
    setEmail(value);
  }, []);
  const handleNormalInput = useCallback(
    (fn: (value: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
      fn(e.target.value);
    },
    []
  );

  useEffect(() => {
    const lastEmail = localStorage.getItem('readerEmail') || '';
    setEmail(lastEmail);
  }, []);

  // Handle form errors
  const { commentFormErrors: errors = {} } = useActionData() ?? {};

  return (
    <Form
      method="post"
      className={classNames(
        'p-4 grid grid-cols-1 lg:grid-cols-3 gap-2',
        className
      )}
    >
      <label>
        <span className="text-sm text-gray-300">
          邮箱
          <RequireMark />
        </span>
        <input
          type="email"
          placeholder="仅用于识别身份，不会公开"
          name="email"
          value={email}
          onChange={handleEmailInput}
        />
        {errors.markdown === 'required' && (
          <div className="text-red-600">请输入有效的邮箱</div>
        )}
      </label>
      <label>
        <span className="text-sm text-gray-300">
          名字
          <RequireMark />
        </span>
        <input
          type="text"
          placeholder="希望别人怎么称呼您?"
          name="name"
          value={name}
          onChange={handleNormalInput(setName)}
        />
        {errors.markdown === 'required' && (
          <div className="text-red-600">请输入您的名字</div>
        )}
      </label>
      <label>
        <span className="text-sm text-gray-300">个人网站</span>
        <input
          type="text"
          placeholder="将您的站点分享给其他人"
          name="website"
          value={website}
          onChange={handleNormalInput(setWebsite)}
        />
      </label>
      <input type="hidden" name="markdown" value={content.markdown} />
      <input type="hidden" name="text" value={content.text} />
      <input type="hidden" name="parentId" value={parent?.id ?? ''} />
      <label className="lg:col-span-3">
        <span className="text-sm text-gray-300">评论 (支持 Markdown 语法)</span>
        <EditorContent
          editor={editor}
          className={classNames('comment-editor')}
        />
        {errors.markdown === 'required' && (
          <div className="text-red-600">请输入评论内容</div>
        )}
      </label>
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
