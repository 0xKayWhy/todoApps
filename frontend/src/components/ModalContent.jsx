import React from 'react'

export const ModalContent = ({onDelete,onClose}) => {
  return (
    <>
    <div className='overlay'/>
    <div className='modal'>
        <span>Confirm to delete?</span>
        <div className='modalButton'>

        <button onClick={onDelete}>Yes</button>
        <button onClick={onClose}>No</button>
        </div>
    </div>
    </>
  )
}
