import React from 'react';
import {ProgressBar} from 'react-bootstrap';

const Progress = ({percentage}) => {
    const now = percentage;
    return <ProgressBar  now={now} label={`${now}%`} />;
}

export default Progress;