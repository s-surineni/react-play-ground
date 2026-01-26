import { useEffect, useState } from "react";
import axios from "axios";
const BasicUseEffect = () => {
    const [joke, setJoke] = useState(null);
    useEffect(() => {
        axios.get("https://official-joke-api.appspot.com/random_joke").then((response) => {
            setJoke(response.data);
        });
    }, []);
    return (
        <div>
            <h1>Basic Use Effect</h1>
            <p>{joke?.setup}</p>
            <p>{joke?.punchline}</p>
        </div>
    )
}

export default BasicUseEffect;
