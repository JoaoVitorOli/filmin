import { database } from "../index.native";
import User from "../model/User";

type UserType = {
  id: string; 
  name: string; 
  photo: string;
}

export async function createNewUser(name = "", photo = "") {
  await database.write(async () => {
    await database.get<User>('user_info').create(user => {
      user.name = name,
      user.photo = photo
    });
  });
}

export async function getUserInfo() {
  const userCollection = database.get<User>('user_info');
  let data: UserType[] = [];

  const entries = await userCollection.query().fetch();

  if (entries.length > 0) {
    data = entries.map(entrie => {
      return {
        id: entrie.id,
        name: entrie.name!,
        photo: entrie.photo!
      }
    });
  }

  return data;
}