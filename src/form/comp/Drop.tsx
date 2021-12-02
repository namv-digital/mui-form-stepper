import type { FC } from "react";
import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";
import type { DropzoneOptions } from "react-dropzone";
import {
  Box,
  Button,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography
} from "@material-ui/core";
import Close from "@mui/icons-material/Close";
import bytesToSize from "./bytes";
import { Trans } from "react-i18next";
import i18next from "i18next";

interface FileDropzoneProps extends DropzoneOptions {
  files?: any[];
  onRemove?: (file: any) => void;
  onRemoveAll?: () => void;
  onUpload?: () => void;
  noUploadButton?: boolean;
}

const FileDropzone: FC<FileDropzoneProps> = (props) => {
  const {
    accept,
    disabled,
    files,
    getFilesFromEvent,
    maxFiles,
    maxSize,
    minSize,
    noClick,
    noDrag,
    noDragEventsBubbling,
    noKeyboard,
    onDrop,
    onDropAccepted,
    onDropRejected,
    onFileDialogCancel,
    onRemove,
    onRemoveAll,
    onUpload,
    preventDropOnDocument,
    noUploadButton,
    ...other
  } = props;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    maxFiles,
    maxSize,
    minSize,
    onDrop,
    onDropRejected
  });

  let button;

  if (noUploadButton) {
    button = "";
  } else {
    button = (
      <Button
        color="primary"
        onClick={onUpload}
        size="small"
        sx={{ ml: 2 }}
        type="button"
        variant="contained"
      >
        <Trans>Upload</Trans>
      </Button>
    );
  }

  return (
    <div {...other}>
      <Box
        sx={{
          alignItems: "center",
          border: 1,
          borderRadius: 1,
          borderColor: "divider",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          outline: "none",
          p: 6,
          ...(isDragActive && {
            backgroundColor: "action.active",
            opacity: 0.5
          }),
          "&:hover": {
            backgroundColor: "action.hover",
            cursor: "pointer",
            opacity: 0.5
          }
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Box
          sx={{
            "& img": {
              width: 100
            }
          }}
        >
          <img alt="Select file" src="/static/undraw_add_file2_gvbb.svg" />
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography color="textPrimary" variant="h6">
            {i18next.t("Select file")}
            {`${maxFiles && maxFiles === 1 ? "" : ""}`}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography color="textPrimary" variant="body1">
              {i18next.t("Drop file")}
              {`${maxFiles && maxFiles === 1 ? "" : ""}`} <Trans>or</Trans>{" "}
              <Link color="primary" underline="always">
                <Trans>browse</Trans>
              </Link>{" "}
              <Trans>thorough your machine</Trans>
            </Typography>
          </Box>
        </Box>
      </Box>
      {files.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <List>
            {files.map((file) => (
              <ListItem
                key={file.path}
                sx={{
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 1,
                  "& + &": {
                    mt: 1
                  }
                }}
              >
                <ListItemIcon>
                  <Close fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={file.name}
                  primaryTypographyProps={{
                    color: "textPrimary",
                    variant: "subtitle2"
                  }}
                  secondary={bytesToSize(file.size)}
                />
                <Tooltip title="Remove">
                  <IconButton
                    edge="end"
                    onClick={() => onRemove && onRemove(file)}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 2
            }}
          >
            <Button
              color="primary"
              onClick={onRemoveAll}
              size="small"
              type="button"
              variant="text"
            >
              <Trans>Remove all</Trans>
            </Button>
            {button}
          </Box>
        </Box>
      )}
    </div>
  );
};

FileDropzone.propTypes = {
  accept: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  disabled: PropTypes.bool,
  files: PropTypes.array,
  getFilesFromEvent: PropTypes.func,
  maxFiles: PropTypes.number,
  maxSize: PropTypes.number,
  minSize: PropTypes.number,
  noClick: PropTypes.bool,
  noDrag: PropTypes.bool,
  noDragEventsBubbling: PropTypes.bool,
  noKeyboard: PropTypes.bool,
  onDrop: PropTypes.func,
  onDropAccepted: PropTypes.func,
  onDropRejected: PropTypes.func,
  onFileDialogCancel: PropTypes.func,
  onRemove: PropTypes.func,
  onRemoveAll: PropTypes.func,
  onUpload: PropTypes.func,
  preventDropOnDocument: PropTypes.bool,
  noUploadButton: PropTypes.bool
};

FileDropzone.defaultProps = {
  files: []
};

export default FileDropzone;
