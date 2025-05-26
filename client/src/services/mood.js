import API from "./api";

export const saveMood = async (userId, mood) => {
  const res = await API.post("/moods", { userId, mood });
  return res.data;
};

export const getUserMoods = async (userId) => {
  const res = await API.get(`/moods/${userId}`);
  return res.data;
};
