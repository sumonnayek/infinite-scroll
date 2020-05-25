import React, { Component } from "react";
import "../App.css";

export class PostComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { title, image } = this.props;
    // console.log(this.props);
    return (
      <div className='news-wrapper'>
        <div className='news-image'>
          <img src={image} alt="" width='300' />
        </div>
        <h3 className='news-title'>{title}</h3>
      </div>
    );
  }
}

export default PostComponent;
