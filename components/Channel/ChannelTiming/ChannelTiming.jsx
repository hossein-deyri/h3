import { ChannelTimingStyle, PreviewChannelContent, ContentContainer } from "./ChannelTimingStyle"
import Duration from "components/common/Duration"
import { DeleteBin6 } from "@styled-icons/remix-fill/DeleteBin6"
import { Pencil } from "@styled-icons/remix-fill/Pencil"
import { DragMove2 } from "@styled-icons/remix-fill/DragMove2"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { useState, useEffect } from "react"
import { CONST_CHANGED, CONST_DELETE } from "utilize/constant/constants"
import { showSuccess, showError } from "utilize/toast";

const ChannelTiming = (props) => {
    const [editedPrograms, setEditedPrograms] = useState([])
    const [channelPrograms, setChannelPrograms] = useState(props.channelPrograms)
    const [editingProgram, setEditingProgram] = useState()

    const {eventsDeleteitems,setEventsDeleteItem} = props


    useEffect(() => {
        setChannelPrograms(props.channelPrograms)
    }, [props.channelPrograms])


    const submitHandler = () => {
        if(props.channelPrograms.length === 0 ){
            showError("لطفا برنامه شبکه را ایجاد کنید");
        }else {
            const _edited = [...editedPrograms]
            _edited.forEach((program, index) => {
                if (program.programStatus !== CONST_DELETE) {
                    program.programStatus = CONST_CHANGED
                }
                program.order = index + 1
            })
            props.setEditedTiming(_edited)
            setEditedPrograms([])
            setEventsDeleteItem([])
            props.channelPrograms.length !==0 && props.activeHandler(false)
        }
    }
    const editHandler = (index) => {
        if (!editingProgram) {
            const _program = [...channelPrograms]
            _program[index].editing = true;
            setChannelPrograms(_program)
            setEditingProgram(_program[index])
        }
    }

    const dragEndHandler = (result) => {
        const { destination, source } = result;
        if (!destination) {
            return;
        }
        if (source.index === destination.index) {
            return;
        }
        let _programs = [...channelPrograms];
        const _draggedProduct = _programs[source.index];
        _programs.splice(source.index, 1)
        _programs.splice(destination.index, 0, _draggedProduct)
        setChannelPrograms(_programs)
        setEditedPrograms(e => [...e, ..._programs])
    }

    const deleteHandler = (index) => {
        let _programs = [...channelPrograms];
        let _edited = [...editedPrograms];
        _programs[index].ProgramStatus = CONST_DELETE
        _edited.push(_programs[index])
        setEditedPrograms(_edited)
        _programs.splice(index, 1)
        setChannelPrograms(_programs)

    }

    const [eventClickDel , setEventClickDel] = useState([])

    const deleteItemHandler = (programs,index) =>{

        let _programs = [...channelPrograms];
        let _edited = [...editedPrograms];
        _programs[index].ProgramStatus = CONST_DELETE
        _edited.push(_programs[index])
        setEditedPrograms(_edited)
        _programs.splice(index, 1)
        setChannelPrograms(_programs)

        setEventClickDel([...eventClickDel , programs])
    }

    useEffect(() =>{
        let uniqueChars = [...new Set(eventClickDel.map(item => item))];
        setEventsDeleteItem(uniqueChars)
    },[eventClickDel])

    // useEffect(() =>{
    //     console.log('eventsDeleteitems' ,eventsDeleteitems)
    // },[eventsDeleteitems])



    const editInputChangeHandler = (type, e) => {
        setEditingProgram(program => {
            program[type] = e.target.value
            return { ...program }
        })
    }

    const cancelEditingHandler = () => {
        setEditingProgram(null)
    }
    const submitEditingHandler = () => {
        if (editingProgram.title.length > 1) {
            const _programs = [...channelPrograms]
            const programIndex = _programs.findIndex(item => item.id === editingProgram.id)
            _programs[programIndex] = editingProgram
            setChannelPrograms(_programs)
            setEditedPrograms(_programs)
            setEditingProgram(null)
        }
    }
    return (
        <ChannelTimingStyle>
            <div className="confirmHeader">
                <span>
                    جدول زمانبندی برنامه ها
                </span>
                <div className="info">

                    {/* {props.channelStatus ? (
                        <>
                            برنامه های شبکه <span className='activeText'> فعال </span> میباشد. جهت اعمال شدن آخرین تغییرات یک بار زمانبندی را غیرفعال کرده سپس دوباره فعال نمایید
                        </>
                    ) : (
                        <>
                            برنامه های شبکه <span className='disableText'>  غیر فعال</span> میباشد.
                        </>
                    )} */}
                </div>
                <button
                // ${editedPrograms.length < 1 && "disabledBtn"}
                    onClick={submitHandler}
                    className={`submitBtn `}>
                    ذخیره تغییرات
                </button>
            </div>

            <DragDropContext onDragEnd={dragEndHandler}>
                <Droppable droppableId="1">
                    {provided => (
                        <ContentContainer
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="contentContainer">

                            {channelPrograms.map((program, index) => (
                                <Draggable style={{ order: program?.order }} key={program?.id} draggableId={program?.id?.toString()} index={index}>
                                    {(provided, snapshot) => (
                                        <PreviewChannelContent
                                            {...provided.draggableProps}
                                            ref={provided.innerRef}
                                            order={program?.order}
                                            isDragging={snapshot.isDragging}
                                        >
                                            {editingProgram && program.editing ? (
                                                <>
                                                    <div className='editModeInputs'>
                                                        <div className='d-flex align-items-center'>
                                                            <span className={`ms-2`}>
                                                                نام:
                                                            </span>
                                                            <input type="text" onChange={editInputChangeHandler.bind(this, "title")} className={`form-control ${editingProgram.title.length < 1 && "is-invalid"}`} value={editingProgram.title} />
                                                        </div>
                                                        <div className='d-flex align-items-center'>
                                                            <span className='ms-2'>
                                                                توضیحات:
                                                            </span>
                                                            <textarea rows="3" columns="5" onChange={editInputChangeHandler.bind(this, "description")} className="form-control" value={editingProgram.description} />
                                                        </div>
                                                    </div>
                                                    <div className='d-flex'>
                                                        <button onClick={submitEditingHandler.bind(this, index)} className=" ms-3 submitBtn">
                                                            ذخیره
                                                        </button>
                                                        <button onClick={cancelEditingHandler} className=" saveBtn">
                                                            لغو
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className='col-3'>
                                                        <span className="title">
                                                            {program.title}
                                                        </span>
                                                    </div>
                                                    <div className='col-3'>

                                                        <span>
                                                            {program.description.substr(0, 30)}...
                                                        </span>
                                                    </div>
                                                    <div className='col-3'>

                                                        <span>
                                                            مدت برنامه:
                                                            <Duration seconds={program.duration} />
                                                        </span>
                                                    </div>
                                                    <div className="iconHolder">
                                                        <button onClick={() => {deleteHandler.bind(this, index); deleteItemHandler(program,index)}}>
                                                            <DeleteBin6 />
                                                        </button>
                                                        <button onClick={editHandler.bind(this, index)}>
                                                            <Pencil />
                                                        </button>
                                                        <button {...provided.dragHandleProps}>
                                                            <DragMove2 />
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </PreviewChannelContent>
                                    )}
                                </Draggable>
                            ))}
                        </ContentContainer>
                    )}

                </Droppable>
            </DragDropContext>

        </ChannelTimingStyle>
    )
}

export default ChannelTiming