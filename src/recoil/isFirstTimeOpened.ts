import { atom } from "recoil";

export const isFirstTimeOpenedState = atom({
  key: 'isFirstTimeOpened',
  default: false,
});