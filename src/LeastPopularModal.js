import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './LeastPopularModal.css'

const LeastPopularModal = (props) => {
  const {
    buttonLabel,
    className,
    track
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  console.log(track)
  return (
    <div>
      <Button color="success" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader className="bg text-white"toggle={toggle}>Least Popular Track</ModalHeader>
        <ModalBody className="text-center bg">
          <img height="320" width="320" src={track.img}/>
          <h4 className="text-white">{track.name}</h4>
          <h5 className="text-white">{track.artist}</h5>
        </ModalBody>
        <ModalFooter className="bg">
          <Button className="col-sm-12" color="success" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default LeastPopularModal;