import { Button, Container, Subtitle, Title } from "./HomePage.styled";

export default function HomePage() {
    
    return (
      <Container>
        <Title>Welcome to My Homepage</Title>
        <Subtitle>This is a beautiful homepage styled with Styled-Components!</Subtitle>
        <Button>Get Started</Button>
      </Container>
    );
  }