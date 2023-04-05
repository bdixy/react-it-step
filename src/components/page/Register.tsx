const Register = () => {
  return (
    <>
      <div className="container min-vh-100">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card w-100 p-4 mt-4 mb-5 border border-success text-light bg-dark">
              <h1 className="text-center mb-3">Register</h1>
              <form action="">
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input type="text" className="form-control bg-transparent text-light" id="username" placeholder="Username"/>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control bg-transparent text-light" id="email" placeholder="Email"/>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control bg-transparent text-light" id="password" placeholder="Password"/>
                </div>
                <div className="mb-3">
                  <label htmlFor="re-password" className="form-label">Repeat password</label>
                  <input type="password" className="form-control bg-transparent text-light" id="re-password" placeholder="Repeat password"/>
                </div>
                <div className="d-flex flex-column text-center mt-3">
                  <button className="btn btn-lg btn-success w-100 mt-2 mb-3">Submit</button>
                  <p>Already has account? <a className="text-success" href="">Login</a></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register