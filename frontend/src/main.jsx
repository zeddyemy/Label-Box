import React from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import App from "./App.jsx";

import "./assets/library/esho/esho.css";
import "./assets/css/styles.css"

// Function to get CSS variable value
const getCssVariable = (variable) =>
	getComputedStyle(document.documentElement)
		.getPropertyValue(variable)
		.trim();

// Create theme
const theme = createTheme({
	palette: {
		primary: {
			main: getCssVariable("--theme-clr"),
		},
		secondary: {
			main: getCssVariable("--theme-clr-trans"),
		},
	},
});

// Render the app
const root = createRoot(document.getElementById("root"));
root.render(
	<HelmetProvider>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</HelmetProvider>
);