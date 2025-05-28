import API from "./api";

export const createPlaylist = async (data) => {
  const res = await API.post("/playlists", data);
  return res.data;
};

export const getUserPlaylists = async (userId) => {
  const res = await API.get(`/playlists/${userId}`);
  return res.data;
};

export const deletePlaylist = async (id) => {
  const res = await API.delete(`/playlists/${id}`);
  return res.data;
};
