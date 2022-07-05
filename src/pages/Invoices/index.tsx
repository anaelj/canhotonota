import React from "react";
import { useNavigate } from "react-router-dom";
import { MdCircle, MdLocalShipping } from "react-icons/md";

import { ContainerInvoices, MainContainer } from "./styles";
import { DefaultPalettColors } from "../../assets/colors";

import { invoices } from "../../mocks";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Card, Row, Col } from "react-bootstrap";
import { getIconStatus } from "../../assets/makeIcon";

export const Invoices = () => {
  const navigate = useNavigate();

  return (
    <MainContainer>
      <Header
        icon={
          <MdLocalShipping
            color={DefaultPalettColors.invoice.orange}
            size={24}
          />
        }
        label={"Notas"}
      />
      <ContainerInvoices>
        {invoices.map((invoice) => (
          <Card
            key={invoice.invoice_number}
            text={"light"}
            bg={"secondary"}
            style={{ width: "100%", margin: "0px" }}
            className="mb-2"
            onClick={() => navigate("/ticket")}
          >
            <Card.Header>
              <span>Noda: </span>
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
        <div>
          <MdCircle color={DefaultPalettColors.invoice.green} />
          <span>Concluído</span>
        </div>
        <div>
          <MdCircle color={DefaultPalettColors.invoice.orange} />
          <span>Em andamento</span>
        </div>
      </Footer>
    </MainContainer>
  );
};
