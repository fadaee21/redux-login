import { useAppDispatch } from "../store/hookStore";
import { decrement, increment } from "../features/auth/authSlice";
import { BlueButton } from "../components/common/BlueButton";

function Cart() {
  const dispatch = useAppDispatch();

  return (
    <>
      <div>
        <BlueButton
          label={"add to cart"}
          onClick={() => dispatch(increment())}
        />
        <BlueButton
          label={"remove from the cart"}
          onClick={() => dispatch(decrement())}
        />
      </div>
    </>
  );
}

export default Cart;
