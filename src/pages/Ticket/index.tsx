import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Row, Col, Button } from "react-bootstrap";

import { Container, MainContainer } from "./styles";
import {
  MdLocalShipping,
  MdCheck,
  MdAddAPhoto,
  MdArrowBack,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
// import { expenseCategory } from '../../mocks'
import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react";

export const Ticket = () => {
  const videoConstraints = {
    facingMode: { exact: "environment" },
    // facingMode: "user",
  };

  const webcamRef = useRef<Webcam>(null);
  const [imageFromCamera, setImageFromCamera] = useState("");

  const capture = useCallback(() => {
    if (webcamRef) {
      console.log(webcamRef);
      const imageFromCamera = webcamRef?.current?.getScreenshot();
      if (imageFromCamera) {
        setShowCamera(false);
        setImageFromCamera(imageFromCamera);
      }
    }
  }, [webcamRef]);

  const [showCamera, setShowCamera] = useState(false);

  const navigate = useNavigate();
  return (
    <MainContainer>
      <Header
        icon={<MdLocalShipping color="#FB8500" size={24} />}
        label={"Foto"}
      />
      <Container>
        {!showCamera && (
          <>
            <Row
              style={{
                width: "100%",
                border: "1px dashed black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {imageFromCamera !== "" ? (
                <img src={imageFromCamera} alt={""} />
              ) : (
                <MdAddAPhoto size={150} onClick={() => setShowCamera(true)} />
              )}
            </Row>
          </>
        )}
        {showCamera && (
          <div style={{ maxWidth: "90%" }}>
            <Webcam
              audio={false}
              ref={webcamRef}
              width={350}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
            <Button onClick={capture}>Capturar Imagem</Button>
          </div>
        )}
      </Container>
      <Footer>
        <Row
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Col xs={1}>
            <MdArrowBack size={32} onClick={() => navigate("/invoices")} />
          </Col>
          <Col xs={2}>
            <MdCheck size={32} onClick={() => navigate("/invoices")} />
          </Col>
        </Row>
      </Footer>
    </MainContainer>
  );
};
