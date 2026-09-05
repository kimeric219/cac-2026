import Counter from "../components/Counter";
import CounterWithProp from "../components/CounterWithProp";

export default function HomePage() {

    return (
        <div className="flex-grow flex flex-col justify-center items-center">
            <div className="text-xl font-bold m-10">Home Page</div>
            <div className="flex space-x-5">
                <Counter />
                <CounterWithProp initialValue={10} />
            </div>
        </div>
    );
}