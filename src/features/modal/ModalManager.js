import React from 'react';
import Modal from 'react-modal';
import Test from './Test';
import { useSelector } from "react-redux";

export default function ModalManager() {
  const currentModal = useSelector(state => state.modal.currentModal);

  const modalsList = {
    Test,
  };
  const ModalComponent = modalsList[currentModal];
  
  
  return (
    <Modal
      className={'mdoal-container'}
      isOpen={!!currentModal} // make sure the boolean value is correct, if string passed we want to pass true
    >
    <Test />
    </Modal>
  );
};

ModalManager.propTypes = {};
ModalManager.defaultProps = {};
