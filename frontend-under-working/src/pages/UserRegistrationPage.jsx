
import Header from '../components/Header.jsx';
import '../styles/UserRegistrationPage.css';
import { useState } from 'react';

export default function UserRegistrationPage() {


  const [userRole, setUserRole] = useState('');
  const [vechileType, setVechileType] = useState('');
  const [gender, setGender] = useState('');


  return (

    <>
      <Header showLoginTypeBtn={true} />
      <div className='user-registration-container'>
        <h1>User Registration</h1>
        <form className='user-registration-form'>
          <label >Name</label>
          <input
            type="text"
          />

          <label>Email</label>
          <input
            type="email"
          />


          <label>Mobile</label>
          <input
            type="number"
          />

          <div className='gender-input-box'>
            <label>Gender :</label>
            <input
              type="radio"
              name='gender'
              value="male"
              checked={gender === 'male'}
              onClick={(e) => setGender(e.target.value)}
            />
            <label>Male</label>

            <input
              type="radio"
              name='gender'
              value="female"
              checked={gender === 'female'}
              onClick={(e) => setGender(e.target.value)}

            />
            <label>Female</label>

            <input
              type="radio"
              name='gender'
              value="others"
              checked={gender === 'others'}
              onClick={(e) => setGender(e.target.value)}

            />
            <label>Others</label>

          </div>

          <div className='user-role-input-box'>
            <label>User Role :</label>
            <input
              type="radio"
              name='user-role'
              value="driver"
              checked={userRole === 'driver'}
              onClick={(e) => setUserRole(e.target.value)}
            />
            <label>Driver</label>
            <input
              type="radio"
              name='user-role'
              value="passenger"
              checked={userRole === 'passenger'}
              onClick={(e) => setUserRole(e.target.value)}

            />
            <label>Passenger</label>

          </div>

          {
            userRole === 'driver' && (
              <>

                <div className='vehicle-type-input-box'>
                  <label>Vehicle Type :</label>
                  <input
                    type="radio"
                    name='vehicle-type'
                    value="car"
                    checked={vechileType === 'car'}
                    onClick={(e) => setVechileType(e.target.value)}
                  />
                  <label>Car</label>
                  <input
                    type="radio"
                    name='vehicle-type'
                    value="bike"
                    checked={vechileType === 'bike'}
                    onClick={(e) => setVechileType(e.target.value)}

                  />
                  <label>Bike</label>

                  <input
                    type="radio"
                    name='vehicle-type'
                    value="auto"
                    checked={vechileType === 'auto'}
                    onClick={(e) => setVechileType(e.target.value)}

                  />
                  <label>Auto</label>

                </div>
                <label >Vehicle Number</label>
                <input
                  type="text"
                />

                <label >Driver's License Number</label>
                <input
                  type="text"
                />
              </>
            )
          }

          {
            userRole === 'passenger' && (
              <>



                <label >Adhaar Number</label>
                <input
                  type="text"
                />

                <label >Pan Number</label>
                <input
                  type="text"
                />
              </>
            )
          }

          {
            (userRole === 'driver' || userRole === 'passenger') && (
              <button
                className='user-registration-btn'
              >
                Register
              </button>
            )
          }

        </form>
      </div>
    </>
  );
}

