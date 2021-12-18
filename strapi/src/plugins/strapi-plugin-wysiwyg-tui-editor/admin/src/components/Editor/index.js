import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import {
  Editor as TuiEditor,
  Viewer as TuiViewer,
} from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

export default function Editor({
  onChange,
  name,
  value,
  required,
  intlLabel,
  labelAction,
  disabled,
}) {
  const [previewStyle, setPreviewStyle] = useState('vertical');
  const editorRef = useRef(null);
  function onToggleStyle() {
    setPreviewStyle((style) => (style === 'vertical' ? 'tab' : 'vertical'));
    console.log(strapi);
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
        <>
          <Toolbar>
            <ToolbarButton onClick={onToggleStyle}>
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
        </>
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
