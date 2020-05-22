import React, { Component } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
import PostComponent from "./PostComponent";
// import debounce from "lodash.debounce";
import throttle from "lodash.throttle";

class InfiniteScrolling extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      error: false,
      hasMore: true,
      isLoading: false
    };
    window.onscroll = throttle(() => {
      const {
        state: { error, isLoading, hasMore }
      } = this;

      // Bails early if:
      // * there's an error
      // * it's already loading
      // * there's nothing left to load
      if (error || isLoading || !hasMore) return;

      // let height =
     
      // Checks that the page has scrolled to the bottom
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        this.fetchPosts();
      }
    }, 2000);
  }

  fetchPosts = () => {
    fetch("http://localhost:5000/post")
      .then(res => res.json())
      .then(data => {
        // this.setState({ posts: data });
        const nextPosts = data.map(post => ({
          title: post.title,
          desc: post.desc,
          image: post.image
        }));

        this.setState({
          posts: [...this.state.posts, ...nextPosts]
        });
      });
  };

  onClick = () => {
    this.fetchPosts();
  }

  componentDidMount() {
    this.fetchPosts();
  }

  render() {
    console.log(this.state.posts);
    return (
      <div>
        <h1>Daily Posts</h1>
        <hr />
        <div className="news-container">
          {this.state.posts.map((item, index) => (
            <PostComponent key={index} {...item} />
          ))}
        </div>
        <button onClick={this.onClick}>click</button>
      </div>
    );
  }
}

export default InfiniteScrolling;
