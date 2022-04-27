import { atom } from "recoil";

export const userInfoState = atom({
  key: 'userInfo',
  default: {
    id: 1,
    name: "",
    profile: ""
  },
});