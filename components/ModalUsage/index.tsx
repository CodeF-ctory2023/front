import { useState } from 'react';
import { Button, Modal, Box, TextareaAutosize, Snackbar } from '@mui/material';
import { deleteSolicitude } from '@/services/solicitudesService';
import { Solicitude } from '@/interfaces/solicitude';


interface ModalProps {
  title: string;
  content: string;
  text: string;
  label: string;
  reject: boolean;
  data: Solicitude;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  height: 550,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const ModalUsage = ({ title, content, text, label, reject, data }: ModalProps) => {

  const handleDelete = async () => {
    try {
      await deleteSolicitude(data.DriverSolicitude.id);
    } catch (error) {
      console.error("Error al rechazar la solicitud:", error);
    }
  };

  const [open, setOpen] = useState(false);
  const [fechaHora, setFechaHora] = useState('');
  const [isConfirm, setIsConfirm] = useState(true);
  const [isAccept, setIsAccept] = useState(false);
  const [texto, setTexto] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSend = () => {
    setIsAccept(true)
    setOpen(false)
    setOpen(true)
    setOpenSnackbar(true);

  };

  const handleClickOpen = () => {
    setIsConfirm(true);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsAccept(false);
  };

  const handleConfirm = () => {
    const fechaHoraActual = new Date().toLocaleString();
    setFechaHora(fechaHoraActual);
    setIsConfirm(false);
    setIsConfirm(false);
  }

  const handleChange = (event) => {
    setTexto(event.target.value);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>

      <Button className="bg-blue-700 text-slate-50" variant="contained" onClick={handleClickOpen}>
        {label}
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {isConfirm ?
          <Box sx={style} className="flex flex-col justify-center items-center" >
            <div className="flex flex-col justify-center items-center">
              <div className="text-center w-2/3">
                <div className='text-slate-800 text-5xl font-bold my-5'>
                  {title}
                </div>
                <p>
                  {content}
                </p>
              </div>

            </div>
            {reject ? <div className="m-5 space-x-5">

              <Button variant="contained" onClick={handleClose} className="bg-blue-700" href="requests" >Terminar</Button>
              <Button variant="contained" onClick={handleDelete} className="bg-red-500" >Eliminar Solicitud</Button>
            </div> : <div className="m-5 space-x-5">

              <Button variant="contained" onClick={handleConfirm} className="bg-blue-700"  >Continuar</Button>
              <Button variant="contained" onClick={handleClose} className="bg-blue-700"  >Cancelar</Button>
            </div>}

          </Box> :
          <Box sx={style} className="flex flex-col justify-center items-center" >
            <div className="flex flex-col justify-center items-center">
              <div className="text-center w-2/3">
                <div className='text-slate-800 text-5xl font-bold my-5'>
                  {title}
                </div>
                <div className=" text-xl my-5">
                  <p>
                    La solicitud ha sido rechazada.
                    Recuerde enviar una notificación de rechazo y detalles adicionales sobre porque
                    del rechazo.
                  </p>
                  <div className="flex flex-col justify-center items-center my-7">
                    {fechaHora}
                  </div >

                  <TextareaAutosize className="w-5/6 bg-slate-300"
                    minRows={7}
                    maxRows={8}
                    value={texto}
                    onChange={handleChange}></TextareaAutosize>

                </div>
              </div>

            </div>
            <div className="m-5 space-x-5">
              <Button variant="contained" onClick={handleSend} className="bg-blue-700" >Enviar</Button>

            </div>
          </Box>
        }
      </Modal>
      {
        isAccept ? <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        ><Box sx={style} className="flex flex-col justify-center items-center" >
            <div className="flex flex-col justify-center items-center">
              <div className="text-center w-2/3">
                <div className='text-slate-800 text-5xl font-bold my-5'>
                  {title}
                </div>
                <div className=" text-xl my-5">
                  <p>
                    {texto}
                  </p>
                  <div className="flex flex-col justify-center items-center my-7">
                    {fechaHora}
                  </div >
                </div>
              </div>
            </div>
            <div className="m-5 space-x-5">
              <Button variant="contained" onClick={handleDelete} className="bg-red-500" >Eliminar Solicitud</Button>
              <Button variant="contained" onClick={handleClose} className="bg-blue-700" href="requests" >Terminar</Button>
              <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="Proceso enviado correctamente"
              />
            </div>
          </Box>
        </Modal>
          : ""

      }

    </>
  );
}

