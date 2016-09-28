//CommentBox
var CommentBox = React.createClass({
  loadCommentsFromServer: function() {

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
  getInitialState: function() {
    console.log("executing CommentBox:getInitialState");
    return {data: [{id: "0", author: "Authorname", text: "Book"}]};
  },
  componentDidMount: function() {
    console.log("executing CommentBox:componentDidMount");
    //this.loadCommentsFromServer(); // to fetch data in the begining
    setInterval(this.loadCommentsFromServer, this.props.pollInterval); // to keep fatching at intervals
  },
  render: function() {
    console.log("CommentBox:render");
    return (
      <div>
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
      </div>
    );
  }
});


// CommentList
var CommentList = React.createClass({
  render: function() {
    /*
    this.props.data has an object array.
    We need to iterate thought easch element of the array and create a <Comment > tag for each object.
    Javascript's map() method creates a new array with the results of calling a function for every array element.
    The map() method calls the provided function once for each element in an array, in order.
    */
    var commentHtmlElementArray = this.props.data.map(function(anObject) {
          return (
            <Comment
              author={anObject.author}
              key={anObject.id}
              book={anObject.text}
              >
            </Comment>
          );
        });
    //console.log("commentHtmlElementArray=");
    //console.log(commentHtmlElementArray);
    return (
      <div>
            {commentHtmlElementArray}
      </div>
    );
  }
});

// Comment
var Comment = React.createClass({

  render: function() {
    return (
      <div>
        <h5>
          {this.props.author}---{this.props.book}
        </h5>
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox url="/commentsData.json" pollInterval={1000} />,
  document.getElementById('content')
);
