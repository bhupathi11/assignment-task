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
    title: "#",
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
        const data = res.data.products.map((el) => ({ ...el, key: el.id }));
        setProducts(data);
      })
      .then((err) => {
        if (err) console.log(err);
      });
  }, []);

  const handleSearch = (val) => {
    setSearch(val);
    if (val.length > 3) {
      const arr = products.filter((item) =>
        item.name.toLowerCase().includes(val.toLowerCase())
      );
      setFilterData(arr);
    }
  };

  return (
    <section className="App">
      <div className="header">
        <InputComp
          placeholder="Search by name"
          value={search}
          handleSearch={handleSearch}
        />
      </div>
      <div>
        <TableComp
          columns={columns}
          data={search.length > 3 && filterData ? filterData : products}
        />
      </div>
    </section>
  );
}

export default App;
