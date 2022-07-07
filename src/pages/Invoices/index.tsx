import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdCircle, MdOutlineReceipt } from "react-icons/md";

import { ContainerInvoices, MainContainer } from "./styles";
import { DefaultPalettColors } from "../../assets/colors";
import { db } from "./../../firebase.config";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Card, Row, Col } from "react-bootstrap";
import { getIconStatus } from "../../assets/makeIcon";

import {
  collection,
  getDocs,
  // query,
  // onSnapshot,
  // getDocsFromCache
} from "firebase/firestore";

import { useInvoice } from "../../Shared/contextInvoice";
// import { useOnlineStatus } from '../../Shared/contextOnlineStatus'
import ReactLoading from "react-loading";
interface ICustomer {
  address: string;
  name: string;
}

export interface IInvoice {
  id: string;
  invoice_number: string;
  status: string;
  customer: ICustomer;
  base64_image?: string;
}

export const Invoices = () => {
  // const isOnline = useOnlineStatus();
  const navigate = useNavigate();
  const { setCurrentInvoice, invoices, setInvoices } = useInvoice();
  const invoicesCollectionRef = collection(db, "invoice");
  const [loading, setLoading] = useState(false);
  // const alovelaceDocumentRef = collection("users").doc("alovelace");

  // const [teste, setTeste] = useState("");

  useEffect(() => {
    setLoading(true);
    const getInvoices = async () => {
      getDocs(invoicesCollectionRef)
        .then((data) => {
          // console.log("data::", data);
          // setTeste(JSON.stringify(data.docs));
          setLoading(false);
          if (data.docs.length > 0) {
            setInvoices(
              data.docs.map((doc) => ({
                ...(doc.data() as IInvoice),
                id: doc.id,
              }))
            );
          }
        })
        .catch((error) => {
          console.log("erro", error);
        });
    };

    // if (isOnline) {
    getInvoices();
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectInvoice = (invoice: IInvoice) => {
    setCurrentInvoice(invoice);
    navigate("/ticket");
  };

  return (
    <MainContainer>
      <Header
        icon={
          <MdOutlineReceipt
            color={DefaultPalettColors.invoice.orange}
            size={24}
          />
        }
        label={"Notas"}
      />

      <ContainerInvoices>
        {loading && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <ReactLoading
              type={"cylon"}
              color={"#ff8000"}
              height={"150px"}
              width={"150px"}
            />
          </div>
        )}
        {invoices.map((invoice) => (
          <Card
            key={invoice.invoice_number}
            text={"light"}
            bg={"secondary"}
            style={{ width: "100%", margin: "0px", padding: "0px" }}
            className="mb-2"
            onClick={() => handleSelectInvoice(invoice)}
          >
            <Card.Header>
              <span>Nota: </span>
              <span>{invoice.invoice_number}</span>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <Row style={{ margin: "0px" }}>
                  <Col xs={11} style={{ marginLeft: "0px", padding: "2px" }}>
                    <Row>
                      <span>{invoice.customer.name}</span>
                    </Row>
                    <Row>
                      <span>{invoice.customer.address}</span>
                    </Row>
                  </Col>
                  <Col xs={1} style={{ marginLeft: "0px", padding: "2px" }}>
                    {getIconStatus(invoice.status)}
                  </Col>
                </Row>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </ContainerInvoices>

      <Footer>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <MdCircle color={DefaultPalettColors.invoice.green} />
          <span>Verificado</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <MdCircle color={DefaultPalettColors.invoice.yellow} />
          <span>Enviado</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <MdCircle color={DefaultPalettColors.invoice.red} />
          <span>Pendente</span>
        </div>
      </Footer>
    </MainContainer>
  );
};
