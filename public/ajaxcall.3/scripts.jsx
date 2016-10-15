//var $ = require ('jquery');
//Component ------------------------------------- BookLibrary
/*
class BookLibrary extends React.Component{
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
        data: [{id: "0", author: "Authorname", text: "Book"}]
    };
  }

  loadBooksFromServer() {
    console.log("loadBooksFromServer");
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
  }

  handleBookSubmit(bookData) {
    console.log("handleBookSubmit : " + JSON.stringify(bookData));
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: bookData,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
  }
  

  componentDidMount() {
    console.log("executing BookLibrary:componentDidMount");
    this.loadBooksFromServer();
    //setInterval(this.loadBooksFromServer.bind(this), 1000);
  }

  render() {
    console.log("BookLibrary:render");
    return (
      <div>
        <BookList data={this.state.data}/>

        <BookForm onBookSubmit={this.handleBookSubmit} />
      </div>
    );
  }
}//class BookLibrary
*/
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


  handleBookSubmit: function(bookData) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: bookData,
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

        <BookForm onBookSubmit={this.handleBookSubmit} />
      </div>
    );
  }//render
}); //BookLibrary


// Component ------------------------------------- BookList
class BookList extends React.Component{

  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    /*
    this.props.data has an object array.
    We need to iterate thought easch element of the array and create a <Book > tag for each object.
    Javascript's map() method creates a new array with the results of calling a function for every array element.
    The map() method calls the provided function once for each element in an array, in order.
    */
    var htmlElementArray = this.props.data.map(function(anObject) {
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
            {htmlElementArray}
      </table>
      </div>
    );
  }
}//class BookList

// Component ------------------------------------- Book
class Book extends React.Component{
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <tbody>
      <tr>
        <td>{this.props.author}</td>
        <td>{this.props.book}</td>
      </tr>
      </tbody>
    );
  }
}//class Book

//Component ------------------------------------- BookForm
class BookForm extends React.Component{
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {author: '', text: ''};
  }

  handleAuthorChange(e) {
    this.state.author = e.target.value;
  }

  handleTextChange(e) {
    this.state.text = e.target.value;
  }
//this.props.onCommentSubmit({author: author, text: text});
  handleSubmit(e) {
    e.preventDefault();
    var author = ReactDOM.findDOMNode(this.refs.author).value.trim();
    var text = ReactDOM.findDOMNode(this.refs.text).value.trim();
    if (!text || !author) {
      return;
    }
    this.props.onBookSubmit({author: author, text: text});
    
    ReactDOM.findDOMNode(this.refs.author).value = '';
    ReactDOM.findDOMNode(this.refs.text).value = '';
    return;
  }

  render() {
    return (
      <form className="well" onSubmit={this.handleSubmit.bind(this)}>
        <h4>Add a book to library</h4>
        <input type="text" className="form-control"
          placeholder="Author" ref="author" />
        <input type="text" className="form-control"
          placeholder="Book name" ref="text" />
      <input type="submit" value="Add" className="form-control btn btn-warning"/>
      </form>
    );
  }
} // class BookForm

ReactDOM.render(
  <BookLibrary url="/serverdata" />,
  document.getElementById('content')
);
