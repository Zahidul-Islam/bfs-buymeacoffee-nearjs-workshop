export default function AboutSection({ date, about }) {
  return (
    <div
      style={{
        border: "1px rgba(0,0,0,.10) solid",
        borderRadius: 10,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <p style={{ fontSize: ".8rem", fontWeight: 500, color: "#717171" }}>
        {date}
      </p>
      <p style={{ fontWeight: 400, color: "#222222" }}>{about}</p>
    </div>
  );
}
