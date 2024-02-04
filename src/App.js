import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import './App.css';
import pik from './Assets/bmi photo.svg'

const App =()=> {
  
  const [hight, setHight] = useState('');
  const [wight, setWight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [bmiStatus, setBmiStatus] = useState('');
  const [error , setError] = useState('')


   const calculateBmi = () => {

    const isvalidHeight = /^\d+$/.test(hight);
    const isvalidWight = /^\d+$/.test(wight);

    if (isvalidHeight && isvalidWight) {
      //cm to meter conversation
      const hightInMeters = hight / 100;
      //find the bmi value
      const bmiValue = wight / (hightInMeters * hightInMeters)
      setBmi(bmiValue.toFixed(2))
      //find the bmi status
      if (bmiValue < 18.5) {
        setBmiStatus('UnderWeight')
      }
      else if (bmiValue >= 18.5 && bmiValue < 24.9) {
        setBmiStatus('Normal Weight')
      }
      else if (bmiValue >= 24.9 && bmiValue < 29.9) {
        setBmiStatus('OverWeight')
      }
      setError('')
    }
    else {
      setBmi(null)
      setBmiStatus('')
      setError('Please enter vaild numeric values ')
    }
  }
  const clearData =()=>{
    setBmi(null)
    setHight('')
    setWight('')
    setBmiStatus('')
    setError('')
  }

  return (
    <Container fluid>
      <div className=" main-container shadow-lg p-3 mb-5 bg-white rounded">
        <div className="img-container">
          <img src={pik}/>
        </div>
        <div className="header-and-from-container flex-grow-1">
          <h3 className='text-primary pt-2'>BMI CALCULATOR</h3>
         {error&& <p className='text-danger'>{error}</p>}
          <div className="input-container d-flex flex-column gap-1 mb-3">
            <label>Hieght(cm)</label>
            <input type="text" value={hight} onChange={(e) => setHight(e.target.value)} className='p-1' />
          </div>
          <div className="input-container d-flex flex-column gap-1 mb-3">
            <label>Wight(Kg)</label>
            <input type="text"  value={wight} onChange={(e) => setWight(e.target.value)} className='p-1' />
          </div>
          <div className="button-container">
            <button className='bg-primary border none px-2 py-1 text-light' onClick={calculateBmi}>Calculate BMI</button>
            <button className='bg-danger border none px-2 py-1 text-light' onClick={clearData}>Reset</button>
          </div>
         {bmi !==null && ( <div className="result-container">
            <h6 className='text-primary'>Your BMI is:{bmi}</h6>
            <p >Status: {bmiStatus}</p>
          </div>)}
        </div>
      </div>
    </Container> 
  );
}

export default App;
