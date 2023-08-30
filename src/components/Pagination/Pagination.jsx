import React from "react";
import { usePagination ,DOTS } from './usePagination';


export default function Pagination({
    onPageChange,
    siblingCount =1,
    totalCount,
    currentPage,
    pageSize
  }) {

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
      });

    // If there are less than 2 times in pagination range we shall not render the component
    if (currentPage === 0 || paginationRange.length < 2) {
    return null;
    }

    const onNext = () => {
    onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
    onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];


    return (
<>  </>
    );
  }