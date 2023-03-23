import { FC } from "react"
import { ISelect } from "./MySelect.interface"
import styles from "./MySelect.module.scss"

export const MySelect: FC<ISelect> = ({
  options,
  defaultValue,
  defaultName,
  value,
  title,
  onChange,
}) => {
  return (
    <div className={styles.wrapper}>
      <p>{title} :</p>
      <select
        className={styles.select}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value={defaultValue}>{defaultName}</option>
        {options.map((option) => (
          <option key={option.name} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  )
}
