import React, { useEffect,useContext } from 'react'
import $ from 'jquery';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { getEnquireStudents,addStudentToJoin } from '../../../api/api';
import { toast } from 'react-toastify';
import ToastContext from '../../../context/ToastContext';
import { toggle } from '../../../actions/pacerActions';
import { useDispatch } from "react-redux";
export default function EnquireStudent() {

    const dispatch = useDispatch();
    const toastOptions = useContext(ToastContext);
    const [students, setStudent] = React.useState([]);

    useEffect(() => {
        student();
    }, []);


    const student = () => {
        getEnquireStudents()
            .then(res => {
                setStudent([...res.data.student]);
                $('#category_table').DataTable()

                console.log(res)
            })
            .catch(err => console.log(err))
    }
    const joined = (id) => {
        dispatch(toggle())
        addStudentToJoin(id)
            .then(res => {
                dispatch(toggle())
                student()
            })
            .catch(err => {
                dispatch(toggle())
                console.log(err);
                // toast.error(err.response.data.error, toastOptions);
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
                                        <ButtonGroup size="small" variant="contained">
                                            <Button onClick={() => joined(item.id)} color="primary">
                                                <AddIcon />
                                            Joined
                                            </Button>
                                        </ButtonGroup>
                                    </td>

                                </tr>
                            );
                        })
                    }




                </tbody>

            </table>
        </div>
    )
}
