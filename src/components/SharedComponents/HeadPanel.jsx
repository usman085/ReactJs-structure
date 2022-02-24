import React from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
export default function HeadPanel(props) {
    return (
        <React.Fragment>
            <div >
                <div style={{marginBottom:30}}>
                <Card>
                  <CardHeader title={props.title}/>
                </Card>
                </div>
            </div>
        </React.Fragment>
    );
}
 