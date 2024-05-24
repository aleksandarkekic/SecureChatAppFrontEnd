import base from "./baseService";

const instance = base.service(true);

export const loadUser = () => {
  return instance.get(`/users/get-all`);
};

export const loadMessages = (receiverId) => {
  return instance.get(`/messages/user/${receiverId}`);
};

export const sendMessage = (message) => {
  return instance.post(`messages/insert`, message);
};
export default {
  loadUser,
  loadMessages,
  sendMessage,
};
