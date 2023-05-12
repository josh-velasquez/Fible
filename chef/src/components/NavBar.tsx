import { Container, Header, Menu, Icon } from "semantic-ui-react";
import { InView } from "react-intersection-observer";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const menuStyle = {
  border: "none",
  borderRadius: 0,
  boxShadow: "none",
  marginBottom: "1em",
  transition: "box-shadow 0.5s ease, padding 0.5s ease",
};

const fixedMenuStyle = {
  backgroundColor: "#000",
  boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
};

const NavBar: React.FC = () => {
  const [menuFixed, setMenuFixed] = useState<boolean>();
  const toggleTopMenu = (inView: any) => setMenuFixed(!inView);

  let navigate = useNavigate();

  return (
    <InView onChange={toggleTopMenu}>
      <Menu
        inverted
        borderless
        fixed={menuFixed ? "top" : undefined}
        style={menuFixed ? fixedMenuStyle : menuStyle}
      >
        <Container text>
          <Menu.Item>
            <Icon name="sort alphabet down" />
          </Menu.Item>
          <Menu.Item>
            <Link to="/" onClick={() => navigate("/")}>
              <Header inverted as="h1">
                Omnisort
              </Header>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/docs" onClick={() => navigate("/docs")}>
              Docs
            </Link>
          </Menu.Item>
        </Container>
      </Menu>
    </InView>
  );
};
export default NavBar;