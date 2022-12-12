function ArrowBtns({direction}) {
    return (
      <>
        <div className={`arrow down ${direction === 'ArrowDown' ? 'active' : ''}`}></div>  
        <div className={`arrow right ${direction === 'ArrowRight' ? 'active' : ''}`}></div>  
        <div className={`arrow up ${direction === 'ArrowUp' ? 'active' : ''}`}></div>  
        <div className={`arrow left ${direction === 'ArrowLeft' ? 'active' : ''}`}></div> 
      </>
    )
  }
  
  export default ArrowBtns;
  