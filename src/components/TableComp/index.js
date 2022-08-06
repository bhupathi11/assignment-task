import React, {useEffect} from 'react';
import { Table } from 'antd';

const TableComp = ({columns, data}) => {
    return (
        <>
            <Table columns={columns} dataSource={data} />
        </>
    )
}

export default TableComp;