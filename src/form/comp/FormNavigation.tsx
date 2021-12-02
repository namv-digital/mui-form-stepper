import { Button, Card } from "@material-ui/core";
import type { FC } from "react";
import PropTypes from "prop-types";
import { FormikValues } from "formik";

interface StepFormProps {
  hasPrevious?: boolean;
  onBackClick: (values: FormikValues) => void;
  isLastStep: boolean;
}

const FormNavigation: FC<StepFormProps> = (props) => {
  const { hasPrevious, onBackClick, isLastStep } = props;

  return (
    <Card sx={{ mt: 3, p: 3 }}>
      {hasPrevious && (
        <Button variant="contained" type="button" onClick={onBackClick}>
          Previous
        </Button>
      )}

      <Button type="submit" color="primary" variant="contained">
        {isLastStep ? "Create new project" : "Next"}
      </Button>
    </Card>
  );
};

FormNavigation.propTypes = {
  hasPrevious: PropTypes.bool,
  onBackClick: PropTypes.func,
  isLastStep: PropTypes.bool
};

export default FormNavigation;
