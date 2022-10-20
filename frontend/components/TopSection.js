import { Avatar, Button } from "@mui/material";
import React from "react";
import { async } from "regenerator-runtime";

export default function TopSection({
  name,
  headline,
  avatar,
  coverArt,
  wallet,
}) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            height: 350,
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{ width: "100vw", minWidth: 550 }}
            src={coverArt}
            alt="cover art"
            loading="lazy"
          />
        </div>

        <Avatar
          sx={{ width: 200, height: 200, position: "absolute", bottom: -100 }}
          alt={name}
          src={avatar}
        />
      </div>

      <div
        style={{
          paddingTop: 115,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
        }}
      >
        <h1>{name}</h1>
        <p>{headline}</p>
      </div>

      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          backgroundColor: "#FFF",
          borderRadius: 20,
          height: 40,
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "0 2px 0 10px",
        }}
      >
        {wallet.accountId ? (
          <>
            <h5>{wallet.accountId}</h5>

            <Button
              variant="outlined"
              size="small"
              style={{ borderRadius: 20, textTransform: "none" }}
              onClick={async () => await wallet.signOut()}
            >
              Disconnect
            </Button>
          </>
        ) : (
          <>
            <Button
              size="small"
              style={{ borderRadius: 20, textTransform: "none" }}
              onClick={async () => await wallet.signIn()}
            >
              Connect NEAR Wallet
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
