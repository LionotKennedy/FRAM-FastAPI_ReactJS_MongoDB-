import "./modalWindow.css"
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CheckCircle, Clear } from "@mui/icons-material";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const ModalWindow = ({ open, onClose, refresh, handleClosePopup }) => {
  var status;
  const [formError, setFormError] = useState("");
  const [compteInput, setCompteInput] = useState({
    nameClient: "",
    soldeClient: "",
  });

  const resetForm = () => {
    setCompteInput({
      nameClient: "",
      soldeClient: "",
      error_list: {},
    });
    setFormError("");
  };

  const handleInput = (e) => {
    e.persist();
    setCompteInput({
      ...compteInput,
      [e.target.name]: e.target.value,
    });
    setFormError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setCompteInput({
      ...compteInput,
      error_list: {},
    });
    setFormError("");
    const errors = {};
    if (compteInput.nameClient === "") {
      // errors.salaire = "Type de matériel est requis";
      // errors.salaire = "Type de matériel est requis";
      toast.error("Champs nom est requis");
    }
    else if (compteInput.soldeClient === "") {
      // errors.dateDebut = "Description du matériel est requis";
      toast.error("Champs solde est requis");
    }

    else if (Object.keys(errors).length > 0) {
      let errorString = "Les champs suivants sont requis : ";
      errorString += Object.keys(errors).join(", ");

      setCompteInput({
        ...compteInput,
        error_list: errors,
      });
      setFormError(errorString);
    } else {
      console.log(compteInput.soldeClient)

      if (compteInput.soldeClient < 1000) {
        status = "insuffisant";
        console.log(status);
      }
      else if (compteInput.soldeClient <= 1000 || compteInput.soldeClient <= 5000) {
        status = "moyen";
        console.log(status);
      }
      else {
        status = "éléve";
        console.log(status);
      }
      console.log(compteInput.nameClient)
      console.log(compteInput.soldeClient)
      const formData = new FormData();
      formData.append("nameClient", compteInput.nameClient);
      formData.append("soldeClient", compteInput.soldeClient);
      formData.append("soldeStatus", status);
      console.log(formData);

      axios.post(`http://127.0.0.1:8000/api/addCompte`, formData).then(res => {
        if (res.data.status === 200) {
          toast.success(res.data.message);
          refresh();
          handleClosePopup();
        }
      });
      resetForm();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="titleContent">
        <Typography variant="h5" color="primary.main" className="colorTitle" >Ajouter un Client</Typography>
        <IconButton className="closeContent" onClick={onClose} style={{ float: 'right' }}>
          <CloseIcon color="primary" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} margin={2}>
          <TextField
            variant="outlined"
            label="Nom"
            name="nameClient"
            onChange={handleInput}
            value={compteInput.nameClient}
            style={{ borderColor: 'purple' }}
          />
          <TextField
            variant="outlined"
            label="Solde"
            name="soldeClient"
            type='number'
            onChange={handleInput}
            value={compteInput.soldeClient}
            style={{ borderColor: 'purple' }}
          />
          <Box mt={3} display="flex" >
            <Button
              color="primary"
              variant="contained"
              endIcon={<CheckCircle />}
              className="validerCompte"
              fullWidth
              onClick={handleSubmit}
            >
              Valider
            </Button>

            <NavLink
              style={{ textDecoration: "none" }}
            >
              <Button
                type="button"
                variant="contained"
                className="annulerCompte"
                color="secondary"
                size="medium"
                endIcon={<Clear />}
                fullWidth
                style={{ marginLeft: "10px" }}
                onClick={onClose}
              >
                Annuler
              </Button>
            </NavLink>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ModalWindow;
