import axios from "axios";

export const getAllBeacons = async () => {
  try {
    const res = await axios.get(
      `https://contendance-api.herokuapp.com/api/beacon`
    );
    return res.data.data;
  } catch (error) {
    return error.response;
  }
};

export const createBeacon = async (payload) => {
  try {
    const res = await axios.post(
      `https://contendance-api.herokuapp.com/api/beacon`,
      payload
    );
    return res;
  } catch (error) {
    return error.response;
  }
};

export const deleteBeacon = async (id) => {
  try {
    const res = await axios.delete(
      `https://contendance-api.herokuapp.com/api/beacon/${id}`
    );
    console.log(res);
    return res;
  } catch (error) {
    return error.response;
  }
};
