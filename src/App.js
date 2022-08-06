import React, { useEffect, useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import axios from "axios";
import Select from "react-select";
import InputComp from "./components/InputComp";
import TableComp from "./components/TableComp";
import { Tag } from "antd";

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
        <Tag color={"green"} key={text}>
          {text[0].toUpperCase() + text.slice(1)}
        </Tag>
      ) : (
        <Tag color={"red"} key={text}>
          {text[0].toUpperCase() + text.slice(1)}
        </Tag>
      ),
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [colorOption, setColorOption] = useState([]);
  const [availOption, setAvailOption] = useState([]);
  const [selectedColors, setSelectedColor] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        const data = res.data.products.map((el) => ({ ...el, key: el.id }));
        let colors = data.map((el) => el.color);
        colors = [...new Set(colors)];
        colors = colors.map((el) => ({ value: el, label: el }));
        let avail = data.map((el) => el.availability);
        avail = [...new Set(avail)];
        avail = avail.map((el) => ({ value: el, label: el }));
        setProducts(data);
        setColorOption(colors);
        setAvailOption(avail);
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

  const handleColorFilter = (colors) => {
    setSelectedColor(colors);
    const data = search.length > 3 ? filterData : products;
    const col = colors.map((el) => el.value);
    const arr = data.filter((el) => col.includes(el.color));
    setFilterData(arr);
  };

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    const data = search.length > 3 ? filterData : products;
    const sta = status.map((el) => el.value);
    const arr = data.filter((el) => sta.includes(el.availability));
    setFilterData(arr);
  };

  return (
    <section className="App">
      <div className="header">
        <InputComp
          placeholder="Search by name"
          value={search}
          handleSearch={handleSearch}
        />
        <div className="filters">
          <div>
            <Select
              name="color"
              isMulti
              options={colorOption}
              onChange={(color) => handleColorFilter(color)}
            />
          </div>
          <div>
            <Select
              name="availability"
              isMulti
              options={availOption}
              onChange={(status) => handleStatusFilter(status)}
            />
          </div>
        </div>
      </div>
      <div>
        <TableComp
          columns={columns}
          data={
            selectedStatus.length > 0 ||
            selectedColors.length > 0 ||
            (search.length > 3 && filterData)
              ? filterData
              : products
          }
        />
      </div>
    </section>
  );
}

export default App;
