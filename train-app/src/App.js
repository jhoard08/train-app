import './App.css';

//https://api.wmata.com/TrainPositions/TrainPositions?contentType=json&api_key=

function App() {

  const getTrain = () => {
    fetch('https://api.wmata.com/TrainPositions/TrainPositions?contentType=json&api_key=')
      .then(response => response.json())
      .then(data => console.log(data));

  }

  return (
    <div className="App">
      <button onClick={getTrain}> Get a train!</button>
    </div>
  );
}

export default App;
