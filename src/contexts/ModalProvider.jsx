import { useState } from "react"
import ModalContext from './ModalContext.js'
import PropTypes from "prop-types";

ModalProvider.propTypes = {
    children: PropTypes.node.isRequired
}
function ModalProvider({children}){
    const [currentModal, setCurrentModal] = useState(null);

    const openModal = (modalType) => {
        console.log(`Opening modal: ${modalType}`)
        setCurrentModal(modalType)
        
    }

    const closeModal = () => {
        console.log("Closing modal")
        setCurrentModal(null)
        
    }
    return(
        <ModalContext.Provider value={{currentModal, openModal, closeModal}}>
            {children}
        </ModalContext.Provider>
        
        
    )
}



export default ModalProvider