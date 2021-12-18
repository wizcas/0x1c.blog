import React, { useRef, useState } from 'react';
import { Editor as TuiEditor } from '@toast-ui/react-editor';
import styled from 'styled-components';
import '@toast-ui/editor/dist/toastui-editor.css';

export default function Editor({ onChange, name, value }) {
  const [previewStyle, setPreviewStyle] = useState('vertical');
  const editorRef = useRef(null);
  function onExpand() {
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
      <FieldLabel>{name}</FieldLabel>
      <Toolbar>
        <ToolbarButton onClick={onExpand}>
          {previewStyle === 'vertical' ? 'Tab Style' : 'Vertical Style'}
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
  );
}

const FieldLabel = styled.p`
  text-transform: capitalize;
  font-weight: 600;
  color: #32324d;
  font-size: 0.75rem;
  line-height: 1.33;
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
