import React, { useEffect, useRef, useState } from 'react';
import { useToggle, useWindowSize } from 'react-use';
import styled from 'styled-components';
import { Editor, Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import MediaLib from './MediaLib';

const BREAKPOINT = 1440;

function preferredPreviewStyle(width) {
  return width >= BREAKPOINT ? 'vertical' : 'tab';
}

export default function TuiEditor({
  name,
  value,
  onChange,
  disabled,
  onFlyout,
  height = '600px',
}) {
  const editorRef = useRef(null);
  const [showMediaLib, toggleMediaLib] = useToggle(false);
  const { width } = useWindowSize();
  const [previewStyle, setPreviewStyle] = useState(
    preferredPreviewStyle(width)
  );

  const isFlyout = !onFlyout;

  useEffect(() => {
    if (isFlyout) {
      editorRef.current?.getInstance().focus();
    }
  }, [isFlyout]);

  useEffect(() => {
    setPreviewStyle(preferredPreviewStyle(width));
  }, [width]);

  function toggleStyle() {
    setPreviewStyle((style) => (style === 'vertical' ? 'tab' : 'vertical'));
  }
  function handleDocChange() {
    const instance = editorRef.current?.getInstance();
    if (!instance) {
      console.error('editor instance not found');
      return;
    }
    const md = instance.getMarkdown();
    onChange({ target: { name, value: md } });
  }

  return !disabled ? (
    <div>
      <Toolbar>
        <ToolbarButton type="button" onClick={toggleStyle}>
          {previewStyle === 'vertical' ? 'Tab mode' : 'Side-by-side'}
        </ToolbarButton>
        <ToolbarButton type="button" onClick={toggleMediaLib}>
          MediaLib
        </ToolbarButton>
        {onFlyout && (
          <ToolbarButton type="button" onClick={onFlyout}>
            Expand
          </ToolbarButton>
        )}
      </Toolbar>
      <Editor
        ref={editorRef}
        usageStatistics={false}
        initialEditType="markdown"
        initialValue={value}
        height={height}
        previewStyle={previewStyle}
        onChange={handleDocChange}
      />
      <MediaLib
        isOpen={showMediaLib}
        onClose={() => toggleMediaLib(false)}
        editor={editorRef.current?.getInstance()}
      />
    </div>
  ) : (
    <Viewer initialValue={value} />
  );
}

const Toolbar = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0.5rem 0;
`;

const ToolbarButton = styled.button`
  background: #f5f5f5;
  font-size: 0.75rem;
  padding: 0.5em 1em;
  border: 1px solid ccc;
`;
