import React, { useContext, useEffect } from 'react';
import M from 'materialize-css'
import { UserContext } from './Navbar';

function SignIn(props) {

    const context = useContext(UserContext);

    useEffect(() => {
      M.updateTextFields();
      }, []);

    async function login(data){
        console.log(data);
        const response = await fetch("http://localhost:8000/auth", {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json"
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify(data)
        });
        console.log(response.status);
        if(response.status===200){
            let jwt = await response.json();
            context.setCookieJWT('jwt', jwt);
            console.log(jwt);
            //alert(messData.jwtToken);
           // localStorage.setItem('jwtToken', messData.jwtToken);
           
           profile(jwt);


        }else{
            console.log("404 ITEM NOT FOUND");
            M.toast({html: "<i class='small material-icons left'>error</i><strong>Wrong Email or Password!</strong>",classes: 'red red-1 rounded',marginRight:"150px"});
        }
        
      }


      async function profile(jwt){
        const bearer = "Bearer "+jwt.jwtToken;
        const response = await fetch("http://localhost:8000/api/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization":bearer,
          },
        });
        if(response.status===200){
            let userData = await response.json();
            console.log(userData);
            context.setEmail(userData.email);
            context.setFullName(userData.fullName);
            // context.setRoles(userData.roles);
            context.setIsOnline(true);
           
      
      
        }else{
            console.log("404 ITEM NOT FOUND");
        }
        
      }



       const toLogin = event =>{
         var data = {email:context.email,password:context.password}
         console.log(data);
        login(data);
        event.preventDefault();
      }

      async function test(){
       //let jwt = localStorage.getItem('jwtToken');
        localStorage.removeItem("jwtToken");
       // console.log(jwt);
        //alert(jwt);
    }
    M.updateTextFields();

    return (
        <div className="container" style={{height:"408px"}}>
            <div className="row">

                
                <div className="col s6 ">
                    <blockquote style={{marginLeft: "250px", marginTop:"150px"}}>
                        <h5>Sign In</h5>
                    </blockquote>
                
                    <form className="col s6 offset-s3" onSubmit={toLogin}>
                        <div className="input-field row">
                            <i className="large material-icons prefix" style={{color:"#01579b"}}>email</i>
                            <input id="email" type="email" value={context.email} onChange={context.handleEmailChange} className="validate"/>
                            <label className="active" for="email">Email</label>
                        </div>
                        <div className="input-field row">
                            <i className="material-icons prefix" style={{color:"#01579b  "}}>https</i>
                            <input id="password" value={context.password} onChange={context.handlePasswordChange} type="password" className="validate"/>
                            <label className="active" for="password">Password</label>
                        </div>
                        <div   div className="row" >
                            <label style={{marginLeft:"5px"}}>
                                <input type="checkbox" checked={context.remember} onChange={context.handleRememberChange}/>
                                <span>Remember me</span>
                            </label>
                        </div>
                    <div className="input-field row">
                        <button className="btn waves-effect waves-light indigo darken-3 right"><i className="material-icons right">send</i>Login</button>
                        </div>
                    </form>
                </div>
            </div>

   
        </div>

        // <div className="container">
        //     <div className="row mt-5" >
        //         <div className="col-6 offset-3 mt-5">
        //             <div className="card ">
        //                 <div className="card-header">
        //                     <center><h2>Mini-DL.iitu.kz</h2></center>
        //                 </div>
        //                 <div className="card-body">
        //                     <div className="col-8 offset-2">
        //                         <form onSubmit={toLogin}>
        //                             <div className="form-group">
        //                                 <input  type="text" className="form-control" value={context.email} onChange={context.handleEmailChange} placeholder="Enter login"/>
        //                             </div>
        //                             <div className="form-group">
        //                                 <input type="password" className="form-control" value={context.password} onChange={context.handlePasswordChange} placeholder="Enter password"/>
        //                             </div>
        //                             <div class="form-group">
        //                                 <label style={{marginLeft:"5px"}}>
        //                                     <input type="checkbox" checked={context.remember} onChange={context.handleRememberChange}/>
        //                                     <span>Remember me</span>
        //                                 </label>
        //                             </div>
        //                             <div class="form-group">
        //                                 <button  className="btn btn-primary">Login</button>
        //                             </div>
        //                         </form>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>



    );
}

export default SignIn;