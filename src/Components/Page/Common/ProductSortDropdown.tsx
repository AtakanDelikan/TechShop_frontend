import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface SortDropdownProps {
  currentSort: string;
  onSortChange: (newSort: string) => void;
}

const ProductSortDropdown: React.FC<SortDropdownProps> = ({ currentSort, onSortChange }) => {
  
  const handleChange = (event: SelectChangeEvent) => {
    onSortChange(event.target.value);
  };

  return (
    <FormControl variant="outlined" size="small" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="sort-select-label">Sort</InputLabel>
      <Select
        labelId="sort-select-label"
        id="sort-select"
        value={currentSort}
        onChange={handleChange}
        label="Sort"
      >
        <MenuItem value="newest">Newest</MenuItem>
        <MenuItem value="price_asc">Price: Low to High</MenuItem>
        <MenuItem value="price_desc">Price: High to Low</MenuItem>
        <MenuItem value="rating">Rating</MenuItem>
      </Select>
    </FormControl>
  );
};

export default ProductSortDropdown;