import { useAppDispatch, useAppSelector } from "../store/hookStore";
import { decrement, increment, selectCount } from "../features/counter/counter";
import { BlueButton} from "../components/common/BlueButton";

function Home() {
  const { value } = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  return (
    <>
      <main className="flex items-center flex-col ">
        <h1 className="text-3xl">Vite + React</h1>
        <h4 className="text-xl my-56">This is Home page</h4>
        <div>
          <BlueButton label={"increment"} onClick={() => dispatch(increment())} />
          <BlueButton label={"decrement"} onClick={() => dispatch(decrement())} />
          <h3>count is {value}</h3>
        </div>
      </main>
    </>
  );
}

export default Home;
