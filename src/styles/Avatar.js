import styled from "styled-components";

const Avatar = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  object-fit: cover;

  @media screen and (max-width: 500px) {
    width: 26px;
    height: 26px;
    border-radius: 13px;
  }
`;

export default Avatar;
