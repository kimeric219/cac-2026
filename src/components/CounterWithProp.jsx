import { useState } from "react";

export default function ({ initialValue }) {
    const [x, setX] = useState(initialValue);

    function increment() {
        setX(x + 1);
    }


    return (
        <button className="btn btn-info btn-outline" onClick={increment}>Component with prop: {x}</button>
    );
}