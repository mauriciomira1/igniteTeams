import React from "react";

import { Container, Icon, Title } from "./styles";

import { TouchableOpacityProps } from "react-native/Libraries/Components/Touchable/TouchableOpacity";

interface GroupCardProps extends TouchableOpacityProps {
  title: string;
}

const GroupCard = ({ title, ...rest }: GroupCardProps) => {
  return (
    <Container {...rest}>
      <Icon />
      <Title>{title}</Title>
    </Container>
  );
};

export default GroupCard;
