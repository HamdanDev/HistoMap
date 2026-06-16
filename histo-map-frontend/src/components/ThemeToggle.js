const ThemeToggle = ({ themes, theme, onThemeChange }) => (
  <label className="theme-toggle">
    <span>Theme</span>
    <select
      value={theme}
      onChange={(event) => onThemeChange(event.target.value)}
      aria-label="Map theme"
    >
      {themes.map((item) => (
        <option key={item.id} value={item.id}>
          {item.label}
        </option>
      ))}
    </select>
  </label>
);

export default ThemeToggle;
