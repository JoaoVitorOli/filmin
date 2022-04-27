import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setIfIsAppFirstTimeOpened() {
  try {
    const jsonValue = JSON.stringify(false);

    await AsyncStorage.setItem('@app_first_time_opended', jsonValue);
  } catch (e) {
    console.error(e);
  }
}

export async function getIfIsAppFirstTimeOpened() {
  try {
    const jsonValue = await AsyncStorage.getItem('@app_first_time_opended')

    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(e);
  }
}
