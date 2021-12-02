import React, { useState } from "react";
import {
  Formik,
  FormikConfig,
  FormikValues,
  FormikHelpers,
  Form
} from "formik";
import FormNavigation from "./ProjectStepFormNavigation";

interface Props extends FormikConfig<FormikValues> {
  children: React.ReactNode;
}

const MultiStepForm = ({ children, initialValues, onSubmit }: Props) => {
  const [stepNumber, setStepNumber] = useState(0);
  const steps = React.Children.toArray(children) as React.ReactElement[];

  const [snapshot, setSnapshot] = useState(initialValues);

  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  const next = (values: FormikValues) => {
    setSnapshot(values);
    setStepNumber(stepNumber + 1);
  };

  const previous = (values: FormikValues) => {
    setSnapshot(values);
    setStepNumber(stepNumber - 1);
  };

  const handleSubmit = async (
    values: FormikValues,
    actions: FormikHelpers<FormikValues>
  ) => {
    if (step.props.onSubmit) {
      await step.props.onSubmit(values);
    }
    if (isLastStep) {
      return onSubmit(values, actions);
    }
    actions.setTouched({});
    return next(values);
  };

  return (
    <Formik
      initialValues={snapshot}
      onSubmit={handleSubmit}
      validationSchema={step.props.validationSchema}
    >
      {(formik) => (
        <Form>
          {step}
          <FormNavigation
            isLastStep={isLastStep}
            hasPrevious={stepNumber > 0}
            onBackClick={() => previous(formik.values)}
          />
        </Form>
      )}
    </Formik>
  );
};

export default MultiStepForm;

export const FormStep = ({ children }: any) => {
  const {values, errors,touched, handleChange, handleBlur, setFieldValue} = useFormikContext();

  return ({
    <>
    {children(values, errors, touched, handleChange, handleBlur, setFieldValue)}
    </>
  })
};
