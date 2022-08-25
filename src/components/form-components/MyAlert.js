import {Alert} from 'react-bootstrap';

const MyAlert = ({msg, variant}) => {
    
      return(
        <Alert variant={variant}>
          {msg}
        </Alert>
      );
}
export default MyAlert;