import { all, call, takeLatest } from "redux-saga/effects";
import { getUserInfo, setUserName, setUserPhoto } from "../../../db/services/User";
import { changeUserName, changeUserPhoto } from "./actions";

type ChangeUserNameRequest = ReturnType<typeof changeUserName>;
type ChangeUserPhotoRequest = ReturnType<typeof changeUserPhoto>;

interface UserTypes {
  id: number;
  name: string;
  profile: string;
}

function* seveUserNameIntoWatermelondb({ payload }: ChangeUserNameRequest) {
  const { userName } = payload;

  async function awaitFunction() {
    const userInfo = await getUserInfo();

    if (userInfo) {
      await setUserName(userName, userInfo[0].id);
    }
  }

  yield call(awaitFunction);
}

function* seveUserPhotoIntoWatermelondb({ payload }: ChangeUserPhotoRequest) {
  const { path } = payload;

  async function awaitFunction() {
    const userInfo = await getUserInfo();

    if (userInfo) {
      await setUserPhoto(path, userInfo[0].id);
    }
  }

  yield call(awaitFunction);
}

export default all([
  takeLatest("CHANGE_USER_NAME", seveUserNameIntoWatermelondb),
  takeLatest("CHANGE_USER_PHOTO", seveUserPhotoIntoWatermelondb),
]);

export {};