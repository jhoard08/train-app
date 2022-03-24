import { React, useState, useEffect } from 'react';



const TrainData = () => {

  const [trainData, setTrainData] = useState();
  const [filteredData, setFilteredData] = useState(trainData);
  const MINUTE_MS = 10000;

  // updates the train list every 10s
  useEffect(() => {
    const interval = setInterval(() => {
      getTrainsWithFetch();
    }, MINUTE_MS);
    return () => clearInterval(interval);
  }, []);

  const getTrainsWithFetch = async () => {
    const response = await fetch('https://api.wmata.com/TrainPositions/TrainPositions?contentType=json&api_key={API-KEY-HERE}');
    const jsonData = await response.json();
    setTrainData(jsonData);
    setFilteredData(jsonData);

  };


  const handleSearch = (event) => {
    console.log(filteredData);
    let value = event.target.value.toLowerCase();
    let result = [];
    result = trainData.TrainPositions.filter((train) => {
      return train.ServiceType.search(value) !== -1;
    });
    setFilteredData(result);
  }

  // Keeps the application from blowing up before the data is loaded with undefined array
  if (filteredData === undefined) {
    return <div className="loading">Loading Train Data.....</div>
  }

  /* Test function 
  
  function filterArr(train) {
    return function () {
      console.log(train);
      const result = train.TrainPositions.filter(train => train.CarCount == "6");
      setTrainData(result);
      console.log(result);
      console.log(trainData);
    }
  }*/

  return (
    <div className="trainData">
      <h1 className="titleHead">Train Data</h1>
      <label className="serviceType">Service Type - Unkown:</label>
      <input type="checkbox" onChange={(event) => handleSearch(event)} />
      <table className="tableContainer">
        <thead>
          <tr>
            <th>Service Type</th>
            <th>Car Count</th>
            <th>Train Number</th>
            <th>Code Line</th>
          </tr>
        </thead>
        <tbody>
          {
            filteredData.TrainPositions.map((train) => (
              <tr key={train.TrainId}>
                <td>{train.ServiceType}</td>
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
