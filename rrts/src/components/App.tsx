import React from 'react';
import { connect } from 'react-redux';
import { fetchTodos, Todo, deleteTodo } from '../actions';
import { StoreState } from '../reducers';

interface AppProps {
  todos: Todo[];
  fetchTodos: Function; // Because that action return thunk action: (fetchTodos => action => action)
  deleteTodo: (id: number) => void;
}

interface AppState {
  fetching: boolean;
}

class App extends React.Component<AppProps, AppState> {
  state = {
    fetching: false,
  };

  componentDidUpdate(prevProps: AppProps): void {
    if (!prevProps.todos.length && this.props.todos.length) {
      this.setState({ fetching: false });
    }
  }

  onButtonClick = (): void => {
    this.props.fetchTodos();
    this.setState({
      fetching: true,
    });
  };

  onTodoClick = (id: number): void => {
    this.props.deleteTodo(id);
  };

  renderList(): JSX.Element[] {
    return this.props.todos.map((todo: Todo) => {
      return (
        <div onClick={(): void => this.onTodoClick(todo.id)} key={todo.id}>
          {todo.title}
        </div>
      );
    });
  }

  render(): JSX.Element {
    return (
      <div>
        <button onClick={this.onButtonClick}>Fetch todos</button>
        {this.state.fetching ? 'Loading...' : null}
        {this.renderList()}
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState): { todos: Todo[] } => ({
  todos: state.todos,
});

export default connect(mapStateToProps, { fetchTodos, deleteTodo })(App);
