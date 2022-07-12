import React, { FunctionComponent, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from './build/ckeditor';

interface RichTextEditorProps {
  data: string;
  isReadOnly: boolean;
  editorConfiguration: { licenseKey: string };
  onReadyHandler?: (editor: any) => any | void;
  onChangeHandler?: (event: any, editor: any) => any | void;
  onFocusHandler?: (event: any, editor: any) => any | void;
  onBlurHandler?: (event: any, editor: any) => any | void;
}

const RichTextEditor: FunctionComponent<RichTextEditorProps> = ({
  isReadOnly,
  editorConfiguration,
  data,
  onReadyHandler,
  onChangeHandler,
  onFocusHandler,
  onBlurHandler,
}) => {
  const [editorRef, setEditorRef] = useState<any>();

  return (
    <div>
      <CKEditor
        disabled={isReadOnly}
        editor={Editor}
        config={editorConfiguration}
        data={data}
        onReady={(editor: any) => {
          setEditorRef(editor);
          if (typeof onReadyHandler !== 'undefined' && typeof onReadyHandler === 'function') {
            onReadyHandler(editor);
          }
        }}
        onChange={(event: any, editor: any) => {
          if (typeof onChangeHandler !== 'undefined' && typeof onChangeHandler === 'function') {
            onChangeHandler(event, editor);
          }
        }}
        onBlur={(event: any, editor: any) => {
          if (typeof onBlurHandler !== 'undefined' && typeof onBlurHandler === 'function') {
            onBlurHandler(event, editor);
          }
        }}
        onFocus={(event: any, editor: any) => {
          if (typeof onFocusHandler !== 'undefined' && typeof onFocusHandler === 'function') {
            onFocusHandler(event, editor);
          }
        }}
        isReadOnly={true}
      />
    </div>
  );
};

export default RichTextEditor;
