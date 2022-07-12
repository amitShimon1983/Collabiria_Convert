import React, { useEffect, useState } from 'react';
import { Meta, Story } from '@storybook/react';
import RichTextEditor from './RichTextEditor';
import './RichTextEditor.module.css';

const editorConfiguration = {
  licenseKey: '3JRca7IB0Z5mF8F2LYqIUkOUdc3dxuBwvYYtzhDV3KAGprAL0sn4AedHOg==',
};

export const Template: Story<any> = (args: any) => {
  const [myEditor, setMyEditor] = useState<any>();
  useEffect(() => {
    handleEditMode();
  }, [args.isReadOnly, myEditor]);
  const handleEditMode = () => {
    if (myEditor) {
      const toolbarElement = myEditor.ui.view.toolbar.element;
      if (args.isReadOnly) {
        toolbarElement.style.display = 'none';
      } else {
        toolbarElement.style.display = 'flex';
      }
    }
  };
  return (
    <div className="ck_editor_story" data-theme={args.theme} style={{ width: '50%', height: '50%' }}>
      <h2>Using Rich Text Editor build in React</h2>
      <RichTextEditor
        isReadOnly={args.isReadOnly}
        editorConfiguration={editorConfiguration}
        data={args.data}
        onReadyHandler={editor => {
          setMyEditor(editor);
        }}
        onChangeHandler={(event, editor) => {
          const data = editor.getData();
          const toolbarElement = editor.ui.view.toolbar.element;
          if (args.isReadOnly) {
            toolbarElement.style.display = 'none';
          } else {
            toolbarElement.style.display = 'flex';
          }
        }}
        onBlurHandler={(event, editor) => {
          console.log('Blur.', editor);
        }}
        onFocusHandler={(event, editor) => {
          console.log('Focus.', editor);
        }}
      />
    </div>
  );
};

export default {
  title: 'Components/RichTextEditor',
  parameters: {
    layout: 'padded',
    controls: { include: ['isReadOnly', 'theme', 'data'] },
  },
  argTypes: {
    isReadOnly: {
      defaultValue: false,
      control: { type: 'inline-radio', options: [false, true] },
    },
    theme: {
      defaultValue: 'dark',
      control: { type: 'inline-radio', options: ['dark', 'light'] },
    },
    data: {
      defaultValue: '<p>Hello from RichTextEditor!</p>',
      control: { type: 'text' },
    },
  },
} as Meta;
