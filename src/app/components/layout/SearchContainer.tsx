"use client";

import Checkbox from "@mui/material/Checkbox";
import styles from "./searchContainer.module.scss";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const setInitialItems = async () => {
      const initialItems = await searchHandler([]);
      setItems(initialItems);
    };
    setInitialItems();
  }, []);

  const handleToggle = async (filter: string) => {
    const newSelectedFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter((f) => f !== filter)
      : [...selectedFilters, filter];

    setSelectedFilters(newSelectedFilters);
    const newItems = await searchHandler(newSelectedFilters);
    setItems(newItems);
  };

  const filterSection = (
    <div className={styles["filter-section"]}>
      <h2>Filtros</h2>
      <div className={styles["filter-list"]}>
        {filters.map((filter) => (
          <div className={styles.filter} key={filter}>
            <Checkbox
              className={styles["checkbox"]}
              checked={selectedFilters.includes(filter)}
              onChange={() => handleToggle(filter)}
            />
            <label>{filter}</label>
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
      <div className={styles["content"]}>{items}</div>
    </div>
  );
}
