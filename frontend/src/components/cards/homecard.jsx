import "./homecard.css";
export default function Card2({ title, text, icon: IconComponent }) {
  return (
    <div className="card">
      <div className="icon">
        <IconComponent
          className="community-icon"
          style={{
            fill: "white",
          }}
          width="40px"
          height="40px"
        />
      </div>
      <p className="title">{title}</p>
      <p className="text">{text}</p>
    </div>
  );
}
