const CATEGORIES = ["All", "Wot", "Tibs", "Kitfo", "Sides"];

function CategoryBar({ selected, onSelect }) {
  return (
    <div className="filter-bar">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          className={selected === cat ? "active" : ""}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryBar;
