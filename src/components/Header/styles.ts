import styled from "styled-components";

export const Container = styled.div`
  background: #023047;
  width: 100%;
  flex: 1;
  max-height: 120px;

  header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 115px;
    margin: 0px;
    padding: 0px;

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;

      div {
        margin-right: 5px;
        color: white;
        background: white;
        border-radius: 50px;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 24px;
          height: auto;
        }
      }
      span {
        color: white;
        font-size: 32px;
      }
    }
  }
`;
