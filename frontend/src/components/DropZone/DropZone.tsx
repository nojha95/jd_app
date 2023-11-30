// import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

interface Props {
  acceptedFile?: File | null;
  lable: string;
  onDrop: (acceptedFiles: File[]) => void;
}

export default function DropZone({ acceptedFile, lable, onDrop }: Props) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div
      {...getRootProps()}
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <input {...getInputProps()} />

      {/* {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop {lable} file here, or click to select files</p>
      )} */}

      {acceptedFile?.name == null ? (
        <>
          <FileUploadIcon sx={{ fontSize: 40 }} />
          <p style={{ padding: 3 }}>
            Drag 'n' drop {lable} file here, or click to select files
          </p>
        </>
      ) : (
        <>
          <InsertDriveFileIcon sx={{ fontSize: 40 }} />
          <p style={{ padding: 3 }}>Uploaded File : {acceptedFile.name}</p>
        </>
      )}
    </div>
  );
}
