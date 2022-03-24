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
    return <div>Still Loading.....</div>
  }


  return (
    <div className="titleHead">
      <h1>Train Data</h1>
      <table className="tableContainer">
        <thead>
          <tr>
            <th>Train ID</th>
            <th>Car Count</th>
            <th>Train Number</th>
            <th>Code Line</th>
          </tr>
        </thead>
        <tbody>
          {
            trainData.TrainPositions.map((train) => (
              <tr key={train.TrainPositions}>
                <td>{train.TrainId}</td>
                <td>{train.CarCount}</td>
                <td>{train.TrainNumber}</td>
                <td>{train.LineCode}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default TrainData;
