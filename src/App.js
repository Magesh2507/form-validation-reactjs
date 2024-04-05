import './App.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

function App() {
  const initialValues = {
    firstName : '',
    lastName : '',
    email : '',
    gender : '',
    acceptTerms : false,
    country : '',
    hobbies : [],
  }

  const validationSchema = Yup.object({
    firstName : Yup.string().required('First Name required'),
    lastName : Yup.string().required('Last Name required'),
    email : Yup.string().email("Enter valid Email id").required("Email required"),
    gender : Yup.string().required('Gender is required'),
    acceptTerms : Yup.boolean().oneOf([true], 'Accept Terms is required'),
    country : Yup.string().required('Country is required'),
    hobbies : Yup.array().min(1, 'Select at least one hobby')
  })

  const onSubmit = (values, { resetForm }) => {
    console.log(values)
    setSubmittedData(values);
    resetForm()
  }

  const countries = ['USA', 'Canada', 'UK', 'Australia'];
  const hobbiesOptions = ['Reading', 'Gaming', 'Traveling', 'Sports'];
  const [submittedData, setSubmittedData] = useState(null);
  return (
    <div className="App">
       {!submittedData &&<Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <h3>Registration Form</h3>
          <div>
            <label htmlFor="firstName">First Name :</label><br></br>
            <Field
              type="text"
              id="firstName"
              name="firstName"
                className='input-fields'
            />
            <ErrorMessage className="error-message" name="firstName" component="div" />
          </div>
          <div>
            <label htmlFor="lastName">Last Name :</label><br></br>
            <Field
              type="text"
              id="lastName"
              name="lastName"
                 className='input-fields'
            />
            <ErrorMessage className="error-message" name="lastName" component="div" />
          </div>
          <div>
            <label htmlFor="email">Email :</label><br></br>
            <Field
              type="email"
              id="email"
              name="email"
                 className='input-fields'
            />
            <ErrorMessage className="error-message" name="email" component="div" />
          </div>
          <div>
            <label>Gender :</label>
            <div>
              <label>
                <Field type="radio" name="gender" value="male" />
                Male
              </label>
              <label>
                <Field type="radio" name="gender" value="female" />
                Female
              </label>
              <ErrorMessage className="error-message" name="gender" component="div" />
            </div>
          </div>
          <div>
            <label>
              <Field type="checkbox" name="acceptTerms" />
              Accept Terms and Conditions
            </label>
            <ErrorMessage className="error-message" name="acceptTerms" component="div" />
          </div>
          <div>
            <label htmlFor="country">Country :</label>
            <Field as="select" id="country" name="country"  className='input-fields'>
              <option value="">Select</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </Field>
            <ErrorMessage className="error-message" name="country" component="div" />
          </div>
          <div>
            <label>Hobbies :</label>
            <div>
              {hobbiesOptions.map((hobby) => (
                <label key={hobby}>
                  <Field type="checkbox" name="hobbies" value={hobby} />
                  {hobby}
                </label>
              ))}
              <ErrorMessage className="error-message" name="hobbies" component="div" />
            </div>
          </div>
          <div className='btn-div'><button type='submit'>Submit</button></div>
        </Form>
      </Formik>}
      {submittedData && (
        <div className='detail-container'>
          <h3 className='cls-btn' onClick={()=>setSubmittedData(null)}>X</h3>
          <h2>Submitted Details</h2>
          <table id="customers">
            <tbody>
              {Object.entries(submittedData).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table></div>
      )}
    </div>
  );
}

export default App;
