import { Box, TextField } from "@mui/material";

const SearchBar = ({ title, input, setInput }) => {
  return (
    <Box>
      <TextField
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={title}
        fullWidth
      />
    </Box>
  );
};

export default SearchBar;
