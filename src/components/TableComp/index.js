import React from "react";
import { Table } from "antd";

const TableComp = ({ columns, data, pagesize }) => {
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ position: ["none", "none"], pageSize: pagesize }}
      />
    </>
  );
};

export default TableComp;
