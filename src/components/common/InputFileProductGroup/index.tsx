import { ChangeEvent, FC, InputHTMLAttributes, useState } from 'react'
import upload from '../../../assets/upload.png'
import './style.css'
import http from '../../../http/http-common'
import { IUploadImage, IUploadImageResult } from './types'

interface InputFileProductGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  field: string
  onRemoveFile: (id: number) => void
  onSelectFile: (id: number) => void
  errors?: string[]
  error?: string | string[] | undefined
  touched?: boolean | undefined
}

const InputFileProductGroup: FC<InputFileProductGroupProps> = ({
                                                                 label = 'Оберіть файл',
                                                                 field,
                                                                 onRemoveFile,
                                                                 onSelectFile,
                                                                 errors,
                                                                 error,
                                                                 touched
                                                               }) => {
  const [images, setImages] = useState<IUploadImageResult[]>([])

  const onRemoveImage = (img: IUploadImageResult) => {
    console.log("Remove image", img);
    setImages(images.filter((x) => x.id !== img.id))

    //setImages(images.splice(img, 1))
    onRemoveFile(img.id)
  }
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
          const imageServer = response.data
          setImages([...images, response.data])
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

        {images.map((item) => (
          <div key={item.id} className="col-md-4 mt-5">
            <div>
              <i
                className="fa fa-times fa-2x fa-fw text-danger"
                style={{ cursor: "pointer" }}
                onClick={() => onRemoveImage(item)}
              ></i>
            </div>
            <img
              width="80%"
              className="img-fluid"
              src={`${import.meta.env.VITE_API_URL}images/300_${item.name}`}
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