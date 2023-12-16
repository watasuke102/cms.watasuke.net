// cms.watasuke.net
// CopyRight (c) 2023 watasuke
//
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import React from 'react';
import {css} from './ImageUploader.css';
import * as Form from '@radix-ui/react-form';
import {useDropzone, FileWithPath} from 'react-dropzone';
import {Button} from '@cms-common/Button';
import {upload_new_image} from '@cms-utils/api';

type Props = {
  slug: string;
  on_complete: (file_name: string) => void;
};

type ImageInfo = {
  url: string;
  type: string;
  buffer: ArrayBuffer;
};

export function ImageUploader(props: Props): JSX.Element {
  const [image_name, set_image_name] = React.useState('image.jpg');
  const [image_info, set_image_info] = React.useState<ImageInfo | undefined>();

  const handle_drop = React.useCallback((files: FileWithPath[]) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        set_image_name(file.name);
        set_image_info({
          url: URL.createObjectURL(new Blob([reader.result])),
          type: file.type,
          buffer: reader.result,
        });
      }
    };
    reader.readAsArrayBuffer(file);
  }, []);

  const upload = React.useCallback(async () => {
    if (!image_info) {
      return;
    }
    await upload_new_image(props.slug, image_name, image_info.type, image_info.buffer);
    props.on_complete(image_name);
  }, [image_name, image_info]);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop: handle_drop,
    multiple: false,
    accept: {
      'image/png': [],
      'image/jpeg': [],
    },
  });

  if (image_info) {
    return (
      <Form.Root onSubmit={e => e.preventDefault()}>
        <Form.Field name='slug' className={css.image_info_editor}>
          <img className={css.img} src={image_info.url} />
          <Form.Label className={css.label}>Slug</Form.Label>
          <Form.Message match='valueMissing'>Cannot be empty</Form.Message>
          <Form.Control asChild>
            <input
              className={css.input}
              type='text'
              value={image_name}
              onChange={e => set_image_name(e.target.value)}
              required
              autoFocus
            />
          </Form.Control>
        </Form.Field>
        <div className={css.buttons}>
          <Form.Submit asChild>
            <Button type='contained' text='Upload' aria_label='upload' on_click={upload} />
          </Form.Submit>
          <Button
            type='text'
            text='Discard and start over'
            aria_label='discard and start over'
            on_click={() => set_image_info(undefined)}
          />
        </div>
      </Form.Root>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`${css.upload_area} ${isDragActive ? css.dropping_file : ''}`}
      onPaste={e => {
        if (!e.clipboardData.files[0]) {
          return;
        }
        e.clipboardData.files[0].arrayBuffer().then(buf =>
          set_image_info({
            url: URL.createObjectURL(new Blob([buf])),
            type: 'image/jpeg',
            buffer: buf,
          }),
        );
      }}
    >
      <input {...getInputProps()} />
      <span className={css.dnd_prompt}>D&D here</span>
      <span> or click here to browse files</span>
    </div>
  );
}
