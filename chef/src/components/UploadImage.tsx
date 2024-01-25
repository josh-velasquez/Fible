import { ChangeEvent, useState } from "react";
import { Button, Container, Form, Icon, Image, Label } from "semantic-ui-react";

interface ImageInformation {
  image: File | undefined;
  onResetImage: () => void;
  onUploadImage: (file: File) => void;
}
const UploadImage: React.FC<ImageInformation> = ({
  image,
  onUploadImage,
  onResetImage,
}) => {
  const [newImage, setNewImage] = useState<File>();
  const onUploadImageFile = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const file = files[0];
      setNewImage(file);
      onUploadImage(file);
    }
  };

  const onResetImageFile = () => {
    setNewImage(undefined);
    onResetImage()
  };

  return (
    <Container>
      <Form.Field>
        <>
          <Button
            as="label"
            htmlFor="file"
            animated="fade"
            type="button"
            color="teal"
          >
            <Button.Content visible>
              <Icon name="upload" />
            </Button.Content>
            <Button.Content hidden>Upload image</Button.Content>
          </Button>
          <input
            type="file"
            id="file"
            hidden
            accept=".png"
            onChange={onUploadImageFile}
          />
          <Container textAlign="right">
            <Button as="div" labelPosition="left">
              <Label style={{ width: "auto" }} pointing="right" as="a" basic>
                {newImage ? newImage.name : "Image name..."}
              </Label>
              <Button
                type="button"
                icon
                negative
                onClick={onResetImageFile}
                compact
              >
                <Icon name="remove" />
              </Button>
            </Button>
          </Container>
          <Form.Field>
            <Image
              style={{ maxWidth: 500, maxHeight: 500 }}
              className="preview"
              src={newImage ? URL.createObjectURL(newImage) : ""}
              alt=""
            />
          </Form.Field>
        </>
      </Form.Field>
    </Container>
  );
};
export default UploadImage;
