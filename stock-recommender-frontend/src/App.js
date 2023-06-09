import logo from './logo.svg';
import './App.css';

import Search from'./components/search/search';
import RecommendationCard from './components/recommendation_card/recommendation_card';

function App() {
  return (
    <div className="App">
      <h2>MACHINE LEARNING BASED STOCK-RECOMMENDER SYSTEM</h2>

      <Search/>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
