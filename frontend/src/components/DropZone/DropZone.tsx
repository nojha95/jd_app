import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';


interface Props {
    acceptedFile?: File | null;
    lable:string;
    onDrop: (acceptedFiles: File[]) => void;
}

export default function DropZone({acceptedFile,lable, onDrop}: Props) {

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    return (
        <div {...getRootProps()}>
        <input {...getInputProps()} />
{/*         
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop {lable} file here, or click to select files</p>
        )} */}
        {acceptedFile?.name == null ? 
        <p>Drag 'n' drop {lable} file here, or click to select files</p> :
        <p>Uploaded File : {acceptedFile.name}</p>
        
        }

      </div>
    )
}