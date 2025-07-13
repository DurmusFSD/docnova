import React from "react";
import { useSelector } from "react-redux";
import { Descriptions, Button } from "antd";
import { useNavigate } from "react-router-dom";

const InvoiceDetail = () => {
  const invoice = useSelector((state) => state.invoices.selected);
  const navigate = useNavigate();

  if (!invoice) {
    return <div>Fatura seçilmedi veya bulunamadı.</div>;
  }

  return (
    <div style={{ padding: 24 }}>
      <Button
        type="primary"
        onClick={() => navigate(-1)}
        style={{ marginBottom: 16 }}
      >
        Geri Dön
      </Button>

      <Descriptions title="Fatura Detayları" bordered column={1}>
        <Descriptions.Item label="Fatura No">
          {invoice.invoiceNumber}
        </Descriptions.Item>
        <Descriptions.Item label="Tutar">
          {invoice.payableAmount} {invoice.currency}
        </Descriptions.Item>
        <Descriptions.Item label="Oluşturulma Tarihi">
          {new Date(invoice.createdTime).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="Durum">
          {invoice.status || "Bilinmiyor"}
        </Descriptions.Item>
        <Descriptions.Item label="Ödeme Durumu">
          {invoice.paymentDetails?.paymentStatus || "Bilinmiyor"}
        </Descriptions.Item>
        <Descriptions.Item label="Referans Belge">
          {invoice.referenceDocument || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Son Güncelleme Tarihi">
          {new Date(invoice.lastUpdatedTime).toLocaleDateString()}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default InvoiceDetail;
