import React, { useState } from 'react';
import Button from '@mui/material/Button';
import PublishIcon from '@mui/icons-material/Publish';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none',
});

export default function UploadPDFComponent() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
      setUploadSuccess(false); // Reset the success state
      setUploadError(''); // Clear any previous errors
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      setUploading(true);
      try {
        // Lógica para cargar el archivo
        console.log('Uploading', selectedFile);

        // Dummy timeout para simular la carga del archivo
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setUploadSuccess(true); // Indica que la carga fue exitosa
      } catch (error) {
        setUploadError('Error al cargar el archivo.'); // Un mensaje de error genérico
      } finally {
        setUploading(false); // Terminó el proceso de carga
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Input
        accept="application/pdf"
        id="upload-pdf"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="upload-pdf">
        <Button
          variant="outlined"
          component="span"
          color='success'
          startIcon={<PublishIcon />}
          disabled={uploading}
        >
          Subir PDF
        </Button>
      </label>
      {selectedFile && (
        <div className="mt-2 text-sm">
          Archivo seleccionado: {selectedFile.name}
        </div>
      )}
      {uploading && (
        <LinearProgress className="mt-2 w-full" />
      )}
      {!uploading && uploadSuccess && (
        <Alert severity="success" className="mt-2 w-full">
          Archivo cargado con éxito.
        </Alert>
      )}
      {!uploading && uploadError && (
        <Alert severity="error" className="mt-2 w-full">
          {uploadError}
        </Alert>
      )}
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleUpload}
        size='small'
        disabled={!selectedFile || uploading}
        className={'mt-2'}
      >
        Cargar
      </Button>
    </div>
  );
}
