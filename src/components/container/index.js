import './style.css';

function Container({children}) {
  return(
    <div className='Container'>
      {children}
    </div>
  );
}

export default Container;