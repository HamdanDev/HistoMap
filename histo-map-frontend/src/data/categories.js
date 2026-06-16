export const categories = [
  { id: "all", label: "All records", color: "#c9a24f" },
  { id: "battle", label: "Battles", color: "#b44a3f" },
  { id: "assassination", label: "Assassinations", color: "#7c2d47" },
  { id: "invention", label: "Inventions", color: "#2f80a1" },
  { id: "factory", label: "Factories", color: "#7f7a68" },
  { id: "artwork", label: "Artworks", color: "#a75ca8" },
  { id: "treaty", label: "Treaties", color: "#4d8a63" },
  { id: "disaster", label: "Disasters", color: "#d06d2f" },
  { id: "revolution", label: "Revolutions", color: "#c13f58" },
  { id: "monument", label: "Monuments", color: "#a98749" },
  { id: "philosopher", label: "Philosophers", color: "#6b73b8" },
  { id: "scientist", label: "Scientists", color: "#258f8f" },
  { id: "artist", label: "Artists", color: "#c06aa1" },
  { id: "ruler", label: "Rulers", color: "#8460a8" },
  { id: "speech", label: "Speeches", color: "#d49a34" },
  { id: "discovery", label: "Discoveries", color: "#3c9f7a" },
  { id: "photo", label: "Photos", color: "#5a91d6" },
];

export const categoryColorMap = categories.reduce((colors, category) => {
  colors[category.id] = category.color;
  return colors;
}, {});

export const getCategoryColor = (category) =>
  categoryColorMap[category] || categoryColorMap.all;
