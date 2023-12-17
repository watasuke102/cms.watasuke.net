// cms.watasuke.net
// CopyRight (c) 2023 watasuke
//
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import {AllTagsQuery} from '@cms-utils/graphql';
import {ImmerReducer} from 'use-immer';

export type Action =
  | {
      type: 'body/update' | 'title/update' | 'tag/remove';
      data: string;
    }
  | {
      type: 'tag/add';
      add_tags: string[];
    }
  | {
      type: 'alltag/update';
      all_tags: AllTagsQuery['allTags'];
    };

export type StateType = {
  title: string;
  body: string;
  tags: string[];
  all_tags: AllTagsQuery['allTags'];
};

type ReducerType = ImmerReducer<StateType, Action>;

export const article_reducer: ReducerType = (current: StateType, action: Action) => {
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
      current.tags = Array.from(new Set(current.tags.concat(action.add_tags)));
      break;
    }
    case 'tag/remove': {
      current.tags = current.tags.filter(tag => tag !== action.data);
      break;
    }
    case 'alltag/update': {
      current.all_tags = action.all_tags;
      break;
    }
    default:
      throw Error('invalid type');
  }
  return current;
};
