import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setIfIsAppFirstTimeOpenedAsTrue() {
  try {
    const jsonValue = JSON.stringify(true);

    await AsyncStorage.setItem('@app_first_time_opended', jsonValue);
  } catch (e) {
    console.error(e);
  }
}

export async function getIfIsAppFirstTimeOpenedAsTrue() {
  try {
    const jsonValue = await AsyncStorage.getItem('@app_first_time_opended')

    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(e);
  }
}
