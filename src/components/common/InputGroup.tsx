import { ChangeEvent, FC, InputHTMLAttributes } from "react"

interface InputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string,
  type?: "text" | "password" | "email", // необов'язкове поле, яке може приймати "text" | "password" | "email"
  field: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void // функція, яка приймає InputElement та нічого не повертає
}

const InputGroup: FC<InputGroupProps> = ({
                                           label,
                                           type = "text", // по дефолту тип text
                                           field,
                                           value,
                                           onChange
                                         }) => {
  return (
    <div className="mb-3">
      <label htmlFor={field} className="form-label">
        {label}
      </label>
      <input
        type={type}
        className="form-control"
        id={field}
        name={field}
        value={value}
        onChange={onChange}
        aria-describedby="emailHelp"
      />
    </div>
  )
}

export default InputGroup