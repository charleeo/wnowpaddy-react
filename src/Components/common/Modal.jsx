import React,{useState} from "react"
const MyModal = ({heading,children,status=false})=>{
  const [modalStyle,setModalStyle] = useState('hide-modal')
  // const hide=()=>{
  //   setHideModal(true)
  // }
  // // const modalRef = useRef(null)
  // if(status){
  //   setModalStyle('show')
  // }

  return (
    <>
      <div className={`my-modal-wrapper ${modalStyle}`}>
        <div className="modal-inner midium-layout">
            <div className="modal-heading ">
              {heading}
            </div>
            <div className="modal-contents">
              {children}
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit mollitia quidem, saepe cupiditate eos explicabo a dicta ea ratione, porro quasi nam consequuntur amet! Sit error quam iusto vero autem!
            </div>
            <div className="modal-footer">
              {/* <footer onClick={hide}>Ok</footer> */}
            </div>
        </div>
      </div>
    </>
  )
}

export default MyModal
