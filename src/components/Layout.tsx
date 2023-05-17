import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hookStore";
import { logout, selectAuth } from "../features/auth/authSlice";
import { BlueButton } from "./common/BlueButton";
const Layout = () => {
  const { user, counter, isSuccess } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const routesList = [
    { path: "/", label: "HOME" },
    { path: "/login", label: "LOGIN" },
    { path: "/cart", label: "CART" },
  ];

  const conditionalContent = user?.user ? (
    <>
      <h1 className="text-4xl">HELLO {user?.user.name}</h1>
      <h1 className="text-2xl"> your cart has {counter} books</h1>
      <BlueButton
        onClick={async () => {
          await dispatch(logout(user.token));
          if (isSuccess) {
            console.log(isSuccess);
            navigate("/");
          }
        }}
        label="LOGOUT"
      />
    </>
  ) : (
    <>
      <h1 className="text-4xl">HELLO FRIEND</h1>
    </>
  );

  return (
    <main className=" bg-slate-800 min-h-screen">
      <div className="container mx-auto text-sky-400">
        {conditionalContent}
        <nav>
          <ul className="flex space-x-4 mt-10">
            {routesList.map((page) => (
              <li
                key={page.label}
                className={`px-2 py-1 bg-gray-600 rounded-lg`}
              >
                <NavLink
                  to={page.path}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "text-red-300"
                      : isActive
                      ? "text-green-300"
                      : ""
                  }
                >
                  {page.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <hr className="mb-5" />
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
