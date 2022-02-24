import React, { useEffect, useContext } from 'react'
import $ from 'jquery';
import Chip from '@material-ui/core/Chip';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Modal from "../../SharedComponents/Modal";
import Form from "./AddEditForm";
import { getSession,markingComplete } from '../../../api/api.js'
import { toast } from 'react-toastify';
import ToastContext from '../../../context/ToastContext';
import { toggle } from '../../../actions/pacerActions';

import { useDispatch } from "react-redux";
// function formatAMPM(date) {
//     var hours = date.getHours();
//     var minutes = date.getMinutes();
//     var ampm = hours >= 12 ? 'pm' : 'am';
//     hours = hours % 12;
//     hours = hours ? hours : 12; // the hour '0' should be '12'
//     minutes = minutes < 10 ? '0'+minutes : minutes;
//     var strTime = hours + ':' + minutes + ' ' + ampm;
//     return strTime;
//   }
export default function UpCommingClasses() {
    const [editModal, setEditModal] = React.useState(false);
    const [session, setSession] = React.useState([]);

    const dispatch = useDispatch();
    const toastOptions = useContext(ToastContext);
    const [editRow, setEditRow] = React.useState({});
    const [add, setAdd] = React.useState(false);

    useEffect(() => {
        fetchSession()
    }, [])
    const recordUpdate = () => {
        setAdd(false)
        fetchSession()
        $('#fetchSession').dataTable().fnDestroy();
        setEditModal(false);
    }
    const addItem=()=>{
        setAdd(true)
        setEditModal(true)
    }
    const editItem = (item) => {
        if (item) {
            setEditRow({ ...item });
        }
        setEditModal(true)
    }
    const markComplete = (id) => {
        dispatch(toggle())
        markingComplete(id)
            .then(res => {
                dispatch(toggle())
                fetchSession()
            })
            .catch(err => {
                dispatch(toggle())
                console.log(err);
                // toast.error(err.response.data.error, toastOptions);
            })
    }
    const fetchSession = () => {
        dispatch(toggle())

        getSession()
            .then(res => {
                dispatch(toggle())
                setSession([...res.data.data])
                if ($.fn.dataTable.isDataTable('#session_table')) {

                    $('#session_table').DataTable();
                }
                else {
                    $('#session_table').DataTable();
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
                    <Button color="primary" onClick={() => addItem()} ><AddIcon />Create Class</Button>
                </ButtonGroup>
            </div>
            <table id="session_table" className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Sr #</th>
                        <th>Student Name</th>
                        <th>Tutor Name</th>
                        <th>Class</th>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Link</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        session.map((item, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>
                                        {
                                            item.students.map((student,index)=>{
                                                return (
                                                    <Chip label={student.name} color="primary" />
                                                
                                                )
                                            })
                                        }
                                    </td>
                                    <td>{item.tutor_name}</td>
                                    <td>{item.class_name}</td>
                                    <td>{item.date}</td>
                                    <td>{item.start_time}</td>
                                    <td>{item.end_time}</td>
                                    <td> <a href={"http://localhost:3000/meeting.html?code="+item.link} target="_blank"> Link</a></td>
                                    <td>
                                        <ButtonGroup size="small" variant="contained">
                                            <Button color="primary" onClick={() => markComplete(item.id)} >Mark Complete</Button>
                                            <Button color="primary"  onClick={() => editItem(item)} >Edit</Button>

                                        </ButtonGroup>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
            <Modal title="Session" open={editModal} close={() => setEditModal(false)}>
                <Form data={editRow}  isAdd={add} onFormSubmit={() => recordUpdate()}  close={() => setEditModal(false)} />
            </Modal>
        </div >
    )
}
