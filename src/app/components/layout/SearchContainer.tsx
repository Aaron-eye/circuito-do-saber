"use client";

import Checkbox from "@mui/material/Checkbox";
import styles from "./searchContainer.module.scss";
import { useEffect, useState } from "react";
import {
  CircularProgress,
  Pagination,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { hashToObject, objectToHash, changeHash } from "@/app/utils/hashTools";

export interface SearchHandler {
  (
    start: number,
    end: number,
    filters: SearchHandlerFilters
  ): Promise<SearchHandlerResult>;
}

const itemsPerPage = 26;

export default function SearchContainer({
  searchSubject,
  filters = [],
  searchHandler,
}: {
  searchSubject: string;
  filters?: string[];
  searchHandler: SearchHandler;
}) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [items, setItems] = useState<JSX.Element[]>([]);
  const [amountOfItems, setAmountOfItems] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const calcStartEnd = (page: number) => {
    return [(page - 1) * itemsPerPage, page * itemsPerPage];
  };
  const [start, end] = calcStartEnd(page);

  const resetItems = async ({
    resetStart = start,
    resetEnd = end,
    filters = {},
  }: {
    resetStart?: number;
    resetEnd?: number;
    filters?: SearchHandlerFilters;
  }) => {
    const { items, amountOfItems } = await searchHandler(resetStart, resetEnd, {
      selectedCategories,
      searchTerm,
      ...filters,
    });
    setItems(items);
    setAmountOfItems(amountOfItems);

    return;
  };

  useEffect(() => {
    const hashFilters = hashToObject();
    console.log(hashFilters);
    if (hashFilters.selectedCategories)
      setSelectedCategories(hashFilters.selectedCategories);
    if (hashFilters.searchTerm) setSearchTerm(hashFilters.searchTerm);
    if (hashFilters.page) setPage(hashFilters.page);

    const setInitialItems = async () => {
      await resetItems({ filters: hashFilters });
      setIsLoading(false);
    };
    setInitialItems();
  }, []);

  //#region Filters
  const handleToggle = async (filter: string) => {
    const newSelectedCategories = selectedCategories.includes(filter)
      ? selectedCategories.filter((f) => f !== filter)
      : [...selectedCategories, filter];

    changeHash({ selectedCategories: newSelectedCategories });
    setSelectedCategories(newSelectedCategories);

    setIsLoading(true);
    await resetItems({
      filters: { selectedCategories: newSelectedCategories },
    });
    setIsLoading(false);
  };

  const filterLabelClassName = isLoading
    ? `${styles["filter-label"]} ${styles["disabled"]}`
    : styles["filter-label"];
  //#endregion

  //#region Pagination
  const paginationHandler = async (event: any, page: number) => {
    changeHash({ page });
    setPage(page);

    setIsLoading(true);
    const [newStart, newEnd] = calcStartEnd(page);
    await resetItems({ resetStart: newStart, resetEnd: newEnd });
    setIsLoading(false);
  };

  const amountOfPages = Math.ceil(amountOfItems / itemsPerPage);

  const ConfiguredPagination = () => (
    <Pagination
      className={styles["pagination"]}
      count={amountOfPages}
      page={page}
      onChange={paginationHandler}
      disabled={isLoading}
    />
  );

  //#endregion

  //#region Search
  const handleTermSearch = async () => {
    changeHash({ searchTerm });

    setIsLoading(true);
    await resetItems({ filters: { searchTerm: searchTerm } });
    setIsLoading(false);
  };

  const resultsText = isLoading
    ? "Pesquisando..."
    : `${amountOfItems} resultados`;
  //#endregion

  return (
    <div className={styles["search-container"]}>
      <div className={styles["sidebar"]}>
        <h1>{searchSubject}</h1>
        <p className={styles.results}>{resultsText}</p>
        {filters.length > 0 && (
          <div className={styles["filter-section"]}>
            <h2>Filtros</h2>
            <div className={styles["filter-list"]}>
              {filters.map((filter) => (
                <div className={styles.filter} key={filter}>
                  <Checkbox
                    key={filter}
                    className={styles["checkbox"]}
                    checked={selectedCategories.includes(filter)}
                    onChange={() => handleToggle(filter)}
                    disabled={isLoading}
                  />
                  <label className={filterLabelClassName}>{filter}</label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={styles["content-container"]}>
        <TextField
          className={styles["search-input"]}
          id="outlined-basic"
          label="Pesquisar"
          variant="outlined"
          disabled={isLoading}
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleTermSearch();
          }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <button onClick={handleTermSearch}>
                    <SearchIcon />
                  </button>
                </InputAdornment>
              ),
            },
          }}
        />

        {amountOfPages > 1 && <ConfiguredPagination />}
        {!isLoading && (
          <>
            {items.length > 0 ? (
              <div className={styles["content"]}>{items}</div>
            ) : (
              <p className={"no-results"}>Nenhum resultado encontrado.</p>
            )}
          </>
        )}
        {isLoading && (
          <div className={styles["loading-container"]}>
            <CircularProgress />
          </div>
        )}
        {amountOfPages > 1 && items.length >= 18 && <ConfiguredPagination />}
      </div>
    </div>
  );
}
