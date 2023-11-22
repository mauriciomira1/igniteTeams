import AsyncStorage from "@react-native-async-storage/async-storage";
import { groupsGetAll } from "./groupsGetAll";
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storageConfig";

export const GroupRemoveByName = async (groupName: string) => {
  try {
    const storage = await groupsGetAll();
    const newStorage = storage.filter((group) => group !== groupName);

    await AsyncStorage.setItem(
      `${GROUP_COLLECTION}`,
      JSON.stringify(newStorage)
    );
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupName}`);
  } catch (error) {
    throw error;
  }
};
