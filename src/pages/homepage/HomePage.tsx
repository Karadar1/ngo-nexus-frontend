import { Button, Container, Subtitle, Title } from "./HomePage.styled";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate()
    const {user} = useUser()
    console.log(user)
    return (
      <Container>
        <Title>Welcome to My Homepage {user?.name}</Title>
        <Subtitle>This is a beautiful homepage styled with Styled-Components!</Subtitle>
        <Button onClick={()=>navigate('/login')}>Get Started</Button>
      </Container>
    );
  }