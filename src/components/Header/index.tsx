import React from "react";
import { BackButton, BackIcon, Container, Logo } from "./styles";
import LogoImg from "@assets/logo.png";
import { useNavigation } from "@react-navigation/native";

interface HeaderProps {
  showBackButton?: boolean;
}

const Header = ({ showBackButton = false }: HeaderProps) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.navigate("groups");
  };

  return (
    <Container>
      {showBackButton && (
        <BackButton onPress={handleGoBack}>
          <BackIcon />
        </BackButton>
      )}
      <Logo source={LogoImg} />
    </Container>
  );
};

export default Header;
