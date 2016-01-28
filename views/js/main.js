/**
 * Created by Andrius on 28/01/16.
 */


//create list  using todo tags
var TodoList = React.createClass({
  updateTodo: function(data){
    this.props.updateStat(data);
  },
  render: function() {
    var todoNodes = this.props.data.map((todo) => {
      return (
        <Todo item={todo} updateTodo={this.updateTodo} ></Todo>
        );
    });
    return (
      <div className="todoList">
        {todoNodes}
      </div>
    );
  }
});

//From to add todo element
var TodoForm = React.createClass({
  getInitialState: function() {
    return {item: ''};
  },
  handleItemChange: function(e) {
    this.setState({item: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var item = this.state.item.trim();
    if (!item) {
      return;
    }
    this.props.onTodoSubmit({item: item});
    this.setState({item: ''});
  },
  render: function() {
    return (
      <form className="todoForm form-horizontal" onSubmit={this.handleSubmit}>
        <hr/>
        <div className="row">
          <div className="col-xs-10">
            <input
              type="text"
              placeholder="Item"
              value={this.state.item}
              onChange={this.handleItemChange}
              className="form-control"
              />
          </div>
          <div className="col-xs-2">

            <input type="submit" className="btn btn-default" value="Add Item" />
          </div>
        </div>

      </form>
    );
  }
});


//main todo element and react component
var TodoBox = React.createClass({
  //update elements
  updateStat: function(data){
    $.ajax({
      url: '/data',
      dataType: 'json',
      type: data.type,
      data: {id:data.id},
      success: (data) => {
        this.setState({data: data});
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    });
  },
  //load list from server
  loadTodoFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: (data) => {
        this.setState({data: data});
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    });
  },
  //add new element
  handleTodoSubmit: function(item) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: item,
      success: (data) => {
        this.setState({data: data});
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadTodoFromServer();
  },

  render: function() {
    return (
      <div className="todoBox">
        <div className="row">
          <div className="col-xs-offset-3 col-xs-6 well">
            <h1>Todo List</h1>
            <TodoList data={this.state.data} updateStat={this.updateStat} />
            <TodoForm onTodoSubmit={this.handleTodoSubmit} />
          </div>
        </div>
      </div>
    );
  }
});

//map elements in todo
var Todo = React.createClass({
  //delete element
  handleDelete: function(e) {
    e.preventDefault();
    this.props.updateTodo({id:e.target.value,type:"DELETE"});

  },
  //update element
  handleCheck: function(e) {
    e.preventDefault();
    this.props.updateTodo({id:e.target.value,type:"PUT"});

  },
  render: function() {
    return (
      <div className="todo">
        <hr/>
        <div className="row">
          <div className="col-xs-10">
            <h4 className="todoItem" id={(this.props.item.complete) ? 'strike' : ''}>
              {this.props.item.item}
            </h4>
          </div>
          <div className="col-xs-1">
            <button onClick={this.handleDelete} value={this.props.item.id} className="btn btn-default btn-sm">x</button>

          </div>
          <div className="col-xs-1">
            <button onClick={this.handleCheck} value={this.props.item.id} className="btn btn-default btn-sm">v</button>
          </div>
        </div>

      </div>
    );
  }
});

//render react elements
ReactDOM.render(
  <TodoBox url="/data" />,
  document.getElementById('content')
);