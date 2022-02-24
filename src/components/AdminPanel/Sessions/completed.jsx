import React, { useEffect } from 'react'
import $ from 'jquery';
import { getCompleteSession} from '../../../api/api.js'
import { toggle } from '../../../actions/pacerActions';
import Chip from '@material-ui/core/Chip';
import { useDispatch } from "react-redux";
export default function CompletedClasses() {
    const [session, setSession] = React.useState([]);

    const dispatch = useDispatch();
    useEffect(() => {
        fetchCompleteSession()
    }, [])
    const fetchCompleteSession = () => {
        dispatch(toggle())

        getCompleteSession()
            .then(res => {
        dispatch(toggle())
        setSession([...res.data.data])
        if ( $.fn.dataTable.isDataTable( '#session_table' ) ) {

                $('#session_table').DataTable();
            }
            else {
                 $('#session_table').DataTable(  );
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
                      

                    </tr>
                </thead>
                <tbody>
                {
                        session.map((item,index)=>{
                            return(
                                <tr>
                                <td>{index+1}</td>
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
                              
                            </tr>
                            )
                        })
                    }
                

                </tbody>

            </table>
        </div>
    )
}
