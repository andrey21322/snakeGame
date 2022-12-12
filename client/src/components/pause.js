function Pause({pause}) {
    return (
      <>
        <div className={`bg ${pause === true ? 'active' : ''}`}><div className='pause'>Pause <br/> press esc</div></div>
      </>
    )
  }
  
  export default Pause;