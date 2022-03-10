import React, { useState, useEffect } from 'react'

import { Form, Formik } from 'formik';
import { useHistory } from 'react-router-dom';

import { Card, Grid } from '@mui/material';

import SuiBox from 'components/SuiBox';
import SuiButton from 'components/SuiButton';

import { checkout, initialValue, validation } from "./components/schema/createPRSchema";
import ContactForm from './components/CreatePRFrom';

import { AxiosInstance } from 'api';

const Create = () => {
  const { formId, formField } = checkout;

  const history = useHistory();

  const [services, setServices] = useState(null)

  const getAllServices = async () => {
    await AxiosInstance.get("/api/dashboard/service").then(res => {
      const newData = []
      res.data.data.forEach(element => {
        newData.push({
          value: element.uuid,
          label: element.name,
        })
        setServices(newData)
      });
    })
  }

  const handleSubmit = async (values, actions) => {
    let newData = values;

    for (const key in values) {
      if (typeof (values[key]) === "object")
        newData[key] = values[key].value
    }

    console.log(newData)

    // await AxiosInstance.post(`/api/dashboard/contact/create`, newData).then((res) => {
    //   history.push("/dashboard/contact");
    // }).catch((err) => {
    //   let error = {}
    //   for (const key in err.response.data.errors) {
    //     let msg = ''
    //     err.response.data.errors[key].forEach(element => {
    //       msg += element + " "
    //     });
    //     error[key] = msg;
    //   }
    //   actions.setErrors(error);
    // })
  };

  useEffect(() => {
    getAllServices();
  }, [])


  return services && (
    <SuiBox mt={1} mb={20}>
      <Grid container justifyContent="center">
        <Grid item xs={12} lg={8}>
          <Card className="overflow-visible">
            <SuiBox p={2}>
              <Formik
                initialValues={initialValue}
                validationSchema={validation[0]}
                onSubmit={handleSubmit}>
                {({ values, errors, touched, isSubmitting, setFieldValue }) => {
                  return (
                    <Form id={formId} autoComplete="off">

                      <SuiBox mb={3}>
                        <Grid container spacing={3}>

                          <Grid item xs={12}>
                            <ContactForm formData={{
                              values,
                              touched,
                              formField,
                              errors,
                              setFieldValue,
                            }} services={services} />

                            <SuiButton
                              disabled={isSubmitting}
                              type="submit"
                              variant="gradient"
                              color="dark"
                            >
                              {isSubmitting ? "Loading..." : "Create"}
                            </SuiButton>

                          </Grid>
                        </Grid>
                      </SuiBox>
                    </Form>
                  )
                }}
              </Formik>
            </SuiBox>
          </Card>
        </Grid>
      </Grid>
    </SuiBox>
  )
}

export default Create