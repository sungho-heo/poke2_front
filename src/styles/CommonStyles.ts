import styled from "styled-components";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 20px;
  width: 100%;
  justify-content: center;
`;

export const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
