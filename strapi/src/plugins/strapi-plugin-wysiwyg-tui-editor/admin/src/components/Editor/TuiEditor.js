import React, { forwardRef, useEffect } from 'react';
import { Editor, Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

export default forwardRef(function TuiEditor(
  { name, value, previewStyle, onChange, disabled, onFlyout, height = '600px' },
  editorRef
) {
  const isFlyout = !onFlyout;

  useEffect(() => {
    if (isFlyout) {
      editorRef.current?.getInstance().focus();
    }
  }, [isFlyout]);

  function handleDocChange() {
    const instance = editorRef?.current?.getInstance();
    if (!instance) {
      console.error('editor instance not found');
      return;
    }
    const md = instance.getMarkdown();
    onChange({ target: { name, value: md } });
  }

  return !disabled ? (
    <div>
      <Editor
        ref={editorRef}
        usageStatistics={false}
        initialEditType="markdown"
        initialValue={value}
        height={height}
        previewStyle={previewStyle}
        onChange={handleDocChange}
      />
    </div>
  ) : (
    <Viewer initialValue={value} />
  );
});
