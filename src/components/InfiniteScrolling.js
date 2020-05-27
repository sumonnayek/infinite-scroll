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

  fetchPosts = () => {
    this.setState({ loading: true });
    fetch("http://localhost:5000/post")
      .then(res => res.json())
      .then(data => {
        // this.setState({ posts: data });
        const nextPosts = data.map(post => ({
          ...post
        }));
        setTimeout(() => {
          this.setState({
            posts: [...nextPosts, ...this.state.posts],
            loading: false
          });
        }, 800);
      });
  };

  toBottom = () => {
    let a = document.getElementById("mainDiv").scrollHeight ;
    // window.scrollTo(0, a)
    window.scrollY = document.getElementById("mainDiv").scrollHeight - window.innerHeight;
    // document.getElementById("mainDiv").scrollTop = document.getElementById("mainDiv").scrollHeight ;
    console.log(`scrollTop ${window.scrollY} scrollHeight ${document.getElementById("mainDiv").scrollHeight}`)

  };

  componentDidMount() {
    
    // document.querySelector("body").scrollTop = document.querySelector("body").scrollHeight;
    // console.log(
    //   `scrollTop ${document.querySelector("body").scrollTop} scrollHeight ${
    //     document.querySelector("body").scrollHeight
    //   }`
    // );
    this.fetchPosts();
    // .then(() => {document.querySelector("body").scrollTop = document.querySelector("body").scrollHeight;
    // console.log(`scrollTop ${document.querySelector("body").scrollTop} scrollHeight ${document.querySelector("body").scrollHeight}`)})

    // document.querySelector("body").scrollTop = document.querySelector("body").scrollHeight;
    // console.log(`scrollTop ${document.querySelector("body").scrollTop} scrollHeight ${document.querySelector("body").scrollHeight}`)
    //   window.onscroll = throttle(e => {
    //     // window.scrollY =  document.querySelector("body").scrollHeight - window.innerHeight;
    //     let totalHeight = window.innerHeight + window.scrollY
    //     let minHeight = document.querySelector("body").scrollHeight - totalHeight;

    //     console.log(
    //       `ScrollHeight: ${
    //         document.querySelector("body").scrollHeight
    //       } InnerHeight: ${window.innerHeight} scrollTop: ${
    //         window.scrollY
    //       } totalHeight: ${window.innerHeight + window.scrollY}
    //       ${(Math.floor(window.innerHeight + window.scrollY) /
    //         document.querySelector("body").scrollHeight) *
    //         100} minHeight: ${minHeight}
    //       `
    //     );

    //     // let scrollChangeOn = minHeight < 2000 ? minHeight : 2000;

    //     // if (
    //     //   document.querySelector("body").scrollHeight -
    //     //     (window.innerHeight + window.scrollY) <=
    //     //   scrollChangeOn
    //     // ) {
    //     //   console.log("in");
    //     //   !this.state.loading && this.fetchPosts();
    //     // }
    //   }, 500);
  }

  goToTop = () => {
    window.scrollTo(0, 0);
  };

  render() {
    // console.log(this.state.posts);
    return (
      <div id='mainDiv'>
        <button onClick={this.toBottom}>click</button>
        <h1>Daily Posts</h1>
        <button onClick={this.goToTop} className="top-button">
          ^
        </button>
        <hr />
        <div className="news-container">
          {this.state.posts.map((item, index) => (
            <PostComponent key={index} {...item} />
          ))}
        </div>
        
      </div>
    );
  }
}

export default InfiniteScrolling;
