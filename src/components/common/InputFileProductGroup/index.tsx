import { ChangeEvent, FC, InputHTMLAttributes, useState } from 'react'
import upload from '../../../assets/upload.png'
import './style.css'
import http from '../../../http/http-common'
import { IUploadImage, IUploadImageResult } from './types'

interface InputFileProductGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  field: string
  onSelectFile: (id: number) => void
  errors?: string[]
  error?: string | string[] | undefined
  touched?: boolean | undefined
}

const InputFileProductGroup: FC<InputFileProductGroupProps> = ({
                                                                 label = 'Оберіть файл',
                                                                 field,
                                                                 onSelectFile,
                                                                 errors,
                                                                 error,
                                                                 touched
                                                               }) => {
  const [images, setImages] = useState<string[]>([])

  const onChangeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const file = files[0]
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
      if (!allowedTypes.includes(file.type)) {
        alert('Не допустимий тип файлу')
        return
      }
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = async () => {
        const upload: IUploadImage = {
          image: reader.result as string
        }
        try {
          const response = await http.post<IUploadImageResult>('api/product/upload', upload)
          const imageServer= response.data
          setImages([...images, response.data.name])
          onSelectFile(imageServer.id)
        } catch (e) {
          console.log(e)
        }
      }
    }
    e.target.value = ''
  }

  return (
    <div className="mb-3">
      <div className="row">
        <div className="col-md-3">
          <label htmlFor={field} className="form-label">
            <h6>{label}</h6>
            <img
              width="100"
              className="img-fluid"
              src={upload}
              style={{cursor: 'pointer'}}
            />
          </label>

          <input
            type="file"
            className="d-none"
            accept="image/jpeg, image/png, image/gif"
            id={field}
            onChange={onChangeFileHandler}
          />
        </div>

        {images.map((item, index) => (
          <div key={index} className="col-md-3">
            <img
              width="100"
              className="img-fluid"
              src={`${import.meta.env.VITE_API_URL}images/300_${item}`}
            />
          </div>
        ))}
      </div>

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

export default InputFileProductGroup