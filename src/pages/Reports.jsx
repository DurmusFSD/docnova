import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const Reports = () => {
  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Raporlar Sayfası</Title>
      <p>Burada sistem raporları listelenecek.</p>
    </div>
  );
};

export default Reports;
