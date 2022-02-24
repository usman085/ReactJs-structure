import React, { useEffect, useContext } from 'react'
import $ from 'jquery';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Modal from "../../SharedComponents/Modal"
import Form from "./AddEditForm";
import Chip from '@material-ui/core/Chip';
import { getEnquireTutor, addTutorToJoin } from '../../../api/api.js'
import { toast } from 'react-toastify';
import ToastContext from '../../../context/ToastContext';
import { toggle } from '../../../actions/pacerActions';
import { useDispatch } from "react-redux";

export default function EnquireStudent() {
    const [editModal, setEditModal] = React.useState(false);
    const [enqTutor, setEnqTutor] = React.useState([]);
    const dispatch = useDispatch();
    const toastOptions = useContext(ToastContext);
    const editItem = (item) => {

        setEditModal(true)
    }
    useEffect(() => {
        fetchEnqiryTutor()
        // $('#category_table').DataTable()
    }, [])
    const closeModal = () => {
        $('#enquire_table').dataTable().fnDestroy();
        setEditModal(false)
        fetchEnqiryTutor()
    }
    const joined = (id) => {
        dispatch(toggle())
        addTutorToJoin(id)
            .then(res => {
                dispatch(toggle())
                fetchEnqiryTutor()
            })
            .catch(err => {
                dispatch(toggle())
                console.log(err);
                // toast.error(err.response.data.error, toastOptions);
            })
    }
    const fetchEnqiryTutor = () => {
        dispatch(toggle())

        getEnquireTutor()
            .then(res => {
                dispatch(toggle())
                setEnqTutor([...res.data.data])
                if ($.fn.dataTable.isDataTable('#enquire_table')) {

                    $('#enquire_table').DataTable();
                }
                else {
                    $('#enquire_table').DataTable();
                }
            })
            .catch(err => {
                dispatch(toggle())
                console.log(err);
                // toast.error(err.response.data.error, toastOptions);
            })
    }
    return (
        <div>
            <div style={{ paddingBottom: 24 }}>
                <ButtonGroup size="small" variant="contained">
                    <Button color="primary" onClick={() => editItem()} ><AddIcon />Add Tutor</Button>
                </ButtonGroup>
            </div>
            <table id="enquire_table" className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Sr #</th>
                        <th>Name</th>
                        <th>Father Name</th>
                        <th>Contact No</th>
                        <th>Age</th>
                        <th>Address</th>
                        <th>Experience</th>
                        <th>Joining Date</th>
                        <th>Email</th>
                        <th>Subjects</th>
                        <th>Action</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        enqTutor.map((item, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{item.user_name}</td>
                                    <td>{item.father_name}</td>
                                    <td>{item.phone_no}</td>
                                    <td>{item.age}</td>
                                    <td>{item.address}</td>
                                    <td>{item.experience}</td>
                                    <td>{item.joining_date}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        {
                                            item.subjects.map((subject, index2) => {
                                                return (
                                                    <Chip label={subject.name} color="primary" />
                                                )
                                            })
                                        }

                                    </td>
                                    <td>
                                        <ButtonGroup size="small" variant="contained">
                                            <Button color="primary" onClick={() => joined(item.user_id)}>
                                                <AddIcon />
                                                Joined
                                        </Button>

                                        </ButtonGroup>
                                    </td>

                                </tr>

                            )
                        })
                    }


                </tbody>

            </table>
            <Modal title="Add Tutor" open={editModal} close={() => setEditModal(false)}>
                <Form close={() => closeModal()} />
            </Modal>
        </div>
    )
}
