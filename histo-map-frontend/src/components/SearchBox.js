const searchModes = [
  { id: "keyword", label: "Keyword" },
  { id: "title", label: "Title" },
  { id: "person", label: "Person" },
  { id: "place", label: "Place" },
];

const SearchBox = ({ value, mode, onChange, onModeChange }) => (
  <label className="search-box">
    <span>Search</span>
    <select
      value={mode}
      onChange={(event) => onModeChange(event.target.value)}
      aria-label="Search type"
    >
      {searchModes.map((item) => (
        <option key={item.id} value={item.id}>
          {item.label}
        </option>
      ))}
    </select>
    <input
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search the visible archive"
    />
  </label>
);

export default SearchBox;
