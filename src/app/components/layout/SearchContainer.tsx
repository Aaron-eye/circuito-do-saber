"use client";

import Checkbox from "@mui/material/Checkbox";
import styles from "./searchContainer.module.scss";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

export default function SearchContainer({
  searchSubject,
  filters = [],
  searchHandler,
}: {
  searchSubject: string;
  filters?: string[];
  searchHandler: (selectedFilters: string[]) => Promise<any>;
}) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const setInitialItems = async () => {
      const hashContent = window.location.hash.slice(1);
      let initialFilters: string[] = [];
      if (hashContent) {
        initialFilters = hashContent.split(",");
        setSelectedFilters(hashContent.split(","));
      }

      const initialItems = await searchHandler(initialFilters);
      setItems(initialItems);
      setIsLoading(false);
    };
    setInitialItems();
  }, []);

  const handleToggle = async (filter: string) => {
    const newSelectedFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter((f) => f !== filter)
      : [...selectedFilters, filter];

    window.location.hash = newSelectedFilters.join(",");
    setSelectedFilters(newSelectedFilters);

    setIsLoading(true);
    const newItems = await searchHandler(newSelectedFilters);
    setItems(newItems);
    setIsLoading(false);
  };

  const filterLabelClassName = isLoading
    ? `${styles["filter-label"]} ${styles["disabled"]}`
    : styles["filter-label"];

  const filterSection = (
    <div className={styles["filter-section"]}>
      <h2>Filtros</h2>
      <div className={styles["filter-list"]}>
        {filters.map((filter) => (
          <div className={styles.filter} key={filter}>
            <Checkbox
              key={filter}
              className={styles["checkbox"]}
              checked={selectedFilters.includes(filter)}
              onChange={() => handleToggle(filter)}
              disabled={isLoading}
            />
            <label className={filterLabelClassName}>{filter}</label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles["search-container"]}>
      <div className={styles["sidebar"]}>
        <h1>{searchSubject}</h1>
        {/* <p className={styles.results}>x resultados</p> */}
        {filters.length > 0 && filterSection}
      </div>

      <div className={styles["content-container"]}>
        {isLoading && (
          <div className={styles["loading-container"]}>
            <CircularProgress />
          </div>
        )}
        {!isLoading && items.length > 0 && (
          <div className={styles["content"]}>{items}</div>
        )}
        {!isLoading && items.length == 0 && (
          <p className={"no-results"}>Nenhum resultado encontrado.</p>
        )}
      </div>
    </div>
  );
}
