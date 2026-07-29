import "./filterBar.css";

interface Props {
  showmodal: boolean;
  setshow: (showmodal: boolean) => void;
  filter: string;
  setfilter: (item: string) => void;
}

export const Searchfilters: React.FC<Props> = ({
  showmodal,
  setshow,
  filter,
  setfilter,
}) => {
  const filters = ["all", "pending", "in process", "completed"];

  return (
    <section className="Search-container CardStyle ">
      <div className="filters-container">
        {filters.map((item) => (
          <button
            key={item}
            className={filter === item ? "filter active" : "filter"}
            onClick={() => setfilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="search-container">
        <button
          onClick={() => {
            setshow(!showmodal);
          }}
        >
          Add new task
        </button>
      </div>
    </section>
  );
};
