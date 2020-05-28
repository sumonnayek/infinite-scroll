import React, { Component } from "react";
import PostComponent from "./PostComponent";
import throttle from "lodash.throttle";

class InfiniteScrolling extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      loading: false
    };
  }

  fetchPosts = (callback) => {
    console.log('inside fetch post');

    this.setState({ loading: true });
    fetch("http://localhost:5000/post")
      .then(res => res.json())
      .then(data => {
        // this.setState({ posts: data });
        const nextPosts = data.reverse().map(post => ({
          ...post
        }));
        setTimeout(() => {
          this.setState({
            posts: [...nextPosts, ...this.state.posts],
            loading: false
          }, ()=>{
            console.log( `state updated with new post postLength ${this.state.posts.length}`);
            if(callback){
              callback();
            }
          });
        }, 500);
      });
  };

  toBottom = () => {
    document.querySelector("html").scrollTop = document.querySelector("body").scrollHeight;
    // console.log(
    //   `scrollTop ${window.scrollY} scrollHeight ${
    //     document.getElementById("mainDiv").scrollHeight
    //   }`
    // );
  };

  componentDidMount() {
   
    this.fetchPosts(this.toBottom);

      window.onscroll = throttle(e => {
        // window.scrollY =  document.querySelector("body").scrollHeight - window.innerHeight;
        let totalHeight = window.innerHeight + window.scrollY
        let minHeight = document.querySelector("body").scrollHeight - totalHeight;

       console.info(`window.scrollY ${window.scrollY} loading ${this.state.loading}`)

        if (
          window.scrollY <2000
        ) {
          console.log("in");
          !this.state.loading && this.fetchPosts();
        }
      }, 500);
  }

  goToTop = () => {
    window.scrollTo(0, 0);
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Are we adding new items to the list?
    // Capture the scroll position so we can adjust scroll later.
    if (prevState.posts.length < this.state.posts.length) {
      // const list = this.listRef.current;
      return document.querySelector("body").scrollHeight - document.querySelector("html").scrollTop;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // If we have a snapshot value, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    // (snapshot here is the value returned from getSnapshotBeforeUpdate)
    if (snapshot !== null) {
      // const list = this.listRef.current;
      document.querySelector("html").scrollTop = document.querySelector("body").scrollHeight - snapshot;
    }
  }

  render() {
    // console.log(this.state.posts);
    return (
      <div id="mainDiv">
        <button onClick={this.toBottom}>click</button>
        <h1>Daily Posts</h1>
        <button onClick={this.goToTop} className="top-button">
          ^
        </button>
        <hr />
        <div className="news-container">
          {this.state.posts.map((item, index) => (
            <PostComponent key={index} {...item} index={index} />
          ))}
        </div>
      </div>
    );
  }
}

export default InfiniteScrolling;
