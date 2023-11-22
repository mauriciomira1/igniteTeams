import React, { useState, useEffect, useRef } from "react";
import { Alert, FlatList, TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

import Input from "@components/Input";
import Button from "@components/Button";
import Header from "@components/Header";
import Filter from "@components/Filter";
import Highlight from "@components/Highlight";
import ButtonIcon from "@components/ButtonIcon";
import PlayerCard from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";

import { AppError } from "@utils/AppError";

import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { PlayerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { GroupRemoveByName } from "@storage/group/groupRemoveByName";
import Loading from "@components/Loading";

type RouteParams = {
  group: string;
};

const Players = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");

  const route = useRoute();
  const { group } = route.params as RouteParams;
  const navigation = useNavigation();

  const newPlayerNameInputRef = useRef<TextInput>(null);

  const handleAddPlayer = async () => {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert("Novo jogador", "Digite um nome para o jogador");
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    };

    try {
      await PlayerAddByGroup(newPlayer, group);

      newPlayerNameInputRef.current?.blur();
      fetchPlayersByTeam();
      setNewPlayerName("");
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Nova pessoa", error.message);
      } else {
        Alert.alert(
          "Nova pessoa",
          "Não foi possível adicionar uma nova pessoa"
        );

        console.log("Erro no Players", error);
      }
    }
  };

  const handleRemovePlayer = async (playerName: string) => {
    try {
      await playerRemoveByGroup(group, playerName);
      fetchPlayersByTeam();
    } catch (error) {
      console.log(error);
      Alert.alert("Remoção de jogador", "Não foi possível remover o jogador");
    }
  };

  const removeGroup = async (groupName: string) => {
    try {
      await GroupRemoveByName(groupName);
      navigation.navigate("groups");
    } catch (error) {
      Alert.alert(
        "Remoção de grupo",
        `Não foi possível remover o grupo ${groupName}`
      );
    }
  };

  const handleGroupRemove = async (groupName: string) => {
    Alert.alert("Remover", "Deseja remover o grupo?", [
      { text: "Não", style: "cancel" },
      {
        text: "Sim",
        onPress: () => removeGroup(groupName),
      },
    ]);
  };

  const fetchPlayersByTeam = async () => {
    try {
      setIsLoading(true);

      const playersByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam!);
    } catch (error) {
      Alert.alert("Jogadores", "Não foi possível carregar os jogadores");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />

      <Highlight title={group} subtitle="Adicione a galera e separe os times" />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              key={item.name}
              onRemove={() => handleRemovePlayer(item.name)}
            />
          )}
          ListEmptyComponent={() => (
            <ListEmpty message="Vamos incluir alguém nesse time?" />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: 60 },
            players.length === 0 && { flex: 1 },
          ]}
        />
      )}
      <Button
        title="Remover Grupo"
        type="SECONDARY"
        onPress={() => handleGroupRemove(group)}
      />
    </Container>
  );
};

export default Players;
function useEffects() {
  throw new Error("Function not implemented.");
}
