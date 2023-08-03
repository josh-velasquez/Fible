import { Message } from "semantic-ui-react";

export const ErrorPage: React.FC = (): JSX.Element => {
  return (
    <Message>
      <Message.Header>Changes in Service</Message.Header>
      <p>
        We updated our privacy policy here to better service our customers. We
        recommend reviewing the changes.
      </p>
    </Message>
  );
};
