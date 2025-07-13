import React, { useEffect } from "react";
import { Table, Button, message, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchInvoices,
  setSelectedInvoice,
} from "../features/invoices/invoiceSlice";
import { useNavigate } from "react-router-dom";

const Invoices = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading, error } = useSelector((state) => state.invoices);
  console.log("Redux'taki fatura listesi:", list);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.jwt) {
      dispatch(fetchInvoices({ jwt: user.jwt }));
    }
  }, [dispatch, user]);

  useEffect(() => {
    console.log("Redux'taki fatura listesi:", list);
  }, [list]);

  const columns = [
    {
      title: "Fatura No",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
    },
    {
      title: "Tutar",
      dataIndex: "payableAmount",
      key: "payableAmount",
    },

    {
      title: "Detay",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => {
            dispatch(setSelectedInvoice(record)); 
            navigate(`/invoice/${record.id}`);
 
          }}
        >
          Detay
        </Button>
      ),
    },
  ];

  if (loading) return <Spin />;

  if (error) {
    message.error(error);
    return <div>Hata: {error}</div>;
  }

  const dummyData = [
    {
      id: "1",
      invoiceNumber: "TEST-001",
      payableAmount: 100.0,
    },
    {
      id: "2",
      invoiceNumber: "TEST-002",
      payableAmount: 200.0,
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h1>Fatura Listesi</h1>
      <Table rowKey="id" columns={columns} dataSource={dummyData} />
     
    </div>
  );
};

export default Invoices; 