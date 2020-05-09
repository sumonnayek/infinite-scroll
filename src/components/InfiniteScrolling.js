import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

class InfiniteScrolling extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newz: '',
      items: Array.from({ length: 30 })
    };
  }

  fetchMoreData = () => {
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(Array.from({ length: 20 }))
      });
    }, 1500);
  };

  fetchnews = () => {
    fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=3f17372c08b14d96b3f09d565d31aec7')
    .then(res => res.json())
    .then(data => {
      this.setState({newz: data});
    });
  }

  componentDidMount() {
    this.fetchnews();
  }

  render() {
    return (
      <div>
        <h1>demo: react-infinite-scroll-component</h1>
        <hr />
        <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {this.state.items.map((i, index) => (
            <div className='style' key={index}>
              div - #{index}
            </div>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

export default InfiniteScrolling;
