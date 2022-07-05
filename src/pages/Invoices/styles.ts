import styled from "styled-components";

export const MainContainer = styled.div`
  height: 100vh;
  background-color: #fcfcfc;
  display: flex;
  flex-direction: column;
`;
export const ContainerInvoices = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  gap: 1rem;
  overflow-y: scroll;
`;

export const CardTravel = styled.div`
  width: 100%;
  height: 100px;
  border-radius: 10px;
  background-color: #e9ecef;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
