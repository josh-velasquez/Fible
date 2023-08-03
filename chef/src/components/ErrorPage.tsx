import { Container, Message } from "semantic-ui-react";

export const ErrorPage: React.FC = (): JSX.Element => {
  return (
    <Container>
      <Message>
        <Message.Header>Page not found.</Message.Header>
        <p>The page you are looking for does not exist :(.</p>
      </Message>
    </Container>
  );
};
