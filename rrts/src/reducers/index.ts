import { combineReducers } from 'redux';
import { Todo } from '../actions';
import todos from './todos';

export interface StoreState {
  todos: Todo[];
}

const reducers = combineReducers<StoreState>({
  todos,
});

export default reducers;
