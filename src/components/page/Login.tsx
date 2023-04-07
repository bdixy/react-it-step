import { Link } from 'react-router-dom'
import google_svg from '../../assets/icons8-google-48.svg'

const Login = () => {
  return (
    <>
      <div className="container min-vh-100">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card w-100 p-4 mt-4 mb-5 border border-success text-light bg-dark">
              <h1 className="text-center mb-3">Login</h1>
              <form action="">
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input type="text" className="form-control bg-transparent text-light" id="username" placeholder="Username"/>
                </div>
                <div className="mb-5">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control bg-transparent text-light" id="password" placeholder="Password"/>
                  <Link className="float-end mt-3 text-success" to="/recovery">Forgot password?</Link>
                </div>
                <div className="text-center mt-3">
                  <button className="btn btn-lg btn-success w-100 mt-2 mb-3">Login</button>
                </div>
                <div className="text-center">
                  <p>Or login with</p>
                  <div className="btn btn-outline-success">
                    <img src={google_svg} alt="google_svg"/>
                    <span> Login with Google</span>
                  </div>
                </div>
                <p className="text-center mt-3">No account? <Link className="text-success" to="/register">Register</Link></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login