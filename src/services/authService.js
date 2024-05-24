import base from "./baseService";

const instanceGuest = base.service(false);
const instance = base.service(true);

const stringUser = "1y56t9z7-8s513sa6-7s03kl2-99p4";
const stringAdmin = "12-4a5ba8q-kkl9135d-dfhdc119-f33184";

export const register = (request) => {
  return instanceGuest.post("/api/auth/register", request);
};

export const getCurrentUser = () => {
  return instance.get(`/users/current-user`);
};
export const CheckIfAdmin = () => {
  const role = localStorage.getItem("role");
  if (role === stringAdmin) {
    return true;
  } else {
    return false;
  }
};
export const setRole = (role) => {
  if (role === "USER") return stringUser;
  if (role === "ADMIN") return stringAdmin;
};

export const CheckIfUser = () => {
  const role = localStorage.getItem("role");
  if (role === stringUser) {
    return true;
  } else {
    return false;
  }
};
export default {
  register,
  setRole,
  getCurrentUser,
};
