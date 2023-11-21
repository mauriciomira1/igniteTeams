import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";
import { playersGetByGroup } from "./playersGetByGroup";

import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { PlayerStorageDTO } from "./PlayerStorageDTO";

export const PlayerAddByGroup = async (
  newPlayer: PlayerStorageDTO,
  group: string
) => {
  try {
    const storagePlayers = await playersGetByGroup(group);
    const verifyPlayers = storagePlayers.filter(
      (player) => player.name === newPlayer.name
    );
    if (verifyPlayers.length > 0) {
      throw new AppError("Jogador já adicionado a turma");
    }

    const storage = JSON.stringify([...storagePlayers, newPlayer]);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
  } catch (error) {
    console.log("Erro no PlayerAddByGroup ===>", error);
  }
};
