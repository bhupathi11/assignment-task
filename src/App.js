import React, { useEffect, useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import axios from "axios";
import InputComp from "./components/InputComp";
import TableComp from "./components/TableComp";
import { Typography } from "antd";
const { Text, Link } = Typography;

const url = "https://62e6bd340e5d74566aebd18b.mockapi.io/api/v1/products";

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Color",
    dataIndex: "color",
    key: "color",
  },
  {
    title: "Availability",
    dataIndex: "availability",
    key: "availability",
    render: (text) =>
      text === "in stock" ? (
        <Text type="success">{text[0].toUpperCase() + text.slice(1)}</Text>
      ) : (
        <Text type="danger">{text[0].toUpperCase() + text.slice(1)}</Text>
      ),
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setProducts(res.data.products);
      })
      .then((err) => {
        if (err) console.log(err);
      });
  }, []);

  const handleSearch = (val) => {
    setSearch(val);
  };

  return (
    <section className="App">
      <div className="header">
        <InputComp
          placeholder="Search"
          value={search}
          handleSearch={handleSearch}
        />
      </div>
      <div>
        <TableComp columns={columns} data={products} />
      </div>
    </section>
  );
}

export default App;
