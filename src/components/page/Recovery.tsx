import React from 'react'

const Recovery = () => {
  return (
    <>
      <div className="container min-vh-100">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card w-100 p-4 mt-4 mb-5 border border-success text-light bg-dark">
              <h1 className="text-center mb-3">Password recovery</h1>
              <form action="">
                <div className="text-center ">
                  <p>
                    Enter the email address of the account you want to restore
                  </p>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control bg-transparent text-light" id="email" placeholder="Email"/>
                </div>
                <div className="text-center mt-3">
                  <button className="btn btn-lg btn-success w-100 mt-2 mb-3">Recovery</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Recovery