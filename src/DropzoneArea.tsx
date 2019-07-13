import { Badge, Typography } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import { Theme, makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useEffect, useState } from "react";
import Dropzone, {
  DropzoneInputProps,
  DropzoneRootProps
} from "react-dropzone";

interface Props {
  onChange: (files: File[]) => any;
  filesLimit: number;
  acceptedFiles: string[];
  maxFileSize: number;
  dropzoneText: string;
  errorMessages: {
    acceptedFiles: string;
    filesLimit: string;
    maxFileSize: string;
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(2)
  },
  dropzone: {
    alignItems: "center",
    backgroundColor: "#fafafa",
    borderColor: "#eeeeee",
    borderRadius: "2px",
    borderStyle: "dashed",
    borderWidth: "2px",
    color: "#bdbdbd",
    display: "flex",
    flex: "1",
    flexDirection: "column",
    marginBottom: theme.spacing(1),
    outline: "none",
    padding: "20px",
    transition: "border .24s ease-in-out"
  },
  img: {
    display: "block",
    width: "auto",
    height: "100%"
  },
  thumb: {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box"
  },
  thumbsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
    "&:hover $removeBtn": { opacity: 1 }
  },
  thumbInner: {
    display: "flex",
    minWidth: 0,
    overflow: "hidden"
  },
  removeBtn: {
    opacity: 0,
    transition: ".5s ease"
  },
  nopreview: {
    alignItems: "center",
    display: "flex"
  }
}));

const NO_PREVIEW = "no_preview";

interface ExtendedFile extends File {
  preview: string;
}

function DropzoneArea({
  onChange,
  maxFileSize,
  acceptedFiles,
  filesLimit,
  errorMessages,
  dropzoneText
}: Props) {
  const classes = useStyles();
  const [files, setFiles] = useState<ExtendedFile[]>([]);

  const handleDelete = (index: number) => () => {
    const newFiles = files.filter((_f, i) => i !== index);
    onDrop(newFiles);
  };

  const onDrop = (newFiles: File[]) => {
    if (newFiles.length > filesLimit) {
      return alert(errorMessages.filesLimit);
    }

    setFiles(
      newFiles.map(file =>
        Object.assign(file, {
          preview: file.type.includes("image")
            ? URL.createObjectURL(file)
            : NO_PREVIEW
        })
      )
    );
    onChange(newFiles);
  };

  const handleDropRejected = (rejectedFiles: File[]) => {
    let message = "";
    rejectedFiles.forEach(rejectedFile => {
      if (!acceptedFiles.includes(rejectedFile.type)) {
        message += errorMessages.acceptedFiles;
      }
      if (rejectedFile.size > maxFileSize) {
        message += errorMessages.maxFileSize;
      }
    });
    alert(message);
  };

  useEffect(
    () => () => {
      files.forEach((file: ExtendedFile) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <Dropzone
      onDrop={onDrop}
      onDropRejected={handleDropRejected}
      maxSize={maxFileSize}
      accept={acceptedFiles.join(',')}
    >
      {({
        getRootProps,
        getInputProps
      }: {
        getRootProps: (args: { className: string }) => DropzoneRootProps;
        getInputProps: () => DropzoneInputProps;
      }) => (
        <section className={classes.container}>
          <div {...getRootProps({ className: classes.dropzone })}>
            <input {...getInputProps()} />
            <p>{dropzoneText}</p>
          </div>
          <aside className={classes.thumbsContainer}>
            {files.map((file, index) => (
              <Badge
                key={file.name}
                badgeContent={
                  <Fab
                    size="small"
                    className={classes.removeBtn}
                    onClick={handleDelete(index)}
                  >
                    <DeleteIcon />
                  </Fab>
                }
              >
                <div className={classes.thumb}>
                  <div className={classes.thumbInner}>
                    {file.preview === NO_PREVIEW ? (
                      <Typography className={classes.nopreview} variant="h6">
                        No Preview
                      </Typography>
                    ) : (
                      <img
                        src={file.preview}
                        className={classes.img}
                        alt="no preview"
                      />
                    )}
                  </div>
                </div>
              </Badge>
            ))}
          </aside>
        </section>
      )}
    </Dropzone>
  );
}

export default DropzoneArea;

DropzoneArea.defaultProps = {
  acceptedFiles: ["image/*", "video/*", "application/*"],
  filesLimit: 3,
  maxFileSize: 3000000,
  errorMessages: {
    acceptedFiles: "ファイル形式をサポートしていません。",
    filesLimit: "最大ファイル数を超えています。",
    maxFileSize: "ファイルサイズが大きすぎます。"
  },
  dropzoneText: "ファイルをドロップまたはファイルを選択する"
};
