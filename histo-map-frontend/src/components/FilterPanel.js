import { categories } from "../data/categories";

const FilterPanel = ({
  category,
  range,
  language,
  limit,
  eventCount,
  onCategoryChange,
  onRangeChange,
  onLanguageChange,
  onLimitChange,
}) => (
  <aside className="filter-panel glass-panel">
    <div className="panel-heading">
      <span className="eyebrow">Archive Filters</span>
      <h2>Collection Scope</h2>
    </div>

    <label className="field-group">
      <span>Category</span>
      <select
        value={category}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        {categories.map((item) => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </select>
    </label>

    <label className="field-group">
      <span>Year range</span>
      <input
        type="number"
        min="0"
        max="500"
        value={range}
        onChange={(event) => onRangeChange(Number(event.target.value))}
      />
    </label>

    <label className="field-group">
      <span>Language</span>
      <select
        value={language}
        onChange={(event) => onLanguageChange(event.target.value)}
      >
        <option value="en">English</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="es">Spanish</option>
        <option value="it">Italian</option>
      </select>
    </label>

    <label className="field-group">
      <span>Result limit</span>
      <input
        type="number"
        min="1"
        max="100"
        value={limit}
        onChange={(event) => onLimitChange(Number(event.target.value))}
      />
    </label>

    <div className="filter-stat">
      <strong>{eventCount}</strong>
      <span>visible records</span>
    </div>
  </aside>
);

export default FilterPanel;
