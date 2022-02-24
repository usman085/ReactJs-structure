import React, { useEffect, useContext } from 'react'
import $ from 'jquery';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from "../../SharedComponents/Modal"
import Form from "./AddEditForm";
import { getJoinedTutor,removeTutor } from '../../../api/api.js'
import { toast } from 'react-toastify';
import ToastContext from '../../../context/ToastContext';
import { toggle } from '../../../actions/pacerActions';
import { useDispatch } from "react-redux";
export default function JoinedStudent() {
    const dispatch = useDispatch();
    const toastOptions = useContext(ToastContext);
    useEffect(() => {
        fetchJoinedTutor()
    }, [])
    const [editModal, setEditModal] = React.useState(false);
    const [joinedTutor, setJoinedTutor] = React.useState([]);
    const [editRow, setEditRow] = React.useState({});

    const editItem = (item) => {
        if (item) {
            setEditRow({ ...item });
        }
        setEditModal(true)
    }
    const recordUpdate = () => {
    
        fetchJoinedTutor()
        $('#joined_table').dataTable().fnDestroy();
        setEditModal(false);
    }
    const fetchJoinedTutor = () => {
        dispatch(toggle())

        getJoinedTutor()
            .then(res => {
                dispatch(toggle())
                setJoinedTutor([...res.data.data])
                if ($.fn.dataTable.isDataTable('#joined_table')) {

                    $('#joined_table').DataTable();
                }
                else {
                    $('#joined_table').DataTable();
                }
            })
            .catch(err => {
                dispatch(toggle())
                console.log(err);
                // toast.error(err.response.data.error, toastOptions);
            })
    }
    const removeItem = (id) => {
        dispatch(toggle())
        removeTutor(id)
            .then((res) => {
                dispatch(toggle())
                toast.success(res.data.message, toastOptions);
                $('#joined_table').dataTable().fnDestroy();
                fetchJoinedTutor()
            })
            .catch(err => {
                dispatch(toggle())
                // console.log(err);
                if (err.response && err.response.data)
                    toast.error(err.response.data.error, toastOptions);
            })
    }

    return (
        <div>
            <table id="joined_table" className="table table-striped table-bordered">
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
                        <th>Status</th>
                        <th>Action</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        joinedTutor.map((item, index) => {
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
                                        {item.is_active ? <Chip label='Active' color="primary" /> : <Chip label='In-Active' disabled />}
                                    </td>
                                    <td>
                                        <ButtonGroup size="small" variant="contained">
                                            <Button color="primary" onClick={() => editItem(item)}><EditIcon /></Button>
                                            <Button color="primary" onClick={() => removeItem(item.user_id)}><DeleteIcon /></Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>

                            )
                        })
                    }



                </tbody>

            </table>
            <Modal title="Update Tutor" open={editModal} close={() => setEditModal(false)}>
                <Form data={editRow}  onFormSubmit={() => recordUpdate()} />
            </Modal>
        </div>
    )
}
