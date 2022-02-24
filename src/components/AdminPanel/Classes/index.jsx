import React, { useEffect,useContext } from 'react'
import $ from 'jquery';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import HeadPanel from "../../SharedComponents/HeadPanel";
import Modal from "../../SharedComponents/Modal"
import AddIcon from '@material-ui/icons/Add';
import ClassForm from "./AddEditForm";
import { getClass,removeClass} from '../../../api/api.js'
import { toast } from 'react-toastify';
import ToastContext from '../../../context/ToastContext';
import { toggle } from '../../../actions/pacerActions';
import { useDispatch } from "react-redux";
export default function Classes() {
    const [editModal, setEditModal] = React.useState(false);
    const [classes, setClasses] = React.useState([]);
    const dispatch = useDispatch();
    const toastOptions = useContext(ToastContext);
    const [editRow, setEditRow] = React.useState({});
    const [add, setAdd] = React.useState(false);

    const editItem = (item) => {
        if (item) {
            setEditRow({ ...item });
        }
        setEditModal(true)
    }
    const fetchClasses = () => {
        dispatch(toggle())

        getClass()
            .then(res => {
        dispatch(toggle())
        setClasses([...res.data.data])
        if ( $.fn.dataTable.isDataTable( '#class_table' ) ) {

                $('#class_table').DataTable();
            }
            else {
                 $('#class_table').DataTable(  );
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
        removeClass(id)
            .then((res) => {
                dispatch(toggle())
                toast.success(res.data.message, toastOptions);
                $('#class_table').dataTable().fnDestroy();
                fetchClasses()
            })
            .catch(err => {
                dispatch(toggle())
                // console.log(err);
                if (err.response && err.response.data)
                    toast.error(err.response.data.error, toastOptions);
            })
    }
    const closeModal=()=>{
        setEditModal(false)
        fetchClasses()
        setAdd(false)
    }

    const recordUpdate = () => {
        $('#class_table').dataTable().fnDestroy();
        setAdd(false)
        fetchClasses()
    
        setEditModal(false);
    }
    const addItem=()=>{
        setAdd(true)
        setEditModal(true)
    }
    useEffect(() => {
        fetchClasses()
    }, [])
    return (
        <div>
            <div>
                <HeadPanel title="Subjects" />
            </div>
            <div style={{ paddingBottom: 24 }}>
                <ButtonGroup size="small" variant="contained">
                    <Button color="primary" onClick={() => addItem()} ><AddIcon />Add Class</Button>
                </ButtonGroup>
            </div>
            <table id="class_table" className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Sr #</th>
                        <th>Class</th>
                        <th>Subject</th>
                        <th>Action</th>

                    </tr>
                </thead>
                <tbody>
                  
                        {
                            classes.map((item,index)=>{
                                return(
                                    <tr>
                                         <td>{index+1}</td>
                        <td>{item.class_name}</td>
                        {/* <td>{ item.subjects[0]}</td> */}
                        <td>
                            {
                                item.subjects.map((sujectItem,index2)=>{
                                    return(
                                    <Chip label={sujectItem.name} color="primary" />
                                    )
                                })
                           }
                        </td>
                        <td>
                            <ButtonGroup size="small" variant="contained">
                                <Button color="primary" onClick={() => editItem(item)} ><EditIcon /></Button>
                                <Button color="primary" onClick={() => removeItem(item.id)} ><DeleteIcon /></Button>
                            </ButtonGroup>
                        </td>

                    </tr>
                                )
                            })
                        }
                       


                </tbody>
            </table>
            <Modal title="Class" open={editModal} close={() => setEditModal(false)}>
                <ClassForm data={editRow}  isAdd={add} onFormSubmit={() => recordUpdate()}  close={() => closeModal()}/>
            </Modal>
        </div>
    )
}
