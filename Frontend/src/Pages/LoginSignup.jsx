import React,{useState} from 'react'
import './CSS/LoginSignup.css'

const loginSignup = () => {
  const [state, setState] = useState("Sign Up")
  const [formData,setFormData] = useState({
    username : "",
    password : "",
    email : ""
  })
  const loginHandler = ()=>{
    setState("Login")
  }
  const signUpHandler = ()=>{
    setState("Sign Up")
  }
  const changehandler = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  }
  const login = async ()=>{
    console.log("Login Function Executed",formData);
    let responseData;
    await fetch('http://localhost:4000/login',{
      method : 'POST',
      headers : {
        Accept : 'application/form-data',
        'Content-type' : 'application/json'
      },
      body : JSON.stringify(formData)
    }).then((response)=>response.json()).then((data)=>responseData=data);
    
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace('/');
    }else{
      alert(responseData.errors);
    }
  }
  const signUp = async ()=>{
    console.log("SignUp Function Executed",formData);
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method : 'POST',
      headers : {
        Accept : 'application/form-data',
        'Content-type' : 'application/json'
      },
      body : JSON.stringify(formData)
    }).then((response)=>response.json()).then((data)=>responseData=data);

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace('/');
    }else{
      alert(responseData.errors);
    }
  }
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h2>{state}</h2>
        <div className="loginsignup-fields">
          {state=="Sign Up"&&<input name='username' value={formData.username} onChange={changehandler} type="text" placeholder='Your Name' />}
          <input  type="email" name='email' value={formData.email} onChange={changehandler} placeholder='Email address' />
          <input type="password" name='password' value={formData.password} onChange={changehandler} placeholder='Password' />
        </div>
        <button onClick={()=>{state==='Login'?login():signUp()}}>Continue</button>
       {state=="Login" && <p className='loginsignup-login'>Don't have an account? <span onClick={()=>{signUpHandler()}}>Create One</span></p>} 
        {state=="Sign Up" && <p className='loginsignup-login'>Already have an account? <span onClick={()=>{loginHandler()}}>Login here</span></p>}
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing , I agree to all the terms and conditions.</p>
        </div>
      </div>
      
    </div>
  )
}

export default loginSignup
