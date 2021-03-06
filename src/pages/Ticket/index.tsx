import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Row, Col, Button } from "react-bootstrap";
// import { getStorage, ref, uploadString } from "@firebase/storage";
import { Container, MainContainer } from "./styles";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./../../firebase.config";

import { MdDelete, MdAddAPhoto, MdArrowBack, MdCamera } from "react-icons/md";
import { useNavigate } from "react-router-dom";
// import { expenseCategory } from '../../mocks'
import Webcam from "react-webcam";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInvoice } from "../../Shared/contextInvoice";
import { EnumStatusInvoiceTicket } from "../../mocks";

export const Ticket = () => {
  // const storage = getStorage();
  // const invoicesCollectionRef = collection(db, "invoice");

  const { currentInvoice, setInvoices, invoices } = useInvoice();
  const videoConstraints = {
    facingMode: { exact: "environment" },
    // facingMode: "user",
  };

  const webcamRef = useRef<Webcam>(null);
  const [imageFromCamera, setImageFromCamera] = useState("");

  const capture = useCallback(() => {
    if (webcamRef) {
      const imageTaked = webcamRef?.current?.getScreenshot();
      if (imageTaked) {
        setShowCamera(false);
        setImageFromCamera(imageTaked);
        updateLocalInvoice(imageTaked);
        updateInvoice(imageTaked);
        // console.log(imageFromCamera);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webcamRef]);

  const [showCamera, setShowCamera] = useState(false);

  const navigate = useNavigate();

  const updateLocalInvoice = (
    image: string,
    firebaseUpdated: boolean = false
  ) => {
    const newInvoices = invoices.map((invoice) => {
      return invoice?.id === currentInvoice?.id
        ? {
            ...currentInvoice,
            base64_image: image,
            status: firebaseUpdated
              ? EnumStatusInvoiceTicket.sent
              : EnumStatusInvoiceTicket.pending,
          }
        : invoice;
    });
    setInvoices(newInvoices);
  };

  const updateInvoice = async (image: string) => {
    if (currentInvoice?.id) {
      const invoiceDoc = doc(db, "invoice", currentInvoice.id);
      await updateDoc(invoiceDoc, {
        ...currentInvoice,
        base64_image: image,
        status:
          image === ""
            ? EnumStatusInvoiceTicket.pending
            : EnumStatusInvoiceTicket.sent,
      });
      // alert("Foto enviada!");
    }
  };

  useEffect(() => {
    if (imageFromCamera === "" && currentInvoice?.base64_image === "") {
      setShowCamera(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFromCamera]);

  useEffect(() => {
    setImageFromCamera(currentInvoice?.base64_image || "");
  }, [currentInvoice]);

  const handleDeleImage = () => {
    setImageFromCamera("");
    updateInvoice("");
  };

  // useEffect(() => {
  //   const handleUpload = async () => {
  //     const fileName = new Date().getTime();
  //     const storageRef = ref(storage, `/images/${fileName}.png`);

  //     uploadString(storageRef, imageFromCamera, "data_url").then((snapshot) => {
  //       console.log(snapshot);
  //     });
  //   };
  //   handleUpload();
  // }, [imageFromCamera]);

  return (
    <MainContainer>
      <Header icon={<MdCamera color="#FB8500" size={24} />} label={"Foto"} />
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
            <MdDelete size={32} onClick={handleDeleImage} />
          </Col>
          <Col xs={2}>
            <MdArrowBack size={32} onClick={() => navigate("/invoices")} />
          </Col>
        </Row>
      </Footer>
    </MainContainer>
  );
};
