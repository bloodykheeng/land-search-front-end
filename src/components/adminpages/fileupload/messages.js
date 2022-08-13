import React, { useState } from 'react';
import {Alert,Button} from 'react-bootstrap';

const Messages = ({msg}) => {
    const [show, setShow] = useState(true);
    if (show) {
        return (
          <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Alert</Alert.Heading>
            <p>
             {msg}
            </p>
          </Alert>
        );
      }
      return <Button onClick={() => setShow(true)}>Show Alert</Button>;
}

export default Messages