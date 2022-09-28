import "./App.css";
import React from "react";
import { getQuote } from ".//quote.js";

const FADE_DURATION = 1000;

function App() {
  return (
    <div className="App">
      <QuoteBox />
    </div>
  );
}

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: "",
      fadeTransition: null,
      fadeState: "fade-in",
    };
    this.callAPI = this.callAPI.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const timeout = setTimeout(() => {
      this.callAPI();
    }, FADE_DURATION);

    clearTimeout(this.state.fadeTransition);

    this.setState({
      fadeState: "fade-out",
      fadeTransition: timeout,
    });
  }

  callAPI() {
    getQuote().then((data) => {
      let quoteData = data[0];
      this.setState({
        quote: quoteData.q,
        author: quoteData.a,
        tweetLink:
          "https://twitter.com/intent/tweet?text=" +
          '"' +
          quoteData.q.split("%").join("%25").split(" ").join("%20") +
          '" - ' +
          quoteData.a,
        fadeTransition: null,
        fadeState: "fade-in",
      });
    }, []);
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
      <div className="container-fluid d-flex align-items-center justify-content-center">
        <div className="row">
          <div className="col-6" id="quote-box">
            <div
              className={`fade-wrapper ${this.state.fadeState}`}
              style={{ transitionDuration: `${FADE_DURATION}ms` }}
            >
              <h2 id="text" className="text-white mt-5">
                {this.state.quote}
              </h2>
              <p className="text-white fs-4" id="author">
                - {this.state.author} -
              </p>
              <button
                id="new-quote"
                className="mb-5 btn btn-primary"
                onClick={this.handleClick}
              >
                New Quote
              </button>
            </div>

            <div className="row fixed-bottom mb-5">
              <p className="tweet-text text-white fs-5">Tweet this quote:</p>

              <a
                id="tweet-quote"
                target="_blank"
                rel="noreferrer"
                href={this.state.tweetLink}
              >
                <i className="fa-brands fa-twitter fs-1 mb-3"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
