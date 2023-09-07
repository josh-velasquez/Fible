import { Button, Header, Icon, Modal } from "semantic-ui-react";

interface DeleteModalProps {
  open: boolean;
  onDelete: () => void;
  onClose?: (close: boolean) => void;
  onOpen?: (open: boolean) => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  open,
  onDelete,
  onClose,
  onOpen,
}) => {
  const handleNoClick = () => {
    if (onClose) {
      onClose(false);
    }
  };

  return (
    <Modal
      basic
      onClose={() => onClose}
      onOpen={() => onOpen}
      open={open}
      size="small"
    >
      <Header icon>
        <Icon name="delete calendar" />
        Delete Recipe
      </Header>
      <Modal.Content
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p>Are you sure you want to delete this recipe?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" inverted onClick={handleNoClick}>
          <Icon name="remove" /> No
        </Button>
        <Button color="red" inverted onClick={onDelete}>
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default DeleteModal;
