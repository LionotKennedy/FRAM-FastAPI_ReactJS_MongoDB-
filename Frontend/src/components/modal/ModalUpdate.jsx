import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Stack, TextField, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, NavLink } from 'react-router-dom';
import { CheckCircle, Clear } from "@mui/icons-material";
import axios from 'axios';

const ModalUpdate = ({ open, onClose, onSubmit, handleOpenPopupt, updateId }) => {
    const [name, setName] = useState('');
    const [solde, setSolde] = useState('');
    var status;
    const navigate = useNavigate();
    const [clients, setClient] = useState([]);
    // console.log("ID reçu dans ModalUpdate :", updateId);

    const recuperation = () => {
        const UpdateMadalOpen = async () => {
            // setUpdateId(id);
            // setOpenUpdate(true);
            console.log("ID reçu cheri :" + updateId);

            // axios.get(`http://127.0.0.1:8000/api/edit/` + updateId).then(res => {
            //     if (res.data.status === 200) {
            //         console.log(res.data.message);
            //         console.log(res.data.data);
            //         setClient(res.data.data);
            //     }
            // });
        }
        UpdateMadalOpen();
    }
    
    // ************* FETCH DATA FROM SERVER ***************//
    useEffect(() => {
        recuperation();
    },[])
    // ************* ENDING ***************//
    // open=()=>{
    //     console.log("coucou you update modal");
    // }


    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                Update des Clients Modal
                <IconButton onClick={onClose} style={{ float: 'right' }}>
                    <CloseIcon color="primary" />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Stack spacing={2} margin={2}>
                    <TextField
                        variant="outlined"
                        label="Nom"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        style={{ borderColor: 'purple' }}
                    />
                    <TextField
                        variant="outlined"
                        label="Solde"
                        name="solde"
                        onChange={(e) => setSolde(e.target.value)}
                        style={{ borderColor: 'purple' }}
                    />
                    <Box mt={3} display="flex" >
                        <Button
                            className="validerCompte"
                            variant="contained"
                            color="primary"
                            size="medium"
                            endIcon={<CheckCircle />}
                            fullWidth
                        // onClick={submitPlayerUpate}
                        >
                            Modification
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
            <DialogActions>{/* Ajoutez des boutons d'actions ici si nécessaire */}</DialogActions>
        </Dialog>
    );
};

export default ModalUpdate;
