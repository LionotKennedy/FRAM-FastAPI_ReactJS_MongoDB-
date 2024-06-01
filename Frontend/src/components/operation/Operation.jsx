import './operation.css'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Stack, TextField, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ModalWindow from "../modal/ModalWindow";
import ReactPaginate from 'react-paginate';
import { CheckCircle, Clear } from "@mui/icons-material";
// coucou
import img1 from "../../assets/add.png";
import img2 from "../../assets/delete.png";
import img3 from "../../assets/edit.png";
import ModalUpdate from '../modal/ModalUpdate';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';




const Operation = () => {
    const navigate = useNavigate();
    const [clients, setClient] = useState([]);
    const [total, setTotal] = useState([]);
    const [maxi, setMaxi] = useState([]);
    const [mini, setMini] = useState([]);
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const [deletionId, setDeletionId] = useState(null);
    const [openUpdate, setOpenUpdate] = useState(null);
    const [updateId, setUpdateId] = useState(null);
    const [search, setSearch] = useState('');
    var status
    const [compteInput, setCompteInput] = useState({
        nameClient: "",
        soldeClient: "",
    });

    const handleInput = (e) => {
        e.persist();
        setCompteInput({
            ...compteInput,
            [e.target.name]: e.target.value,
        });
        // setFormError("");
    };

    // ************* PAGINATE ***************//
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 7; // Nombre d'éléments par page
    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = clients.slice(indexOfFirstItem, indexOfLastItem);
    // ************* ENDING ***************//


    // ************* REFRESH DATA FROM SERVER ***************//
    const refresh = () => {
        const fetchData = async () => {
            axios.get(`http://127.0.0.1:8000/api/AllCompte`).then((reponse) => {
                if (reponse.data.status === 200) {
                    console.log(reponse.data.data)
                    setClient(reponse.data.data);
                }
            });
        }
        fetchData()

        const fetchTotal = async () => {
            // try {
            //     const res = await axios.get(`http://127.0.0.1:8000/api/sum-solde`);
            //     console.log(res.data.total_solde);
            //     setTotal(res.data.total_solde);
            // } catch (err) {
            //     console.log(err);
            // }
            axios.get(`http://127.0.0.1:8000/api/sum-solde`).then((reponse) => {
                if (reponse.data.status === 200) {
                    console.log(reponse.data.total_solde)
                    setTotal(reponse.data.total_solde);
                }
                else if (reponse.data.status === 500) {
                    console.log(reponse.message)
                }
            });
        }
        fetchTotal()

        const fetchMax = async () => {
            axios.get(`http://127.0.0.1:8000/api/max-solde`).then((reponse) => {
                if (reponse.data.status === 200) {
                    console.log(reponse.data.max_solde)
                    setMaxi(reponse.data.max_solde);
                }
                else if (reponse.data.status === 500) {
                    console.log(reponse.message)
                }
            });
        }
        fetchMax()

        const fetchMin = async () => {

            axios.get(`http://127.0.0.1:8000/api/min-solde`).then((reponse) => {
                if (reponse.data.status === 200) {
                    console.log(reponse.data.min_solde)
                    setMini(reponse.data.min_solde);
                }
                else if (reponse.data.status === 500) {
                    console.log(reponse.message)
                }
            });

        }
        fetchMin()

    }
    // ************* ENDING ***************//



    // ************* FETCH DATA FROM SERVER ***************//
    // useEffect(() => {
    //     refresh()
    // }, [])
    // ************* ENDING ***************//



    // ************* DELETE DATA FROM SERVER ***************//
    const handleDelete = (id) => {
        setDeletionId(id);
        setOpenConfirmationDialog(true);
        refresh();
        console.log('res =' + total);
    }

    const handleConfirmationDialogClose = () => {
        setOpenConfirmationDialog(false);
        refresh();
    }

    const handleConfirmDelete = async () => {
        axios.delete(`http://127.0.0.1:8000/api/delete/${deletionId}`).then(res => {
            if (res.data.status === 200) {
                toast.success(res.data.message);
                setOpenConfirmationDialog(false);
                refresh();
            }

        });

    }
    // ************* ENDING ***************//



    // ************* PAGINATION ***************//
    useEffect(() => {
        refresh();
    }, [currentPage]); // Rafraîchir lorsque la page change
    // ************* ENDING ***************//



    // *************** SHOW MODAL ADD ******************//
    const [open, setOpen] = useState(false);
    const handleOpenPopup = () => {
        setOpen(true);
        refresh();
    }
    const handleClosePopup = () => {
        setOpen(false);
        refresh();
    }
    const handleSubmitModal = async ({ name, solde }) => {
        handleClosePopup();
        refresh();
    };
    // ************* ENDING ***************//



    // *************** SHOW MODAL UPDATE ******************// 
    const [values, setValues] = useState({
        name: '',
        solde: ''
    });

    const UpdateMadalOpen = async (id) => {
        setUpdateId(id);
        // console.log(id);
        setOpenUpdate(true);

        axios.get(`http://127.0.0.1:8000/api/edit/` + id).then(res => {
            if (res.data.status === 200) {
                console.log(res.data.message);
                console.log(res.data.data);
                setCompteInput(res.data.data);
            }
        });
    }


    const UpdateModalClose = () => {
        setOpenUpdate(false);
        refresh();
    }

    // ************* UPDATE DATA FROM SERVER ***************//
    const submitPlayerUpate = (e) => {
        e.persist();
        setCompteInput({
            ...compteInput,
            [e.target.name]: e.target.value,
        });
        console.log(updateId);
        console.log(compteInput.nameClient)
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
        console.log(formData)

        axios.put(`http://127.0.0.1:8000/api/update/${updateId}`, formData).then(res => {
            if (res.data.status === 200) {
                refresh();
                setOpenUpdate(false);
                toast.success(res.data.message);
            }
            else if (res.data.status === 404) {
                refresh();
                setOpenUpdate(false);
                toast.error(res.data.message);
            }
            else if (res.data.status === 500) {
                refresh();
                setOpenUpdate(false);
                toast.error(res.data.message);
            }
        });

    }






    // *************** SHOW MODAL ADD ******************//
    const [opent, setOpent] = useState(false);
    const [updatet, setUpdatet] = useState(null);
    const handleOpenPopupt = (id) => {
        setUpdatet(id);
        // console.log(id);
        setOpent(true);
        // refresh();
    }
    const handleClosePopupt = () => {
        setOpent(false);
        // refresh();
    }

    const handleSubmitModalt = async ({ name, solde }) => {
        handleClosePopup();
    };

    // ************* ENDING ***************//


    return (
        <>
            <div>
                <div className='containerBar'>
                    <div className='titleCom'>Gestion Client Bancaire</div>
                    <div className='btnAdd'>
                        <img src={img1} alt="" onClick={handleOpenPopup} className='img1' />
                        <div className="input-groupEquipe">
                            <FaSearch className="iconE" />

                            <input
                                className="inputEquipe"
                                type="text"
                                placeholder="Recherche..."
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>


                        <ModalWindow open={open} onClose={handleClosePopup} onSubmit={handleSubmitModal} handleClosePopup={handleClosePopup} refresh={refresh} />
                        <ModalUpdate open={opent} onClose={handleClosePopupt} onSubmit={handleSubmitModalt} refresh={refresh} handleOpenPopupt={handleOpenPopupt} updateId={updatet} />
                    </div>
                    <table className='table'>
                        <thead className="headerTable">
                            <tr className='colorBG'>
                                <th scope="col"># </th>
                                <th scope="col">Nom </th>
                                <th scope="col">Solde </th>
                                <th scope="col">Status </th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentItems.filter((item) => {
                                    return search.toLowerCase() === ''
                                        ? item
                                        : item.nameClient.toLowerCase().includes(search);
                                }).map((item, i) => (
                                    <tr key={i}>
                                        <td>{item.numClient}</td>
                                        <td>{item.nameClient}</td>
                                        <td>{item.soldeClient} Ar</td>
                                        <td>{item.soldeStatus}</td>
                                        <td>
                                            {/* <div className='global'>
                                            </div> */}
                                            <FaEdit className="testeE" onClick={() => UpdateMadalOpen(item.idClient)} />
                                            <span className='espace'></span>
                                            <FaTrash className='testeA' onClick={() => handleDelete(item.idClient)} ></FaTrash>
                                            {/* <img src={img2} alt="" onClick={() => handleDelete(item.idClient)} className='img3' /> */}
                                            {/* <img src={img3} alt="" onClick={() => UpdateMadalOpen(item.idClient)} className='img2' /><span className='espace'></span> */}
                                            {/* <img src={img1} alt="" onClick={() => handleOpenPopupt(item.idClient)} className='img1' /> */}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <div className="posission">
                        <ReactPaginate
                            previousLabel={"<< Précédent"}
                            nextLabel={"Suivant >>"}
                            pageCount={Math.ceil(clients.length / itemsPerPage)}
                            onPageChange={({ selected }) => setCurrentPage(selected)}
                            containerClassName={"pagination"}
                            pageLinkClassName="pagination__link__active"
                            previousLinkClassName={"pagination__link"}
                            nextLinkClassName={"pagination__link"}
                            disabledClassName={"pagination__link--disabled"}
                            previousClassName={currentPage === 0 ? "pagination__link--disabled pagination__link" : "pagination__link"}
                            nextClassName={currentPage === Math.ceil(clients.length / itemsPerPage) - 1 ? "pagination__link--disabled pagination__link" : "pagination__link"}
                        />
                    </div>
                </div>

            </div>
            <div className='footer'>
                <div className='spanFooter'>
                    {/* {
                        total.map((dataTotal, i) => (
                            <div key={i}>
                                <span>Total = {dataTotal.total_solde} Ariary</span>
                                </div>
                            ))
                        } */}
                    <span>Total = {total} Ariary</span>
                </div>
                <div className='spanFooter'>
                    <span>Maximal = {maxi} Ariary</span>
                </div>
                <div className='spanFooter'>
                    <span>Minimal = {mini} Ariary</span>
                </div>
            </div>

            <Dialog
                open={openConfirmationDialog}
                onClose={handleConfirmationDialogClose}
            >
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    Êtes-vous sûr de vouloir supprimer ce client ?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmationDialogClose} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={handleConfirmDelete} color="primary">
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>

            <ToastContainer position='top-center' theme='dark' transition={Zoom} />
            {/* UPDATE MODAL */}
            <Dialog open={openUpdate} onClose={UpdateModalClose} fullWidth maxWidth="sm">
                <DialogTitle className="titleContent">
                    <Typography variant="h5" color="primary.main" className="colorTitle" >Modifiaction des Clients </Typography>
                    <p onClick={UpdateModalClose} style={{ float: 'right' }}>
                        <CloseIcon color="primary" className="closeContentM"></CloseIcon>
                    </p>
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2} margin={2}>
                        <TextField
                            variant="outlined"
                            label="Nom"
                            name="nameClient"
                            onChange={handleInput}
                            value={compteInput.nameClient}
                        />

                        <TextField
                            variant="outlined"
                            label="Solde"
                            name="soldeClient"
                            onChange={handleInput}
                            value={compteInput.soldeClient}
                        />

                        <Box mt={3} display="flex" >
                            <Button
                                className="validerCompte"
                                variant="contained"
                                color="primary"
                                size="medium"
                                endIcon={<CheckCircle />}
                                fullWidth
                                onClick={submitPlayerUpate}
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
                                    onClick={UpdateModalClose}
                                >
                                    Annuler
                                </Button>
                            </NavLink>
                        </Box>
                    </Stack>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default Operation;
