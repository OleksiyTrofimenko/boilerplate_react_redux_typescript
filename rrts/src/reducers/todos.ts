import { Todo, Action, ActionTypes } from '../actions';

const todos = (state: Todo[] = [], action: Action) => {
  switch (action.type) {
    case ActionTypes.fetchTodos:
      return action.payload;

    case ActionTypes.deleteTodo:
      return state.filter((todo) => todo.id !== action.payload);

    default:
      return state;
  }
};

export default todos;
