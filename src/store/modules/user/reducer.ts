import { Reducer } from "redux";
import produce from "immer";

interface IUserInfo {
  id: number;
  name: string;
  profile: string;
}

const INITIAL_STATE: IUserInfo = {
  id: 1,
  name: "",
  profile: ""
}

export const user: Reducer<IUserInfo> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch(action.type) {
      case "CHANGE_USER_NAME": {
        const userName = action.payload.userName;
        
        draft.name = userName;

        break;
      }
      case "SET_INITIAL_VALUE": {
        const user = action.payload.user;

        console.log(user);

        draft.name = user.name;
        draft.profile = user.profile;

        break;
      }
      case "CHANGE_USER_PHOTO": {
        const path = action.payload.path;

        draft.profile = path;

        break;
      }
      default: {
        return draft;
      }
    }
  });
}