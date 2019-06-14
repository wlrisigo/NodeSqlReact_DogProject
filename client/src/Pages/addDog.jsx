import React, {Component} from 'react';
import { Formik, Field } from "formik";
import * as Yup from 'yup';
import Top from '../components/top';
import Footer from '../components/footer';
import golden from '../golden_retriever.jpg';

/**This file is for adding a new dog to the db **/


//This function is for rendering a singular radio button
const RadioButton = ({
                         field: { name, value, onChange, onBlur },
                         id,
                         label,
                         className,
                         ...props
                     }) => {
    return (
        <React.Fragment>
            <input
                name={name}
                id={id}
                type="radio"
                value={id}
                checked={id === value}
                onChange={onChange}
                onBlur={onBlur}
                className={"radio-button"}
                {...props}
            />
            <label htmlFor={id}>{label}</label>
        </React.Fragment>
    );
};

//This function will render a group of radio buttons
const RadioButtonGroup = ({
                              value,
                              error,
                              touched,
                              id,
                              label,
                              className,
                              children
                          }) => {
    return (

        <fieldset>
            <legend>{label}</legend>
            {children}

        </fieldset>
    );
};


//Main component for adding a new dog, made using Formik npm
const addDog = () => (

    <Formik
        //Initialize values
        initialValues={{
            fldName: 'Name',
            fldBreed: "Breed",
            fldAge: '1',
            fldDescription: 'Description',
            fldPhoto: "something",
            fldStatus: "Available"

        }}

        //validation schema (functions for validation done through npm library Yup
        validationSchema={Yup.object().shape({
            fldName: Yup.string().required("Please enter a name"),
            fldBreed: Yup.string().required("Please enter a breed"),
            fldAge: Yup.number().required("Please enter a valid age"),
            fldDescription: Yup.string().required("Please enter a description for the dog"),
            fldPhoto: Yup.string('Please enter a valid file'),
            fldStatus: Yup.string().required("Please select a status")
        })
        }

        //Handling when form is submitted
        onSubmit={(values, {resetForm, setErrors, setSubmitting}) => {
            setTimeout(() => {
                console.log(JSON.stringify(values, null, 2));
                setSubmitting(false);
                window.alert("Thank you for your submission!");
                fetch("/api/dogs", {
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
                })
                    .catch(()=>{
                        console.log(("ERROR CONNECTING"))
                    });

            }, 500);
        }}

        //Rendering of actual form component
        render={({
                     handleSubmit,
                     setFieldValue,
                     setFieldTouched,
                     values,
                     errors,
                     touched,
                     isSubmitting
                 }) => ( <form onSubmit={handleSubmit} method={'POST'}>


                <br/>

                <legend className="formLegend">Dog Information</legend>
                <fieldset className="formInput">
                    <label className="formLabel">
                        Name of Dog:
                        <Field type="text" name="fldName"/>

                    </label>
                    {touched.fldName && errors.fldName && <p className="errors">{errors.fldName}</p>}
                </fieldset>

                <br/>

                <fieldset className="formInput">
                    <label className="formLabel">
                        Dog Breed:
                        <Field type="textbox" name="fldBreed"/>
                    </label>
                    {touched.fldBreed && errors.fldBreed && <p className="errors">{errors.fldBreed}</p>}
                </fieldset>

                <br/>

                <fieldset className="formInput">
                    <label className="formLabel">
                        Age:
                        <Field type="number" name="fldAge"/>

                    </label>
                    {touched.fldAge && errors.fldAge && <p className="errors">{errors.fldAge}</p>}
                </fieldset>

                <br/>

                <fieldset className="formInput">
                    <label className="formLabel">

                        <Field type="textarea" component="textarea" rows={4} col={50} name="fldDescription"/>

                    </label>
                    {touched.fldDescription && errors.fldDescription && <p className="errors">{errors.fldDescription}</p>}
                </fieldset>


                <fieldset className="formInput">
                    <label className="formLabel">
                        Photo(Optional):
                        <Field type="textbox" name="fldPhoto"/>
                    </label>
                    {touched.fldPhoto && errors.fldPhoto && <p className="errors">{errors.fldPhoto}</p>}
                </fieldset>


                <legends className="Center">Choose the status of the dog</legends>
                <RadioButtonGroup
                    className="Radio"
                    id="fldStatus"
                    value={values.fldStatus}
                    error={errors.fldStatus}
                    touched={touched.fldStatus}
                >
                    <Field
                        component={RadioButton}
                        name="fldStatus"
                        id="Adopted"
                        label="Adopted"
                    />
                    <Field
                        component={RadioButton}
                        name="fldStatus"
                        id="Available"
                        label="Available"
                    />

                    <Field
                        component={RadioButton}
                        name="fldStatus"
                        id="Fostered"
                        label="Fostered"
                    />
                </RadioButtonGroup>



                <button className="Submit" type="submit" disabled={isSubmitting}> Submit Dog </button>

            </form>
        )}

    />



);


//Main component for running the page AddDog

export default class AddDog extends Component {

    render() {
        return (
            <React.Fragment>
                <Top/>
                <h2 className="addDogHeader">Add a new dog to our shelter</h2>
                {addDog()}
                <Footer/>
            </React.Fragment>
        );
    }
}
