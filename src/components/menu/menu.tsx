import { useSelector } from "react-redux";
import { MenuOptions } from "../../types/menu.options";
import { Link, useLocation } from "react-router-dom";
import { RootState } from "../../redux/store";

import "./menu.scss";

type PropsType = {
  options: MenuOptions;
};

export function Menu({ options }: PropsType) {
  const location = useLocation();

  const { token } = useSelector((state: RootState) => state.users);

  return (
    <nav>
      <ul>
        {options.map(
          (item) =>
            (!item.protected || token) && (
              <li key={item.label}>
                <Link
                  to={item.url}
                  className={location.pathname === item.url ? "active" : ""}
                >
                  {item.label}
                </Link>
              </li>
            )
        )}
      </ul>
    </nav>
  );
}
