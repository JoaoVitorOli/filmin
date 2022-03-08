import { all, takeLatest } from "redux-saga/effects";
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

  // realm.write(() => {
  //   const data = realm.objectForPrimaryKey<UserTypes>("UserInformation", 1)!;

  //   data.name = userName
  // });
}

// function* seveUserPhotoIntoRealm({ payload }: ChangeUserPhotoRequest) {
//   const { path } = payload;

//   const realm: Realm = yield getRealm();

//   realm.write(() => {
//     const data = realm.objectForPrimaryKey<UserTypes>("UserInformation", 1)!;

//     data.profile = path;
//   });
// }

export default all([
  takeLatest("CHANGE_USER_NAME", seveUserNameIntoWatermelondb),
  // takeLatest("CHANGE_USER_PHOTO", seveUserPhotoIntoRealm),
]);

export {};