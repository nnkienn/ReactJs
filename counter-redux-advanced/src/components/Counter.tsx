import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { descrement, increment, reset } from "../store/counterSlice";


export default function Counter() {
    const count = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch()

    return (
        <div>
            <h2>Count : {count}</h2>
            <button onClick={() => dispatch(increment())}>Tang</button>
            <button onClick={() => dispatch(descrement())}>Tang</button>
            <button onClick={() => dispatch(reset())}>reset</button>
        </div>
    )
}