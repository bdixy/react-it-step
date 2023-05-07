import React, { FC } from 'react'
import { Button, Modal } from 'react-bootstrap'

interface IDeleteModalProps {
  show: boolean
  onClose: () => void
  onDelete: () => void
}

const DeleteModal: FC<IDeleteModalProps> = ({show, onClose, onDelete}) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Підтвердження видалення</Modal.Title>
      </Modal.Header>
      <Modal.Body>Ви справді хочете видалити цей елемент?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Відмінити
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Видалити
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteModal