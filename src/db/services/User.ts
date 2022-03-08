import { Q } from "@nozbe/watermelondb";
import { database } from "../index.native";
import User from "../model/User";

type UserType = {
  id: string; 
  name: string; 
  photo: string;
}

export async function createNewUser(name = "", photo = "") {
  try {
    await database.write(async () => {
      await database.get<User>('user_info').create(user => {
        user.name = name,
        user.photo = photo
      });
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getUserInfo() {
  try {
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
  } catch (error) {
    console.log(error);
  }
}

export async function setUserName(value: string, userId: string) {
  const userCollection = database.get<User>('user_info');

  try {
    await database.write(async () => {
      const entrie = await userCollection.find(userId);
  
      await entrie.update(user => {
        user.name = value;
      });
    });
  } catch (error) {
    console.log(error);
  }
}