import React, {Component} from 'react';
import Top from '../components/top.jsx';
import Footer from '../components/footer';
import {Field, Formik} from "formik";
import * as Yup from "yup";

/** Thie file is for adding a new user to the DB **/
const addUser = () => (
    <Formik

        //Initialize values
        initialValues={{
            fldFirstName: 'First Name',
            fldLastName: 'Last Name',
            fldAddress: '10 Cloverfield',
            fldEmail: 'fldEmail@fldEmail.com',
            fldPhoneNumber: '2031234567'
        }}

        //Validation schema, provided by npm library Yup
        validationSchema={Yup.object().shape({
            fldFirstName: Yup.string('Please enter a valid name').max(15, 'Please enter a valid name').required("Please enter your First Name"),
            fldLastName: Yup.string('Please enter a valid name').max(15, 'Please enter a valid name').required("Please enter your Last Name"),
            fldAddress: Yup.string('Please enter a valid address').max(25, "Please enter a valid address").required('Please enter your address'),
            fldEmail: Yup.string().email("Please enter a valid email").required("Please enter your email address"),
            fldPhoneNumber: Yup.number().required("Please enter your phone number")
        })}

        //Handling for when form is submitted
        onSubmit={(values, {resetForm, setErrors, setSubmitting}) => {
            setTimeout(() => {
                console.log(JSON.stringify(values, null, 2));
                setSubmitting(false);
                window.alert("Thank you for your submission!");
                fetch("/api/person/", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values)
                }).then(function (response) {
                    if (response.status >= 400) {
                        throw new Error("Bad response from server");
                    }
                    return response.json();
                }).then(function (values) {
                    console.log(JSON.stringify(values, null, 2));
                }).catch(()=>{
                    console.log("Error");
                });

            }, 500);
        }}

        render={({
                     handleSubmit,
                     setFieldValue,
                     setFieldTouched,
                     values,
                     errors,
                     touched,
                     isSubmitting
                 }) => ( <form onSubmit={handleSubmit} method={'POST'}>

            <legend className="formLegend">Article Information</legend>

            <br/>

            <fieldset className="formInput">
                <label className="formLabel">
                    First Name:
                    <Field type="text" name="fldFirstName" />
                </label>
                {touched.fldFirstName && errors.fldFirstName && <p className="errors">{errors.fldFirstName}</p>}
            </fieldset>


            <br/>

            <fieldset className="formInput">
                <label className="formLabel">
                    Last Name:
                    <Field type="text" name="fldLastName" />
                </label>
                {touched.fldLastName && errors.fldLastName && <p className="errors">{errors.fldLastName}</p>}
            </fieldset>

            <br/>

            <fieldset className="formInput">
                <label className="formLabel">
                    fldAddress:
                    <Field type="text" name="fldAddress" />
                </label>
                {touched.fldAddress && errors.fldAddress && <p className="errors">{errors.fldAddress}</p>}
            </fieldset>

            <br/>


            <fieldset className="formInput">
                <label className="formLabel">
                    fldEmail:
                    <Field type="fldEmail" name="fldEmail"/>

                </label>
                {touched.fldEmail && errors.fldEmail && <p className="errors">{errors.fldEmail}</p>}
            </fieldset>

            <br/>

            <fieldset className="formInput">
                <label className="formLabel">
                    Phone Number:
                    <Field type="text" name="fldPhoneNumber"/>
                </label>
                {touched.fldPhoneNumber && errors.fldPhoneNumber && <p className="errors">{errors.fldPhoneNumber}</p>}
            </fieldset>





            <button type="submit" disabled={isSubmitting}> Submit User Entry </button>

        </form>)}




    />
);


/** Main component for AddUser page **/
export default class AddUser extends Component {
    render() {
        return (
            <React.Fragment>
                <Top />
                {addUser()}
                <Footer />
            </React.Fragment>
        );
    }
}