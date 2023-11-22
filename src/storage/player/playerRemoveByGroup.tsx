import AsyncStorage from "@react-native-async-storage/async-storage";

import { playersGetByGroup } from "./playersGetByGroup";

import { PLAYER_COLLECTION } from "@storage/storageConfig";

export const playerRemoveByGroup = async (
  group: string,
  playerName: string
) => {
  try {
    const storage = await playersGetByGroup(group);

    const newPlayersList = storage?.filter(
      (player) => player.name !== playerName
    );

    await AsyncStorage.setItem(
      `${PLAYER_COLLECTION}-${group}`,
      JSON.stringify(newPlayersList)
    );
  } catch (error) {
    console.log("Erro na remoção de jogador ===>", error);
  }
};
