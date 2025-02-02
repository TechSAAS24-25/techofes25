import axios from "../helper/axios"; 
const merchandiseUrl = "api/merchandise";
import storage from "../services/storage";

//implement try and catch blocks for error handling in the frontend

// Function to get all merchandise
// Returns an array of merchandise objects
// Refer the backend models to see the structure of a merchandise object

const getMerchandise = async () => {
  const response = await axios.get(merchandiseUrl);
  return response.data;
};

// Function to purchase a specific merchandise
// request body should contain the quantity of merchandise to purchase
// merchandiseId has to be passed as a parameter
// Returns a purchase object and a message
// Refer the backend models to see the structure of a purchase object

const purchaseMerchandise = async (merchandiseId, quantity) => {
  const config = {
    headers: {
      Authorization: `Bearer ${storage.loadUser().token}`,
    },
  };
  const response = await axios.post(
    `${merchandiseUrl}/${merchandiseId}/purchase`,
    { quantity },
    config()
  );
  return response.data;
};

export { getMerchandise, purchaseMerchandise };
