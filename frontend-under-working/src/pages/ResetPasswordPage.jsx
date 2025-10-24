import Header from "../components/Header.jsx";

import '../styles/ResetPasswordPage.css';
export default function ResetPasswordPage() {

  return (

    <>
      <Header />

      <div className="reset-password-container">
        <h1>Reset your password</h1>
        <form className="reset-password-form">

          <label >New password</label>
          <input
            type="password"
          />

          <label>Confirm password</label>
          <input
            type="password"
          />

          <button
            className="reset-password-btn"
            type='reset'
          >Reset</button>
        </form>
      </div>      

    </>
  );
}
