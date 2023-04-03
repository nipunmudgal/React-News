import React, { Component } from 'react'
import NewsItem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
  }
  static propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  }
   capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
} 

  constructor(props){
    super(props);// CONSTRUCTOR JAB RUN KARTA HAI JAB BHI CLASS KA KOI OBJECT BANTA HAI
    console.log("This is Constructor from News Component"); // neeche waale card ki state yahi se set kar sakta hu (in newsitem waale card ki ..pehle ye constructor wahi thaa--newsitem mai)
    this.state = { // this.state ki madat se state set kar rahe hai.
      articles: [],
      loading: false,
      page:1,
      totalResults: 0,
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`; 
  }

async updateNews(){
  this.props.setProgress(10);
 const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
this.setState({loading: true});
 let data = await fetch(url);
 this.props.setProgress(30);
let parsedData = await data.json() 
this.props.setProgress(70);
console.log(parsedData);
this.setState({
  articles: parsedData.articles,
  totalResults: parsedData.totalResults,
  loading:false,
}) 
this.props.setProgress(100);
}

async componentDidMount(){//lifecyclemethod jo hamesha render k bd chalega
console.log("cdm");
// this.setState({loading:true});
// let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0e96f218788444e2929a582ab38dee06&page=1&pageSize=${this.props.pageSize}`;
// let data = await fetch(url);
// let parsedData = await data.json()
// console.log(parsedData);
// this.setState({
//   articles: parsedData.articles,
//   totalResults: parsedData.totalResults,
//   loading:false
//})
this.updateNews();
  }


  handlePrevClick = async()=>{
    console.log("Previous")
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0e96f218788444e2929a582ab38dee06&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //   this.setState({loading:true});
  //   let data = await fetch(url);
  //   let parsedData = await data.json() 
  //   console.log(parsedData);
  //   this.setState({
  //     page: this.state.page-1,
  //     articles: parsedData.articles, 
  //     loading:false,
  //   })
  this.setState({page: this.state.page - 1})
    this.updateNews();
  }  

  handleNextClick = async()=>{
    console.log("Next");
    // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0e96f218788444e2929a582ab38dee06&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    //   this.setState({loading:true});
    //   let data = await fetch(url);
    //   let parsedData = await data.json()
    //   // this.setState({loading:false}); same ye cheez neeche daal di
    //   this.setState({
    //     page: this.state.page+1,
    //     articles: parsedData.articles, 
    //     loading:false,
    //   })
    //}
    this.setState({page: this.state.page + 1})
    this.updateNews();
  }

 fetchMoreData = async() => {
  this.setState({page: this.state.page + 1})
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  let data = await fetch(url);
  let parsedData = await data.json()
  console.log(parsedData);
  this.setState({
    articles: this.state.articles.concat(parsedData.articles),
    totalResults: parsedData.totalResults,
    // loading:false,
  })
};

  render() {
    console.log("render");
    return (
      <>
        <h1 className='text-center'>NewsMonkey - Top Headlines from {this.capitalizeFirstLetter(this.props.category)} Category</h1>
          {this.state.loading && <Spinner/>} 
          {/* agar loading true hai to spinner ko dikhao */}

          <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
                > 

 <div className="container">
       <div className="row">
        {/* { !this.state.loading  && this.state.articles.map((element)=>{ */}
        { this.state.articles.map((element)=>{
            return <div className='col-md-4' key={element.url}>
                <NewsItem title ={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
        </div>
          })
        }
      </div>
      </div>

      </InfiniteScroll>

      {/* <div className='container d-flex justify-content-between'>
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
      </div> */}
      </>
    ) 
  }
}
 
export default News
// each child in a list should have a unique "key" prop.
