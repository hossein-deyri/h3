import { RelationModalStyle } from './RelationModalStyle'
import { Close } from "@styled-icons/evil/Close"
import SearchModal from "components/common/SearchModal";
const RelationModal = (props) => {

    const closeHandler = () => {
        props.setModalState(false);
    }

    return (
        <RelationModalStyle>
            <div onClick={closeHandler} className="blackShadow"></div>
            <div className="modalContent p-5">
                <div className='closeHolder' onClick={closeHandler}> <Close /></div>
                <div className='d-flex pe-4'>
                    <SearchModal closeHandler={closeHandler} onClick={props.onClick} values={props.values} />
                </div>
            </div>
        </RelationModalStyle>
    )
}

export default RelationModal