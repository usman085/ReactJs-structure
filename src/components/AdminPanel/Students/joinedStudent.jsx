import React, { useEffect,useContext } from 'react'
import $ from 'jquery';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from "../../SharedComponents/Modal";
import Form from "./EditForm"
import { getJoinedStudents,removeStudent } from '../../../api/api';
import { toast } from 'react-toastify';
import ToastContext from '../../../context/ToastContext';
import { toggle } from '../../../actions/pacerActions';
import { useDispatch } from "react-redux";
export default function JoinedStudent() {
    const [editModal, setEditModal] = React.useState(false);
    const [editRow, setEditRow] = React.useState({});

    const editItem = (item) => {
        if (item) {
            setEditRow({ ...item });
        }
        setEditModal(true)
    }
    const recordUpdate = () => {
    
        student()
        $('#category_table').dataTable().fnDestroy();
        setEditModal(false);
    }
    const [students, setStudent] = React.useState([]);
    const dispatch = useDispatch();
    const toastOptions = useContext(ToastContext);
    useEffect(() => {
        student();
    }, []);


    const student = () => {
        getJoinedStudents()
            .then(res => {
                setStudent([...res.data.student]);
                $('#category_table').DataTable()

                console.log(res)
            })
            .catch(err => console.log(err))
    }
    const removeItem = (id) => {
        dispatch(toggle())
        removeStudent(id)
            .then((res) => {
                dispatch(toggle())
                toast.success(res.data.message, toastOptions);
                $('#category_table').dataTable().fnDestroy();
                student()
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
            <table id="category_table" className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Sr #</th>
                        <th>Name</th>
                        <th>Father Name</th>
                        <th>Contact No</th>
                        <th>Class</th>
                    
                        <th>Address</th>
                        <th>Gender</th>
                        <th>Date Of Birth</th>
                        <th>Status</th>
                        <th>Action</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        students.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.father_name}</td>
                                    <td>{item.phone_no}</td>
                                    <td>{item.class_name}</td>
                                    <td>{item.address}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.date_of_birth}</td>
                                    <td>
                                    {item.is_active ? <Chip label='Active' color="primary" /> : <Chip label='In-Active' disabled />}
                                     </td>
                                    <td>
                                        <ButtonGroup size="small" variant="contained">
                                            <Button color="primary" onClick={() => editItem(item)}><EditIcon /></Button>
                                            <Button color="primary"  onClick={() => removeItem(item.id)} ><DeleteIcon /></Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            );
                        })
                    }


                </tbody>
            </table>
            <Modal title="Update" open={editModal} close={() => setEditModal(false)}>
            <Form data={editRow}  onFormSubmit={() => recordUpdate()} />

            </Modal>
        </div>
    )
}
