import axios from 'axios';

const API_URL = 'https://avwx.rest/api/station';
const API_TOKEN = 'ZEfcA1uZHp6nGArapPUCXOECs4IDQkt4Bc-HJxGjLec';
//https://avwx.rest/api/station/VECC

export const fetchAirportData = async (icao) => {
  try {
    if (!icao || icao.length !== 4) {
      throw new Error('Invalid ICAO code. Please enter a valid 4-letter ICAO code.');
    }

    const response = await axios.get(`${API_URL}/${icao}`, {
      headers: {
        'Authorization': `BEARER ${API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    const data = response.data;

    
    const runways = data.runways?.map((runway) => ({
      ident1: runway.ident1,
      ident2: runway.ident2,
      length_ft: runway.length_ft,
      width_ft: runway.width_ft
    })) || [];
   console.log(data);

   for(let i=0;i<runways.length;i++){
    console.log(runways[i].ident1);
   }

    
   
   

    return {
      // ident1: data.runways[0].ident1,
      // ident2: data.runways[0].ident2,
      // ident:data.runways.forEach((runway, index) => {
      //   return(`data.runways[${index + 1}].ident${index+1}`);
      // }),
      icao: data.icao,
      name: data.name,
      elevation: data.elevation_ft,
      runways: runways,
      
    };
  } catch (error) {
    console.error('Error fetching airport data:', error);
    return null;
  }
};