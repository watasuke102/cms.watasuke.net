// cms.watasuke.net
// CopyRight (c) 2023 watasuke
//
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import React from 'react';
import {useDropzone, FileWithPath} from 'react-dropzone';
import {css} from './ImageUploader.css';
import {upload_new_image} from '@cms-utils/api';

type Props = {
  slug: string;
  on_complete: (file_name: string) => void;
};

export function ImageUploader(props: Props): JSX.Element {
  const handle_drop = React.useCallback((files: FileWithPath[]) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      if (reader.result instanceof ArrayBuffer) {
        await upload_new_image(props.slug, file.name, file.type, reader.result);
        props.on_complete(file.name);
      }
    };
    reader.readAsArrayBuffer(file);
  }, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop: handle_drop,
    multiple: false,
    accept: {
      'image/png': [],
      'image/jpeg': [],
    },
  });

  return (
    <div {...getRootProps()} className={`${css.upload_area} ${isDragActive ? css.dropping_file : ''}`}>
      <input {...getInputProps()} />
      <span className={css.dnd_prompt}>D&D here</span>
      <span> or click here to browse files</span>
    </div>
  );
}
