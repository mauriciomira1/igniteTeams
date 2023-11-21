import React from "react";
import { Container, Message } from "./styles";

interface ListEmptyProps {
  message: string;
}

export const ListEmpty = ({ message }: ListEmptyProps) => {
  return (
    <Container>
      <Message>{message}</Message>
    </Container>
  );
};
