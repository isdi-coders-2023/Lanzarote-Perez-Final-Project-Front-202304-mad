import { useSelector } from "react-redux";
import { MenuOptions } from "../../types/menu.options";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";

type PropsType = {
  options: MenuOptions;
};

export function Menu({ options }: PropsType) {
  const { token } = useSelector((state: RootState) => state.user);

  return (
    <nav>
      <ul>
        {options.map(
          (item) =>
            (!item.protected || token) && (
              <li key={item.label}>
                <Link to={item.url}>{item.label}</Link>
              </li>
            )
        )}
      </ul>
    </nav>
  );
}
