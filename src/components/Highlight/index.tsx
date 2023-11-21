import React from "react";
import { Container, Title, Subtitle } from "./styles";

interface HighlightProps {
  title: string;
  subtitle: string;
}

const Highlight = ({ title, subtitle }: HighlightProps) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Container>
  );
};

export default Highlight;
