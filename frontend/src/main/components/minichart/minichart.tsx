import "./minichart.css";

import { type ListStast } from "../../../type";
interface Props {
  stats: ListStast;
}

export const Minichart: React.FC<Props> = ({ stats }) => {
  return (
    <section className="minichart-container">
      {stats.map((item) => (
        <div
          className="chart"
          style={{
            background: item.color,
          }}
          key={item.id}
        >
          <h3>{item.title}</h3>
          <p>{item.quantity}</p>
        </div>
      ))}
    </section>
  );
};
