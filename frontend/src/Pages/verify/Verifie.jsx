import React, { useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './verify.css';

const Verifie = () => {
    const [searchparams,setSearchParams]=useSearchParams();
    const success=searchparams.get('success');
    const orderId=searchparams.get('orderId');
    const {url}=useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async() => {  
        const response = await axios.post(url+'/api/order/verifie',{orderId,success});
        if(response.data.success){
            navigate('/myorders');
        }else{ 
            navigate('/');
        }
    }
    useEffect(() => {       
        verifyPayment();
    },[])

  return (
    <div className='verify'>
        <div className="spinner">

        </div>
      
    </div>
  )
}

export default Verifie
