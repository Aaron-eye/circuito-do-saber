type SearchHandlerResult = {
  items: JSX.Element[];
  amountOfItems: number;
};

type SearchHandlerFilters = {
  selectedCategories?: string[];
  searchTerm?: string;
};
