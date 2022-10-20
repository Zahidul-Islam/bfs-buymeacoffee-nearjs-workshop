import { Button, IconButton, InputBase, useMediaQuery } from "@mui/material";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";

export default function BuyACoffee({ userName, wallet, coffeeContract }) {
  const mobile = useMediaQuery("(max-width:600px)");
  const COFFEE_PRICE = 5;
  const [amount, setAmount] = useState(5);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  handleClick = async () => {
    if (amount === 0) {
      setOpen(true);
    }

    const payload = {
      message,
      name,
      amount,
    };

    const coffee = await coffeeContract.buyCoffee(payload);
    console.log(coffee);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div
      style={{
        border: "1px rgba(0,0,0,.10) solid",
        borderRadius: 10,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        width: "100%",
      }}
    >
      <h2>Buy {userName} a coffee</h2>

      <div
        style={{
          border: "1px #ffd3c5 solid",
          borderRadius: 5,
          backgroundColor: "#fff7f5",
          display: "flex",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "4rem", marginRight: 20, marginLeft: 20 }}>
          ☕
        </h1>

        <h4
          style={{ fontWeight: 500, color: "#b2acab", margin: "0 20px 0 0px" }}
        >
          ✖
        </h4>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <IconButton
            sx={{
              width: 40,
              height: 40,
              backgroundColor: amount === 5 ? "#ff6937" : "#FFF",
              color: amount === 5 ? "#FFF" : "#ff6937",
              fontSize: "1rem",
              fontWeight: 600,
              border: "1px #ffd3c5 solid",
              "&:hover": {
                backgroundColor: amount === 5 ? "#ff6937BF" : "#FFFfffBF",
              },
            }}
            onClick={() => setAmount(1 * COFFEE_PRICE)}
          >
            1
          </IconButton>
          <IconButton
            sx={{
              width: 40,
              height: 40,
              backgroundColor: amount === 15 ? "#ff6937" : "#FFF",
              color: amount === 15 ? "#FFF" : "#ff6937",
              fontSize: "1rem",
              fontWeight: 600,
              border: "1px #ffd3c5 solid",
              "&:hover": {
                backgroundColor: amount === 15 ? "#ff6937BF" : "#FFFfffBF",
              },
            }}
            onClick={() => setAmount(3 * COFFEE_PRICE)}
          >
            3
          </IconButton>
          <IconButton
            sx={{
              width: 40,
              height: 40,
              backgroundColor: amount === 25 ? "#ff6937" : "#FFF",
              color: amount === 25 ? "#FFF" : "#ff6937",
              fontSize: "1rem",
              fontWeight: 600,
              border: "1px #ffd3c5 solid",
              "&:hover": {
                backgroundColor: amount === 25 ? "#ff6937BF" : "#FFFfffBF",
              },
            }}
            onClick={() => setAmount(5 * COFFEE_PRICE)}
          >
            5
          </IconButton>

          <InputBase
            sx={{
              border: "1px #e1e1e1 solid",
              borderRadius: "5px",
              backgroundColor: "#FFF",
              paddingInline: "10px",
              width: 40,
              height: 40,
            }}
            type="number"
            placeholder="1"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
          />
        </div>
      </div>

      <InputBase
        sx={{
          border: "1px #e1e1e1 solid",
          borderRadius: "5px",
          backgroundColor: "#FFF",
          paddingInline: "10px",
          width: "100%",
          height: 50,
        }}
        type="text"
        placeholder="Name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <InputBase
        sx={{
          border: "1px #e1e1e1 solid",
          borderRadius: "5px",
          backgroundColor: "#FFF",
          paddingInline: "10px",
          width: "100%",
          height: 150,
        }}
        type="text"
        multiline={true}
        rows={3}
        placeholder="Message (optional)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <Button
        sx={{
          backgroundColor: "#ff6937",
          color: "#FFF",
          height: 45,
          borderRadius: 22,
          textTransform: "none",
          fontWeight: 500,
          fontSize: "1rem",
          "&:hover": {
            backgroundColor: "#ff6937BF",
          },
        }}
        onClick={handleClick}
      >
        Support ${amount || 0}
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Amount can't be $0"
      />
    </div>
  );
}
