import classNames from 'classnames'
import { ChangeEvent, FC, InputHTMLAttributes } from "react"

interface InputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string,
  type?: "text" | "number" | "password" | "email", // необов'язкове поле, яке може приймати "text" | "password" |
  // "email"
  field: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void // функція, яка приймає InputElement та нічого не повертає
  errors?: string[]
  error?: string | undefined
  touched?: boolean | undefined
}

const InputGroup: FC<InputGroupProps> = ({
                                           label,
                                           type = "text", // по дефолту тип text
                                           field,
                                           value,
                                           onChange,
                                           errors,
                                           error,
                                           touched
                                         }) => {
  return (
    <div className="mb-3">
      <label htmlFor={field} className="form-label">
        {label}
      </label>
      <input
        type={type}
        className={classNames("form-control", {
          "is-invalid": errors || (error && touched)
        })}
        id={field}
        name={field}
        value={value}
        onChange={onChange}
        aria-describedby="emailHelp"
      />
      {
        errors &&
        <div id="validationServerUsernameFeedback" className="invalid-feedback">
          {errors.map((e, index) => (
            <span key={index}>
              {e}
            </span>
          ))}
        </div>
      }
      {
        (error && touched) &&
        <div id="validationServerUsernameFeedback" className="invalid-feedback">
          {error}
        </div>
      }
    </div>
  )
}

export default InputGroup