import React from "react";
import { ButtonIconTypeStyleProps, Container, Icon } from "./styles";
import { TouchableOpacityProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type Props = TouchableOpacityProps & {
  // Usando o glyphMap para tipar o 'icon' com as props do MaterialIcons
  icon: keyof typeof MaterialIcons.glyphMap;
  type?: ButtonIconTypeStyleProps;
};

const ButtonIcon = ({ icon, type = "PRIMARY", ...rest }: Props) => {
  return (
    <Container {...rest}>
      <Icon name={icon} type={type} />
    </Container>
  );
};

export default ButtonIcon;
