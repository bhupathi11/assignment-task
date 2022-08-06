import React from "react";
import { Input } from "antd";

const InputComp = ({ placeholder, value, handleSearch }) => {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
};

export default InputComp;
