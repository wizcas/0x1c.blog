import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  Editor as TuiEditor,
  Viewer as TuiViewer,
} from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { useFullscreen, useToggle, useWindowSize } from 'react-use';

const BREAKPOINT = 1440;

function preferredPreviewStyle(width) {
  return width >= BREAKPOINT ? 'vertical' : 'tab';
}

export default function Editor({
  onChange,
  name,
  value,
  required,
  intlLabel,
  labelAction,
  disabled,
}) {
  const wrapperRef = useRef(null);
  const editorRef = useRef(null);
  const { width } = useWindowSize();
  const [previewStyle, setPreviewStyle] = useState(
    preferredPreviewStyle(width)
  );
  const [showFullscreen, toggleFullscreen] = useToggle(false);
  const isFullscreen = useFullscreen(wrapperRef, showFullscreen, {
    onClose: () => toggleFullscreen(false),
  });

  useEffect(() => {
    setPreviewStyle(preferredPreviewStyle(width));
  }, [width]);

  function toggleStyle() {
    setPreviewStyle((style) => (style === 'vertical' ? 'tab' : 'vertical'));
  }
  function onEditorChange() {
    const instance = editorRef.current?.getInstance();
    if (!instance) {
      console.error('editor instance not found');
      return;
    }
    const md = instance.getMarkdown();
    onChange({ target: { name, value: md } });
  }

  return (
    <div>
      <Header>
        <FieldLabel>
          {intlLabel.defaultMessage}
          {required && <Required>*</Required>}
        </FieldLabel>
        {labelAction}
      </Header>
      {!disabled ? (
        <div ref={wrapperRef}>
          <Toolbar>
            <ToolbarButton onClick={toggleStyle}>
              {previewStyle === 'vertical' ? 'Tab mode' : 'Side-by-side'}
            </ToolbarButton>
            <ToolbarButton onClick={toggleFullscreen}>
              {isFullscreen ? 'Normal' : 'Full screen'}
            </ToolbarButton>
          </Toolbar>
          <TuiEditor
            ref={editorRef}
            usageStatistics={false}
            initialEditType="markdown"
            initialValue={value}
            height="600px"
            previewStyle={previewStyle}
            onChange={onEditorChange}
          />
        </div>
      ) : (
        <TuiViewer initialValue={value} />
      )}
    </div>
  );
}

const FieldLabel = styled.p`
  font-weight: 600;
  color: #32324d;
  font-size: 0.75rem;
  line-height: 1.33;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  & > *:not(:first-child) {
    margin-left: 0.25rem;
  }
`;
const Required = styled.span`
  color: #d02b20;
  font-size: 0.875rem;
`;

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
