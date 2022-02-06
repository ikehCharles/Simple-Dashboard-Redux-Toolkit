import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export const BlackButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 13,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  opacity: '.9',
  backgroundColor: "#000000",
  color: "#ffffff",
  borderColor: "#0063cc",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#000000",
    borderColor: "#0062cc",
    color: "#ffffff",
    boxShadow: "none",
    opacity: '1',
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});
