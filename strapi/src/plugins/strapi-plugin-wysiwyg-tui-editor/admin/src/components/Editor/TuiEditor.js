import React, { useEffect, useRef, useState } from 'react';
import { useToggle, useWindowSize } from 'react-use';
import styled from 'styled-components';
import { Editor, Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Button } from '@strapi/design-system/Button';
import SwitchIcon from '@strapi/icons/Layout';
import MediaIcon from '@strapi/icons/PicturePlus';
import ExpandIcon from '@strapi/icons/Expand';
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
        <Button
          type="button"
          onClick={toggleStyle}
          startIcon={<SwitchIcon />}
          variant="tertiary"
        >
          {previewStyle === 'vertical' ? 'Tabbed preview' : 'Sided preview'}
        </Button>
        <Button
          type="button"
          startIcon={<MediaIcon />}
          onClick={toggleMediaLib}
          variant="tertiary"
        >
          Add media
        </Button>
        {onFlyout && (
          <Button
            type="button"
            onClick={onFlyout}
            startIcon={<ExpandIcon />}
            variant="tertiary"
          >
            Expand
          </Button>
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
  & > *:not(:first-child) {
    margin-left: 0.25rem;
  }
`;
