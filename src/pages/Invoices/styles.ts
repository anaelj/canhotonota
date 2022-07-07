import styled from "styled-components";

export const MainContainer = styled.div`
  background-color: #fcfcfc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  flex: 2;
  height: 100vh;

  /* align-items: center; */
  /* background: red; */
`;
export const ContainerInvoices = styled.div`
  /* height: auto; */
  margin-top: 0px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  flex: 2;
  /* background: green; */
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
