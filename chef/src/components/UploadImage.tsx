import { ChangeEvent, useState } from "react";
import { Button, Container, Form, Icon, Label } from "semantic-ui-react";

interface ImageInformation {
  image: File | undefined;
  onResetImage: () => void;
  onUploadImage: (event: ChangeEvent<HTMLInputElement>) => void;
}
const UploadImage: React.FC<ImageInformation> = ({
  image,
  onUploadImage,
  onResetImage,
}) => {
  const [newImage, setNewImage] = useState<File>();
  return (
    <Container>
      <Form.Field>
        {image !== undefined ? (
          <Form.Field>
            <img
              style={{ maxWidth: 500, maxHeight: 500 }}
              className="preview"
              src={image?.name}
              alt=""
            />
          </Form.Field>
        ) : (
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
              onChange={onUploadImage}
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
                  onClick={onResetImage}
                  compact
                >
                  <Icon name="remove" />
                </Button>
              </Button>
            </Container>
            <Form.Field>
              <img
                style={{ maxWidth: 500, maxHeight: 500 }}
                className="preview"
                src={newImage?.name}
                alt=""
              />
            </Form.Field>
          </>
        )}

        {/* <Form.Field>
          <img
            style={{ maxWidth: 500, maxHeight: 500 }}
            className="preview"
            src={image?.name}
            alt=""
          />
        </Form.Field> */}
      </Form.Field>
    </Container>
  );
};
export default UploadImage;
