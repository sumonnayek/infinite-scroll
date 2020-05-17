import React, { Component } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
import NewsComponent from "./NewsComponent";

class InfiniteScrolling extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newz: [],
    };
  }

  fetchnews = () => {
    fetch(
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=3f17372c08b14d96b3f09d565d31aec7"
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ newz: data.articles });
      });
  };

  componentDidMount() {
    this.fetchnews();
  }

  render() {
    console.log(this.state.newz)
    return (
      <div>
        <h1>Daily News</h1>
        <hr />
        <div className='news-container'>
          {this.state.newz.map((item, index) => (
            <NewsComponent key={index} {...item} />
          ))}
        </div>
      </div>
    );
  }
}

export default InfiniteScrolling;
