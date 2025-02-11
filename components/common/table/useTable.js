import { useEffect, useRef, useState } from "react";
import TABLE_CELL_TYPE from "utilize/constant/tableColumnType";
import {
  timeStampChangeToJalaiDate,
  timeStampChangeToJalaiTime,
} from "utilize/date";
import numberUtils from "utilize/numberUtils";
import BadgeStatus from "../badgeStatus/BadgeStatus";

const EMPTY_STATE = "-";

const useTable = ({ fetchData, pageSize }) => {
  const fetchDataRef = useRef(fetchData);
  const [currentPage, setCurrentPage] = useState(1);

  const renderCell = (rowData, cellId, type, render) => {
    const value = rowData?.[cellId] || EMPTY_STATE;

    switch (type) {
      case TABLE_CELL_TYPE.CUSTOM:
        return typeof render === "function"
          ? render(rowData) || EMPTY_STATE
          : value;
      case TABLE_CELL_TYPE.DATE:
        return timeStampChangeToJalaiDate(value) || EMPTY_STATE;
      case TABLE_CELL_TYPE.TIME:
        return (
          timeStampChangeToJalaiTime(value, { hasSeconds: false }) ||
          EMPTY_STATE
        );
      case TABLE_CELL_TYPE.NUMBER:
        return numberUtils.commaSeparated(value);
      // TODO: @ali: Remove BADGE type
      case TABLE_CELL_TYPE.BADGE:
        return (
          <BadgeStatus className="badge" color="WARNING">
            {value}
          </BadgeStatus>
        );

      default:
        return value;
    }
  };

  useEffect(() => {
    fetchDataRef.current = fetchData;
  }, [fetchData]);

  useEffect(() => {
    fetchDataRef.current?.(pageSize, currentPage);
  }, [currentPage, pageSize]);

  return {
    currentPage,
    setCurrentPage,
    renderCell,
  };
};

export default useTable;
