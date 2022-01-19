import styled from "styled-components";
import Menu from "./hamburger.png";

export const OverlayContainer = styled.div`
  position: fixed;
  border-radius: 15px 0 0 15px;
  width: 30%;
  height: calc(100% - 90px);
  right: ${({ visible }) => (visible ? "0" : "-30%")};
  top: 0;
  padding: 30px 15px 0;
  margin: 30px;
  margin-right: 0;
  background: #000000aa;
  display: flex;
  transition: 0.3s;

  @media (max-width: 1000px) {
    width: 90%;
    right: ${({ visible }) => (visible ? "0" : "-90%")};
  }
`;

export const Toggle = styled.div`
  padding-left: 15px;
  height: 100%;
  background-image: url(${Menu});
  background-size: 25px;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
`;

export const Content = styled.div`
  padding: 15px;
  color: white;
  font-family: arial, sans-serif;
  & p {
    display: flex;
    align-items: center;
    width: auto;
    padding: 10px 15px;
    border: 1px solid white;
    cursor: pointer;
  }

  & img {
    width: 20px;
    height: 20px;
    padding-right: 10px;
  }
`;
