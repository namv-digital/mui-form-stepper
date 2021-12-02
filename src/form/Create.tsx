import { useState } from "react";
import { de, enGB } from "date-fns/locale";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  FormControl,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import MobileDatePicker from "@material-ui/lab/MobileDatePicker";
import MobileTimePicker from "@material-ui/lab/MobileTimePicker";
import Stack from "@material-ui/core/Stack";
import FileDropzone from "./comp/Drop";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { Formik } from "formik";
import { Trans } from "react-i18next";
import i18next from "i18next";
import QuillEditor from "./comp/Quill";
import bytesToSize from "./comp/bytes";

export default function ProjectEditForm() {
  const lang = i18next.language || window.localStorage.i18nextLng;

  const MAX_SIZE = 5242880;

  const [images, setImages] = useState<any[]>([]);

  const handleDropImages = (newImages: any): void => {
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImages = (file): void => {
    setImages((prevImages) =>
      prevImages.filter((_file) => _file.path !== file.path)
    );
  };

  const handleRemoveAllImages = (): void => {
    setImages([]);
  };

  const [files, setFiles] = useState<any[]>([]);

  const handleDrop = (newFiles: any): void => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleRemove = (file): void => {
    setFiles((prevFiles) =>
      prevFiles.filter((_file) => _file.path !== file.path)
    );
  };

  const handleRemoveAll = (): void => {
    setFiles([]);
  };

  const [plans, setPlans] = useState<any[]>([]);

  const handleDropPlans = (newPlans: any): void => {
    setPlans((prevPlans) => [...prevPlans, ...newPlans]);
  };

  const handleRemovePlans = (file): void => {
    setPlans((prevPlans) =>
      prevPlans.filter((_file) => _file.path !== file.path)
    );
  };

  const handleRemoveAllPlans = (): void => {
    setPlans([]);
  };

  const handleOnDropRejected = (): void => {
    toast.error(
      <div>
        {i18next.t("File is to big")}
        <br />
        {i18next.t("Allowd size is")} {bytesToSize(MAX_SIZE)}
      </div>
    );
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        title: "",
        transposition_date: "",
        implementationperiod: "",
        flexible_appointment: false,
        start: "",
        end: "",
        group: "",
        description: "",
        project_benefits: "",
        type_of_work: "",
        risk_assessment: "",
        filing_period: "",
        helpers_min: "",
        helpers_max: "",
        remark: "",
        internal_costs: "",
        material_costs: "",
        extra_costs: "",
        agenda: "",
        dresscode: "",
        covid: "",
        emergency_number: "",
        submit: null
      }}
      validationSchema={Yup.object({
        title: Yup.string().required(i18next.t("Is required")),
        transposition_date: Yup.string().when("flexible_appointment", {
          is: false,
          then: Yup.string().required(i18next.t("Is required"))
        }),
        implementationperiod: Yup.string().when("flexible_appointment", {
          is: true,
          then: Yup.string().required(i18next.t("Is required"))
        }),
        start: Yup.string().required(i18next.t("Is required")),
        end: Yup.string().required(i18next.t("Is required")),
        group: Yup.string().required(i18next.t("Is required")),
        description: Yup.string().required(i18next.t("Is required")),
        type_of_work: Yup.string().required(i18next.t("Is required")),
        helpers_min: Yup.number()
          .required(i18next.t("Is required"))
          .positive()
          .integer(),
        helpers_max: Yup.number()
          .required(i18next.t("Is required"))
          .positive()
          .integer(),
        filing_period: Yup.string().required(i18next.t("Is required"))
      }).shape({})}
      onSubmit={async (
        values,
        { setErrors, setStatus, setSubmitting }
      ): Promise<void> => {
        try {
          setStatus({ success: true });
          setSubmitting(false);
          toast.success(i18next.t("Project created"));
          alert(JSON.stringify(values, null, 2));
        } catch (err) {
          console.error(err);
          toast.error(i18next.t("Something went wrong!"));
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
        setFieldValue
      }): JSX.Element => (
        <form onSubmit={handleSubmit}>
          <CardContent sx={{ p: 0 }}>
            <Card sx={{ p: 3 }}>
              <Box sx={{ mt: 2 }}>
                <Grid container spacing={4} mb={4}>
                  <Grid item md={4} xs={12}>
                    <TextField
                      error={Boolean(touched.title && errors.title)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      label={i18next.t("Title")}
                      name="title"
                      variant="outlined"
                      value={values.title}
                      required
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <LocalizationProvider
                      dateAdapter={AdapterDateFns}
                      locale={lang === "de" ? de : enGB}
                    >
                      <Stack spacing={3}>
                        <MobileDatePicker
                          label={i18next.t("Transposition date")}
                          value={values.transposition_date}
                          onChange={(e) =>
                            setFieldValue("transposition_date", e)
                          }
                          renderInput={(params) => <TextField {...params} />}
                          inputFormat="dd.MM.yyyy"
                          views={["day"]}
                          cancelText={i18next.t("Cancel")}
                        />
                      </Stack>
                    </LocalizationProvider>
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.flexible_appointment}
                            name="flexible_appointment"
                            id="flexible_appointment"
                            onBlur={handleBlur}
                            onChange={(e) =>
                              setFieldValue(
                                "flexible_appointment",
                                e.target.checked
                              )
                            }
                          />
                        }
                        label={i18next.t("Flexible appointment")}
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      error={Boolean(
                        touched.implementationperiod &&
                          errors.implementationperiod
                      )}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      label={i18next.t("Implementationperiod")}
                      name="implementationperiod"
                      variant="outlined"
                      value={values.implementationperiod}
                      required
                    />
                  </Grid>
                </Grid>
                <Divider />
                <Grid container spacing={4} mt={2}>
                  <Grid item md={6} xs={12}>
                    <LocalizationProvider
                      dateAdapter={AdapterDateFns}
                      locale={lang === "de" ? de : enGB}
                    >
                      <Stack spacing={3}>
                        <MobileTimePicker
                          label={i18next.t("Start")}
                          value={values.start}
                          minutesStep={30}
                          onChange={(e) => setFieldValue("start", new Date(e))}
                          renderInput={(params) => <TextField {...params} />}
                          inputFormat="HH:mm"
                          ampm={false}
                          cancelText={i18next.t("Cancel")}
                        />
                      </Stack>
                    </LocalizationProvider>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <LocalizationProvider
                      dateAdapter={AdapterDateFns}
                      locale={lang === "de" ? de : enGB}
                    >
                      <Stack spacing={3}>
                        <MobileTimePicker
                          label={i18next.t("End")}
                          value={values.end}
                          minutesStep={30}
                          onChange={(e) => setFieldValue("end", new Date(e))}
                          renderInput={(params) => <TextField {...params} />}
                          inputFormat="HH:mm"
                          ampm={false}
                          cancelText={i18next.t("Cancel")}
                        />
                      </Stack>
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              </Box>
            </Card>
            <Card sx={{ p: 3, mt: 3 }}>
              <Box sx={{ mt: 2 }}>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="role">
                      <Trans>Group</Trans> *
                    </InputLabel>
                    <Select
                      error={Boolean(touched.group && errors.group)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      name="group"
                      variant="outlined"
                      value={values.group}
                      required
                      labelId="group"
                      id="group"
                    >
                      <MenuItem value="Umwelt">
                        <Trans>Environment</Trans>
                      </MenuItem>
                      <MenuItem value="Gesellschaft">
                        <Trans>Society</Trans>
                      </MenuItem>
                      <MenuItem value="Menschen">
                        <Trans>People</Trans>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={12} xs={12} mt={4}>
                  <TextField
                    error={Boolean(touched.description && errors.description)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    label={i18next.t("Description")}
                    name="description"
                    variant="outlined"
                    value={values.description}
                    required
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item md={12} xs={12} mt={4}>
                  <TextField
                    error={Boolean(
                      touched.project_benefits && errors.project_benefits
                    )}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    label={i18next.t("Project benefits")}
                    name="project_benefits"
                    variant="outlined"
                    value={values.project_benefits}
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item md={12} xs={12} mt={4}>
                  <TextField
                    error={Boolean(touched.type_of_work && errors.type_of_work)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    label={i18next.t("Type of work")}
                    name="type_of_work"
                    variant="outlined"
                    value={values.type_of_work}
                    required
                    multiline
                    rows={4}
                  />
                </Grid>
              </Box>
            </Card>
            <Card sx={{ p: 3, mt: 3 }}>
              <Grid container spacing={4} mb={4} mt={0}>
                <Grid item md={4} xs={12}>
                  <TextField
                    label={i18next.t("Helpers min")}
                    error={Boolean(touched.helpers_min && errors.helpers_min)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    name="helpers_min"
                    variant="outlined"
                    value={values.helpers_min}
                    required
                    type="number"
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    label={i18next.t("Helpers max")}
                    error={Boolean(touched.helpers_max && errors.helpers_max)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    name="helpers_max"
                    variant="outlined"
                    value={values.helpers_max}
                    required
                    type="number"
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    locale={lang === "de" ? de : enGB}
                  >
                    <Stack spacing={3}>
                      <MobileDatePicker
                        label={i18next.t("Filing period")}
                        value={values.filing_period}
                        onChange={(e) => setFieldValue("filing_period", e)}
                        renderInput={(params) => <TextField {...params} />}
                        inputFormat="dd.MM.yyyy"
                        views={["day"]}
                      />
                    </Stack>
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item lg={4} xl={4} xs={12}>
                  <Card>
                    <CardHeader title={i18next.t("Upload images")} />
                    <CardContent>
                      <FileDropzone
                        accept="image/*"
                        files={images}
                        onDrop={handleDropImages}
                        onRemove={handleRemoveImages}
                        onRemoveAll={handleRemoveAllImages}
                        noUploadButton
                        maxSize={MAX_SIZE}
                        onDropRejected={handleOnDropRejected}
                      />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item lg={4} xl={4} xs={12}>
                  <Card>
                    <CardHeader title={i18next.t("Upload files")} />
                    <CardContent>
                      <FileDropzone
                        files={files}
                        onDrop={handleDrop}
                        onRemove={handleRemove}
                        onRemoveAll={handleRemoveAll}
                        noUploadButton
                        maxSize={MAX_SIZE}
                        onDropRejected={handleOnDropRejected}
                      />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item lg={4} xl={4} xs={12}>
                  <Card>
                    <CardHeader title={i18next.t("Upload directions")} />
                    <CardContent>
                      <FileDropzone
                        files={plans}
                        onDrop={handleDropPlans}
                        onRemove={handleRemovePlans}
                        onRemoveAll={handleRemoveAllPlans}
                        noUploadButton
                        maxSize={MAX_SIZE}
                        onDropRejected={handleOnDropRejected}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item md={12} xs={12} mt={4}>
                  <TextField
                    error={Boolean(
                      touched.risk_assessment && errors.risk_assessment
                    )}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    label={i18next.t("Risk assessment")}
                    name="risk_assessment"
                    variant="outlined"
                    value={values.risk_assessment}
                    multiline
                    rows={4}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item md={12} xs={12} mt={4}>
                  <TextField
                    error={Boolean(touched.remark && errors.remark)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    label={i18next.t("Remark")}
                    name="remark"
                    variant="outlined"
                    value={values.remark}
                    multiline
                    rows={4}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item md={12} xs={12} mt={4}>
                  <Typography color="textPrimary" variant="h6" sx={{ pl: 1 }}>
                    {i18next.t("Agenda")}
                  </Typography>
                  <QuillEditor
                    onChange={(value: string): void =>
                      setFieldValue("agenda", value)
                    }
                    placeholder={i18next.t("Agenda")}
                    sx={{ height: 400 }}
                    value={values.agenda}
                    modules={ProjectEditForm.modules}
                    formats={ProjectEditForm.formats}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item md={12} xs={12} mt={4}>
                  <Typography color="textPrimary" variant="h6" sx={{ pl: 1 }}>
                    {i18next.t("Dresscode & security")}
                  </Typography>
                  <QuillEditor
                    onChange={(value: string): void =>
                      setFieldValue("dresscode", value)
                    }
                    placeholder={i18next.t("Dresscode & security")}
                    sx={{ height: 400 }}
                    value={values.dresscode}
                    modules={ProjectEditForm.modules}
                    formats={ProjectEditForm.formats}
                  />
                </Grid>
              </Grid>
              <Grid item md={12} xs={12} mt={4}>
                <TextField
                  error={Boolean(touched.covid && errors.covid)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  fullWidth
                  label={i18next.t("Covid-19")}
                  name="covid"
                  variant="outlined"
                  value={values.covid}
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item md={12} xs={12} mt={4}>
                <TextField
                  error={Boolean(
                    touched.emergency_number && errors.emergency_number
                  )}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  fullWidth
                  label={i18next.t("Emergency number")}
                  name="emergency_number"
                  variant="outlined"
                  value={values.emergency_number}
                  multiline
                  rows={1}
                />
              </Grid>
            </Card>
          </CardContent>
          <CardActions
            sx={{
              justifyContent: "flex-end",
              p: 2
            }}
          >
            <Button
              color="primary"
              disabled={isSubmitting}
              type="submit"
              variant="contained"
            >
              <Trans>Save project</Trans>
            </Button>
          </CardActions>
        </form>
      )}
    </Formik>
  );
}

ProjectEditForm.modules = {
  toolbar: [
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"]
  ],
  clipboard: {
    matchVisual: false
  }
};

ProjectEditForm.formats = ["bold", "italic", "underline", "list", "bullet"];
