import React, { FunctionComponent } from "react";
import { Layer } from '@fluentui/react/lib/Layer';
import './customModal.css';
interface CustomModalProps {
    closeModal: () => void;
    openModal: () => void;
    fromContent: () => React.ReactNode;
    isOpen: boolean;
}

const CustomModal: FunctionComponent<CustomModalProps> = ({ openModal, closeModal, children, fromContent, isOpen }) => {

    return (
        <div className={`email ${isOpen ? 'expand' : ''}`} onClick={(e) => {
            openModal();
            e.stopPropagation();
        }}>
            <div className="from">
                <div className="from-contents">
                    {fromContent()}
                </div>
            </div>
            <div className="to">
                <div className="to-contents">
                    {isOpen && <Layer styles={{
                        content: {
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: '100%',
                            transition: `transition: opacity 200ms cubic-bezier(0.4, 0.0, 1, 1)`
                        },

                    }}>
                        {children}
                    </Layer>}
                </div>
            </div>
        </div>
    );
}

export default CustomModal;