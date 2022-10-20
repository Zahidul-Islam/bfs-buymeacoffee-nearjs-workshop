import "regenerator-runtime/runtime";
import React, { useState, useEffect } from "react";
import BuyACoffee from "./components/BuyACoffee";
import TopSection from "./components/TopSection";
import AboutSection from "./components/AboutSection";
import RecentSupportersSection from "./components/RecentSupportersSection";
import { useMediaQuery } from "@mui/material";
import config from "./config";

export default function App({ isSignedIn, coffeeContract, wallet }) {
  const [coffees, setCoffees] = useState();
  const [loading, setLoading] = useState(true);
  const mobile = useMediaQuery("(max-width:600px)");

  // Get blockchian state once on component load
  useEffect(() => {
    coffeeContract
      .getAllCoffee()
      .then(setCoffees)
      .catch(alert)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <TopSection
        wallet={wallet}
        name={config.name}
        headline={config.headline}
        avatar={config.avatar}
        coverArt={config.coverArt}
      />

      <div className="container" style={{ marginTop: 40 }}>
        <div
          className="content"
          style={
            mobile
              ? { display: "flex", flexDirection: "column-reverse", gap: 20 }
              : { display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }
          }
        >
          <div>
            <AboutSection date={config.date} about={config.about} />

            <RecentSupportersSection coffees={coffees} />
          </div>

          <BuyACoffee wallet={wallet} coffeeContract={coffeeContract} />
        </div>
      </div>
    </>
  );
}
