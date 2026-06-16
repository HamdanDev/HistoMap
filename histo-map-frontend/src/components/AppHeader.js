import SearchBox from "./SearchBox";
import ThemeToggle from "./ThemeToggle";

const AppHeader = ({
  searchTerm,
  searchMode,
  onSearchChange,
  onSearchModeChange,
  themes,
  theme,
  onThemeChange,
}) => (
  <header className="app-header glass-panel">
    <div className="brand-block">
      <span className="brand-kicker">Historical Atlas</span>
      <h1>HistoMap Europe</h1>
    </div>
    <div className="header-tools">
      <SearchBox
        value={searchTerm}
        mode={searchMode}
        onChange={onSearchChange}
        onModeChange={onSearchModeChange}
      />
      <ThemeToggle themes={themes} theme={theme} onThemeChange={onThemeChange} />
    </div>
  </header>
);

export default AppHeader;
