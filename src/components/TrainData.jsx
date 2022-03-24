import { React, useState, useEffect } from 'react';


const TrainData = () => {

  const [trainData, setTrainData] = useState();


  useEffect(() => {
    getTrainsWithFetch();
  }, []);

  const getTrainsWithFetch = async () => {
    const response = await fetch('https://api.wmata.com/TrainPositions/TrainPositions?contentType=json&api_key=207e280fe77d4a3aa17ebf7ee8ca9b14');
    const jsonData = await response.json();
    setTrainData(jsonData);
  };

  if (trainData === undefined) {
    return <div>Still Loading....</div>
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Train Data</h2>
      </header>
      <div className="user-container">
        <h5 className="info-item">Train Id: {trainData.TrainPositions[0].TrainId}</h5>
        <h5 className="info-item">Car Count: {trainData.TrainPositions[0].TrainId}</h5>
        <h5 className="info-item">Line Code: {trainData.TrainPositions[0].TrainId}</h5>
        <h5 className="info-item">Train Number:{trainData.TrainPositions[0].TrainId}</h5>
      </div>
    </div>
  )
}

export default TrainData;
