import { useState } from "react"
import ModalContext from './ModalContext.js'
import PropTypes from "prop-types";

ModalProvider.propTypes = {
    children: PropTypes.node.isRequired
}
function ModalProvider({children}){
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }
    return(
        <ModalContext.Provider value={{isModalOpen, openModal, closeModal}}>
            {children}
        </ModalContext.Provider>
        
        
    )
}



export default ModalProvider