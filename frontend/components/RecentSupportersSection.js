import { Avatar } from "@mui/material";
import React from "react";

export default function RecentSupportersSection(props) {
  return (
    <div style={{ paddingTop: 40 }}>
      <h4 style={{ color: "#717171", fontWeight: 500 }}>RECENT SUPPORTERS</h4>

      {props.coffees?.map((suppoter, index) => (
        <Supporter
          key={index}
          name={suppoter.name || "Someone"}
          avatar="https://cdn.buymeacoffee.com/uploads/profile_pictures/default/FF813F/KR.png"
          description={suppoter.message}
        />
      ))}
    </div>
  );
}

const Supporter = ({ name, avatar, description }) => {
  return (
    <div
      style={{
        marginTop: 20,
        border: "1px rgba(0,0,0,.10) solid",
        borderRadius: 10,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          gap: 10,
        }}
      >
        <Avatar src={avatar}>{name[0]}</Avatar>

        <div>
          <h5 style={{ color: "#222222" }}>
            {`${name} `}
            <span style={{ fontWeight: 400, color: "#717171" }}>
              bought a coffee
            </span>
          </h5>

          <p style={{ fontWeight: 400, color: "#222222" }}>{description}</p>
        </div>
      </div>
    </div>
  );
};
