import React, {useContext, useEffect } from 'react'
import $ from 'jquery';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Modal from "../../SharedComponents/Modal"
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import HeadPanel from "../../SharedComponents/HeadPanel"
import { getSubject ,removeSubject} from '../../../api/api.js'
import { toggle } from '../../../actions/pacerActions';
import { useDispatch } from "react-redux";
import Form from "./AddEditForm";
import { toast } from 'react-toastify';
import ToastContext from '../../../context/ToastContext';
export default function Subjects() {
    useEffect(() => {
        fetchSubjects()
        
    }, [])
    const [subjects, setSubjects] = React.useState([]);

    const dispatch = useDispatch();
    const toastOptions = useContext(ToastContext);

    const fetchSubjects = () => {
        dispatch(toggle())

        getSubject()
            .then(res => {
        dispatch(toggle())
        setSubjects([...res.data.data])
        if ( $.fn.dataTable.isDataTable( '#subject_table' ) ) {

                $('#subject_table').DataTable();
            }
            else {
                 $('#subject_table').DataTable(  );
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
        removeSubject(id)
            .then((res) => {
                dispatch(toggle())
                toast.success(res.data.message, toastOptions);
                $('#subject_table').dataTable().fnDestroy();
                fetchSubjects()
            })
            .catch(err => {
                dispatch(toggle())
                // console.log(err);
                if (err.response && err.response.data)
                    toast.error(err.response.data.error, toastOptions);
            })
    }
    const [editRow, setEditRow] = React.useState({});
    
    const [add, setAdd] = React.useState(false);

    const [editModal, setEditModal] = React.useState(false);
    const editItem = (item) => {
        if (item) {
            setEditRow({ ...item });
        }
        setEditModal(true)
    }
    const addItem=()=>{
        setAdd(true)
        setEditModal(true)
    }
    const recordUpdate = () => {
        setAdd(false)
        fetchSubjects()
        $('#subject_table').dataTable().fnDestroy();
        setEditModal(false);
    }
    return (
        <div>
            <div>
                <HeadPanel title="Subjects" />
            </div>
            <div style={{ paddingBottom: 24 }}>
                <ButtonGroup size="small" variant="contained">
                    <Button color="primary" onClick={() => addItem()} ><AddIcon />Add Subject</Button>
                </ButtonGroup>
            </div>
            <table id="subject_table" className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Sr #</th>
                        <th>Name</th>
                        <th>Action</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        subjects.map((item,index)=>{
                            return(
                                <tr>
                                <td>{index}</td>
                                <td>{item.name}</td>
        
                                <td>
                                    <ButtonGroup size="small" variant="contained">
                                        <Button color="primary" onClick={() => editItem(item)}><EditIcon /></Button>
                                        <Button color="primary" onClick={() => removeItem(item.id)} ><DeleteIcon /></Button>
                                    </ButtonGroup>
                                </td>
        
                            </tr>
                            )
                        })
                    }
                   


                </tbody>
            </table>
            <Modal title="Subject" open={editModal} close={() => setEditModal(false)}>
                <Form data={editRow} isAdd={add} onFormSubmit={() => recordUpdate()} close={() => setEditModal(false)}/>
            </Modal>
        </div>
    )
}
