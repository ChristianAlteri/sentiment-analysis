import React, { useEffect } from "react";

import axios from "axios";

const SentimentButton = () => {

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/get-data");
      const fetchedData = response.data;
      console.log(fetchedData);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
    return ( 

        <button onClick={fetchData}>Submit</button>
     );
}
 
export default SentimentButton;