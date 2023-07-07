import { SyntheticEvent } from "react";
import styles from "./filter.module.scss";
import { useUsers } from "../../hooks/use.user";

export function Filter() {
  const { handleFilterUsers } = useUsers();
  const handleSelect = (event: SyntheticEvent) => {
    const element = event.target as HTMLSelectElement;
    if (element.name === "location") {
      const filter = `?location=${element.value}`;
      return handleFilterUsers(filter);
    }
    if (element.name === "carFuel") {
      const filter = `?carFuel=${element.value}`;
      return handleFilterUsers(filter);
    }
  };

  return (
    <div className={styles.filter}>
      <select name="location" onChange={handleSelect}>
        <option>User Location</option>
        <option value="Aragón">Aragón</option>
        <option value="Asturias">Asturias</option>
        <option value="Andalucía">Andalucía</option>
        <option value="Cantabria">Cantabria</option>
        <option value="Cataluña">Cataluña</option>
        <option value="Castilla-La Mancha">Castilla-La Mancha</option>
        <option value="Extremadura">Extremadura</option>
        <option value="Galicia">Galicia</option>
        <option value="Pais Vasco">Pais Vasco</option>
        <option value="La Rioja">La Rioja</option>
        <option value="Madrid">Madrid</option>
        <option value="Murcia">Murcia</option>
        <option value="Navarra">Navarra</option>
        <option value="Valencia">Valencia</option>
      </select>
      <select
        className={styles.select__button}
        name="gender"
        onChange={handleSelect}
      >
        <option>Fuel Type</option>
        <option value="gasoline">gasoline</option>
        <option value="diesel">diesel</option>
        <option value="hybrid">hybrid</option>
        <option value="electric">electric</option>
        <option value="bioFuel">bioFuel</option>
      </select>
      {/* <input
        className={styles.textbox}
        type="textbox"
        name="name"
        onChange={handleSelect}
        placeholder="What r u looking 4?"
      ></input> */}
      <button className={styles.reset} name="reset" onClick={handleSelect}>
        Reset
      </button>
    </div>
  );
}
