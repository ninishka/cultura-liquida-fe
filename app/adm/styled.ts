import styled from 'styled-components'
import Link from 'next/link'

export const AdmWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const OrderItem = styled(Link)`
  display: flex;
  justify-content: space-around;
  font-weight: 700;
  margin: 10;
  color: #F2C94C;
  letter-spacing: 0.6px;
  text-decoration: underline;

  &:hover {
    color: #F2C94C !important;
    /* text-decoration: underline; */
  }
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.th`
  text-align: center;
  padding: 10px;
  background-color: #F2C94C;
  color: black;
  font-weight: 700;
`;

export const TableRow = styled.tr`
  text-align: left;
  &:nth-child(even) {
    /* background-color: darkslategrey; */
  }
`;

export const TableData = styled.td`
  text-align: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

export const SortIndicator = styled.span`
  margin-left: 10px;
  cursor: pointer;
`;