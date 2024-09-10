import React from 'react'

export const ModalContent = ({onDelete,onClose}) => {
  return (
    <>
    <div className='overlay'/>
    <div className='modal'>
        <h3>Confirm to delete?</h3>
        <div className='modalButton'>

        <button onClick={onDelete}>Yes</button>
        <button onClick={onClose}>No</button>
        </div>
    </div>
    </>
  )
}
