// import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

// Converting the MODEL to a COMPOUND COMPONENT

function AddCabin() {
    return (
        <div>
            <Modal>
                <Modal.Open opens="cabin-form">
                    <Button>Add new cabin</Button>
                </Modal.Open>
                <Modal.Window name="cabin-form">
                    <CreateCabinForm />
                </Modal.Window>
            </Modal>
        </div>
    );
}
         
        //      <Modal.Open opens="table">
        //         <Button>Show table</Button>    
        //      </Modal.Open>
        //      <Modal.Window name="table">
        //         <CabinTable />
        //    </Modal.Window>   
       

// function AddCabin() {
//      const [isOpenModal, setIsOpenModal] = useState(false);
//     return (
//        <div>
//              <Button onClick={() => setIsOpenModal((show) =>!show)}>Add new cabin</Button>
//             {isOpenModal &&
//                 <Modal onClose = {()=>setIsOpenModal(false)}>
//                     <CreateCabinForm onCloseModal ={() => setIsOpenModal(false)} />
//                 </Modal>}
//       </div>
//     )
// }

 export default AddCabin;
