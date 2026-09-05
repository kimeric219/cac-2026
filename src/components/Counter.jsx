import { useState } from "react";

export default function Counter() {
    const [x, setX] = useState(0);

    function increment() {
        setX(x + 1);
    }


    return (
        <button className="btn btn-info btn-outline" onClick={increment}>Component without prop: {x}</button>
    );
}