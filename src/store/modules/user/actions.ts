interface IUserInfo {
  id: number;
  name: string;
  profile: string;
}

export function setInitialValue(user: IUserInfo) {
  return {
    type: "SET_INITIAL_VALUE",
    payload: {
      user
    }
  }
}

export function changeUserName(userName: string) {
  return {
    type: "CHANGE_USER_NAME",
    payload: {
      userName
    }
  }
}

export function changeUserPhoto(path: string) {
  return {
    type: "CHANGE_USER_PHOTO",
    payload: {
      path
    }
  }
}
