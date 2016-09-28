//Component ------------------------------------- BookLibrary
var BookLibrary = React.createClass({
  loadBooksFromServer: function() {

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },


  handleBookSubmit: function(comment) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  getInitialState: function() {
    console.log("executing BookLibrary:getInitialState");
    return {data: [{id: "0", author: "Authorname", text: "Book"}]};
  },
  componentDidMount: function() {
    console.log("executing BookLibrary:componentDidMount");
    this.loadBooksFromServer();
  },
  render: function() {
    console.log("BookLibrary:render");
    return (
      <div>
        <BookList data={this.state.data}/>

        <BookForm onCommentSubmit={this.handleBookSubmit} />
      </div>
    );
  }
});


// Component ------------------------------------- BookList
var BookList = React.createClass({
  render: function() {
    /*
    this.props.data has an object array.
    We need to iterate thought easch element of the array and create a <Comment > tag for each object.
    Javascript's map() method creates a new array with the results of calling a function for every array element.
    The map() method calls the provided function once for each element in an array, in order.
    */
    var commentHtmlElementArray = this.props.data.map(function(anObject) {
          return (
            <Book
              author={anObject.author}
              key={anObject.id}
              book={anObject.text}
              >
            </Book>
          );
        });
    return (
      <div className="well">
      <h1>Library</h1>
      <table className="table table-striped table-condensed">
        <thead className="success">
          <tr>
          <td>Author</td>
          <td>Book</td>
          </tr>
        </thead>
            {commentHtmlElementArray}
      </table>
      </div>
    );
  }
});

// Component ------------------------------------- Book
var Book = React.createClass({

  render: function() {
    return (
      <tbody>
      <tr>
        <td>{this.props.author}</td>
        <td>{this.props.book}</td>
      </tr>
      </tbody>
    );
  }
});

//Component ------------------------------------- CommentForm
var BookForm = React.createClass({
  getInitialState: function() {
    return {author: '', text: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.setState({author: '', text: ''});
  },
  render: function() {
    return (
      <form className="well" onSubmit={this.handleSubmit}>
        <h4>Add a book to library</h4>
        <input
          type="text" className="form-control"
          placeholder="Author"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text" className="form-control"
          placeholder="Book name"
          value={this.state.text}
          onChange={this.handleTextChange}
        />
      <input type="submit" value="Add" className="form-control btn btn-warning"/>
      </form>
    );
  }
});

ReactDOM.render(
  <BookLibrary url="/serverdata" pollInterval={3000} />,
  document.getElementById('content')
);
