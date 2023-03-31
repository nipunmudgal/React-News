import React, { Component } from "react";

export class Newsitem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl} = this.props; //DESTRUCTURING
    return (
      <div className="my-3">
        <div className="card" style={{width: "18rem"}}>
          <img src={!imageUrl?"https://www.coindesk.com/resizer/vmPh6zN1Oshmo7QsQ6qLal0LiZ4=/1200x628/center/middle/cloudfront-us-east-1.images.arcpublishing.com/coindesk/BAETRQU2J5DUNPL2GGWQMZ6CLY.jpg":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text"> {description}</p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsitem;
 //target="_blank" new tab m open