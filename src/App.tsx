import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import useFirebase from "./scripts/useFirebase";

function App() {
    const { data } = useFirebase("test");

    return <>{JSON.stringify(data, null, 4)}</>;
}

export default App;
