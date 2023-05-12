import { ChangeEvent, FC, InputHTMLAttributes, useState } from 'react'
import defaultImage from '../../../assets/defaultImage.jpg'
import './style.css'

// інтерфейс наслідується від InputHTMLAttributes та розширяє його додаючи параметри label, field та функцію
// onSelectFile
interface InputFileGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string // необов'язкове поле
  field: string //
  onSelectFile: (base64: string) => void
  errors?: string[]
  error?: string | undefined
  touched?: boolean | undefined
}

const InputFileGroup: FC<InputFileGroupProps> = ({
                                                   label = "Оберіть файл",
                                                   field,
                                                   onSelectFile,
                                                   errors,
                                                   error,
                                                   touched
                                                 }) => {
  const [selectImage, setSelectImage] = useState<File | null>(null)

  const onChangeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files // отримання файлу, який вибрав користувач
    if (files) { // якщо файл вибраний
      const file = files[0] // отримує перший файл
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
      if (!allowedTypes.includes(file.type)) {
        alert("Не допустимий тип файлу")
        return
      }
      setSelectImage(file)
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        onSelectFile(reader.result as string)
      }
      // setSelectImage(file) // додає файл в стейт компонента
      // onSelectFile(file) // передає файл в функцію
    }
    e.target.value = ""
  }

  return (
    <div className="mb-3">
      <label htmlFor={field} className="form-label">
        <h6>{label}</h6>
        {/*якщо не вибрано фотографію, то виводиться звичайна*/}
        {/*якщо вибрано фотографію, то вона виводиться*/}
        {selectImage == null ? (
          <img width="150"
               className="img-fluid"
               src={defaultImage}
               style={{cursor: "pointer"}}
          />

        ) : (
          <img width="150" src={URL.createObjectURL(selectImage)}/>
        )}
      </label>

      <input
        type="file"
        className="d-none"
        accept="image/jpeg, image/png, image/gif"
        id={field}
        onChange={onChangeFileHandler}
      />

      {
        errors &&
        <div className="alert alert-danger">
          {errors.map((e, index) => (
            <span key={index}>
              {e}
            </span>
          ))}
        </div>
      }
      {
        (error && touched) &&
        <div className="alert alert-danger">
          {error}
        </div>
      }
    </div>
  )
}

export default InputFileGroup