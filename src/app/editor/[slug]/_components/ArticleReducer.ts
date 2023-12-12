// cms.watasuke.net
// CopyRight (c) 2023 watasuke
//
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import {ImmerReducer} from 'use-immer';

export type Action = {
  type: 'body/update' | 'title/update' | 'tag/add' | 'tag/remove';
  data: string;
};

export type StateType = {
  title: string;
  body: string;
  tags: string[];
};

export const article_reducer: ImmerReducer<StateType, Action> = (current: StateType, action: Action) => {
  switch (action.type) {
    case 'body/update': {
      current.body = action.data;
      break;
    }
    case 'title/update': {
      current.title = action.data;
      break;
    }
    case 'tag/add': {
      current.tags.push(action.data);
      break;
    }
    case 'tag/remove': {
      current.tags = current.tags.filter(tag => tag !== action.data);
      break;
    }
    default:
      throw Error('invalid type');
  }
  return current;
};
