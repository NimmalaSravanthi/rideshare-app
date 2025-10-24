
import { useState } from "react";

export default function LoginAs({ props }) {

  const [isLoginTypeVisible, setLoginTypeVisiblity] = useState(false);


  return (
    <>
    {
      props?.showLoginTypeBtn && (
        <div className="login-type-box">
        <button className="login-as-btn" onClick={() => setLoginTypeVisiblity(prev => !prev)}>Login as</button>

        {
          isLoginTypeVisible && (
            <div className='login-type-drop-down'>
              <li
                onClick={() => {
                  setLoginTypeVisiblity(prev => !prev)
                }}
              ><a>Driver</a></li>
              <li
                onClick={() => {
                  setLoginTypeVisiblity(prev => !prev)
                }}
              ><a>Passanger</a></li>
            </div>
          )
        }
      </div>
      )

    }
      
    </>
  );
}
