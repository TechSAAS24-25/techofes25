import axios from 'axios';
const accommodationUrl = 'api/accommodations';

//implement try and catch blocks for error handling in the frontend

//to get all accommodations available
//refer the models from backend for all the fields
//accommodation model for the fields of accommodation
//booking model for the fields of booking (important for booking)
//the response data is an array of objects where each object is an accommodation (refer accommodation model from backend)

const getAll = async () => {
    const response = await axios.get(accommodationUrl);
    return response.data;
    };

//to book an accommodation
//bookingData is an object with the following fields:
//accommodationId: string
//duration: number
//token is a string containing the JWT token which can be loaded from local storage 
//using the following code:
//const services = require('./services');
//const user = services.loadUser(); 
//const token = user.token;
//integrate it in the frontend to book an accommodation (important)
//best way is to get token from main component and pass it as a prop to the component where booking is done
//or load it from local storage in the component where booking is done
// accommodationId should be sent from the frontend, not from the user

const bookAccommodation = async (bookingData, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.post(`${accommodationUrl}/${bookingData.accommodationId}/book`, bookingData, config);
    return response.data;
}

//the above code returns the response data from the server
//the response data is an object with the following fields:
//message: string
//booking: object
//refer booking model from backend for the fields of booking

export default { getAll, bookAccommodation };