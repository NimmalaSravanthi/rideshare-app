
import Header from '../components/Header.jsx';
import '../styles/UserRegistrationPage.css';
import { useState } from 'react';
import axios from 'axios';

export default function UserRegistrationPage() {

  const [userRole, setUserRole] = useState('');
  const [vechileType, setVechileType] = useState('');
  const [gender, setGender] = useState('');

  const [form, setForm] = useState({
    name: '',
    email: '',
    contact: '',
    role: 'PASSENGER',
    vehicleDetails: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



  const handleRegister = async () => {

    const payload = {
      ...form,
      role: userRole.toUpperCase(),  // DRIVER or PASSENGER
    };

    try {
      const res = await axios.post(
        'http://localhost:8080/admin/onboard',
        payload,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log(res);


    } catch (err) {
      console.log('error occured ' + err);
    }




    console.log('User onboarded and credentials emailed');
  };



  return (

    <>
      <Header showLoginTypeBtn={true} />
      <div className='user-registration-container'>
        <h1>User Registration</h1>
        <form className='user-registration-form'>
          <label >Name</label>
          <input
            type="text"
            name='name'
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            type="email"
            name='email'

            onChange={handleChange}

          />


          <label>Mobile</label>
          <input
            type="number"
            name='contact'
            onChange={handleChange}
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
                  name='vehicleDetails'
                  type="text"
                  onChange={handleChange}
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
                onClick={handleRegister}
                type='button'
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

