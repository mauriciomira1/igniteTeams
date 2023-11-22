import React, { useCallback } from "react";
import { useState } from "react";
import { Alert, FlatList } from "react-native";

import { Container } from "./styles";

import Button from "@components/Button";
import Header from "@components/Header";
import Highlight from "@components/Highlight";
import GroupCard from "@components/GroupCard";
import { ListEmpty } from "@components/ListEmpty";

import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { groupsGetAll } from "@storage/group/groupsGetAll";
import Loading from "@components/Loading";

export default function Groups() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);

  const fetchGroups = async () => {
    try {
      setIsLoading(true);
      const data = await groupsGetAll();
      setGroups(data);
    } catch (error) {
      Alert.alert("Grupos", "Não foi possível carregar os grupos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenGroup = (group: string) => {
    navigation.navigate("players", { group });
  };

  const navigation = useNavigation();

  const handleNewGroup = () => {
    navigation.navigate("new");
  };

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  return (
    <Container>
      <Header />

      <Highlight title="Grupos" subtitle="Jogue com sua turma" />

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() => (
            <ListEmpty message="Que tal cadastrar o primeiro grupo?" />
          )}
        />
      )}
      <Button title="Criar novo grupo" onPress={handleNewGroup} />
    </Container>
  );
}
