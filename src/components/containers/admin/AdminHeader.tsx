import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { AuthUserActionType, IAuthUser } from '../../auth/types'

const AdminHeader = () => {
  const {isAuth} = useSelector((store: any)=> store.auth as IAuthUser)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <>
      <header data-bs-theme="dark">
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <div className="container">
            <Link className="navbar-brand" to="/admin">
              Адмін панель
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Головна
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled">Disabled</a>
                </li>
              </ul>
              <ul className="navbar-nav">
                {isAuth ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/logout" onClick={(e) => {
                        e.preventDefault()
                        localStorage.removeItem('token')
                        dispatch({type: AuthUserActionType.LOGOUT_USER})
                        navigate('/')
                      }
                      }>
                        Вихід
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/profile">Профіль</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">
                        Вхід
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/register">
                        Реєстрація
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

export default AdminHeader