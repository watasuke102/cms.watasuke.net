// cms.watasuke.net
// CopyRight (c) 2023-2024 watasuke
//
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import axios from 'axios';
import {apiUrl} from '@config';

export async function upload_new_image(
  slug: string,
  file_name: string,
  file_type: string,
  buffer: ArrayBuffer,
): Promise<undefined> {
  axios.post(`${apiUrl}/img/${slug}/${file_name}`, buffer, {
    headers: {
      'Content-Type': file_type,
    },
  });
}
