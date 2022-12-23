import React, { FC } from 'react';

interface ConfirmationModalProps {
  actionParams?: any;
  action: (params: any) => any;
  dialog: string;
}

const ConfirmationModal: FC<ConfirmationModalProps> = (props) => {
  return (
    <label data-testid="ConfirmationModal" htmlFor="delete-modal" className="modal cursor-pointer">
      <label className="modal-box relative">
        <span className="text-md">{ props.dialog ?? 'Are you sure you proceed?'}</span>
        <label htmlFor="delete-modal" className="btn btn-secondary float-right mt-4" onClick={() => props.action(props.actionParams)}>Delete</label>
      </label>
    </label>
  );
};

export default ConfirmationModal;
