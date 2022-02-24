import React, { useEffect } from 'react';
import DasboardCard from "../SharedComponents/DashboardCard";
import Grid from '@material-ui/core/Grid';
import PeopleIcon from '@material-ui/icons/People';
import ClassIcon from '@material-ui/icons/Class';
import SubjectIcon from '@material-ui/icons/Subject';
import { toggle } from '../../actions/pacerActions';
import { useDispatch } from "react-redux";
import { CountRecord } from '../../api/api'

export default function Dashboard(props) {
    useEffect(() => {
        fetchRecord()

    }, [])
    const [data, setData] = React.useState({});
   
    const fetchRecord = () => {


        CountRecord()
            .then(res => {
              
                setData(res.data)

            })
            .catch(err => {
            
                console.log(err);
                // toast.error(err.response.data.error, toastOptions);
            })
    }
    return (
        <React.Fragment>
            <div>
                <div >
                    <Grid container spacing={2}>
                        <Grid item md={4} xs={12}>
                            <DasboardCard icon={<PeopleIcon />} subtitle="Total Enquire Students" value={data.total_enquire_students} />
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <DasboardCard icon={<PeopleIcon />} subtitle="Total Joined Students" value={data.total_joined_students} />
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <DasboardCard icon={<PeopleIcon />} subtitle="Total Enquire Tutors" value={data.total_enquire_tutors} />
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <DasboardCard icon={<PeopleIcon />} subtitle="Total Joined Tutors" value={data.total_joined_tutors} />
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <DasboardCard icon={<ClassIcon />} subtitle="Total Classes" value={data.total_class} />
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <DasboardCard icon={<SubjectIcon />} subtitle="Total Subjects" value={data.total_subjects} />
                        </Grid>
                    </Grid>
                </div>
            </div>
        </React.Fragment>
    );
}
