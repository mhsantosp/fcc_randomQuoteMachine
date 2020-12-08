import React from 'react';
import './../App.scss'

const API = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

class App extends React.Component {
  state = {
    quotes: [
      {
        quote: "Life isn’t about getting and having, it’s about giving and being.",
        author: "Kevin Kruse"
      }
    ],
    index: 0
  }

  componentDidMount() {
    //call the API and update state
    fetch(API).then(res => res.json())
      .then(res => {
        this.setState({
          quotes: res.quotes
        }, this.getRandomQuoteIndex);
      });
  }

  getRandomQuoteIndex = () => {
    const { quotes } = this.state;

    if (quotes.length > 0) {
      const index = Math.floor(Math.random() * quotes.length);
      this.setState({
        index
      })
    }
  }

  render() {
    const { quotes, index } = this.state;
    const quote = quotes[index];
    const tweetURL = `https://twitter.com/intent/tweet?text=${quote.quote}-${quote.author}`;
    console.log(tweetURL);

    return (
      <div className="wrapper d-flex justify-content-center align-items-center vh-100">
        <div className="row m-auto">
          <div className="col-12 box p-5 rounded" id="quote-box">
            {
              quote && (
                <blockquote className="blockquote" id="text">
                  <h5 className="mb-0">
                    <i className="fas fa-quote-left"></i>
                    <span> {quote.quote} </span>
                    <i className="fas fa-quote-right"></i>
                  </h5>
                  <footer className="blockquote-footer text-right" id="author">
                    <cite title="Source Title">{quote.author}</cite>
                  </footer>
                </blockquote>
              )
            }

            <div className="d-flex justify-content-between">
              <div className="btn-group" role="group">
                <a className="btn btn-sm btn-primary mx-2 rounded d-flex align-items-center" href={tweetURL} target="_blank" id="tweet-quote">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
              <button className="btn btn-sm btn-primary" id="new-quote" onClick={this.getRandomQuoteIndex}>
                <i className="fas fa-random"></i> Get Quote
              </button>
            </div>
          </div>

          <footer className="col-12 text-center my-3 footer">
            <a href="https://github.com/mhsantosp" className="creditos">
              作られた：<i className="fab fa-github-alt"></i> Satsuma
            </a>
          </footer>
        </div>
      </div>
    )
  }
}

export default App;

// ReactDOM.render(<App />, document.getElementById('app'));