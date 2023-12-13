import Component from '@ember/component';
import AjaxUtil from '../../utils/ajax-util';
import AlertUtil from '../../utils/alert-util';

export default Component.extend({
    signupUserFunc: function () {
        let username = document.querySelector('#register_username').value;
        let user_email = document.querySelector('#register_user_email').value;
        let password = document.querySelector('#register_password').value;
        let agree = document.querySelector('#reg-checkbox').checked;
        // let confirmPassword = document.querySelector('#confrimPwd').value;

        if (username == "") {
            const alertbox = document.querySelector('#alert-box');
            alertbox.classList.add('active');
            const alertTextbox = document.querySelector('#alert-in');
            AlertUtil.alertbox(alertTextbox, 'info', 'Pls enter the username');
            return
        }
        else if (username == "Admin" || username == "admin") {
            const alertbox = document.querySelector('#alert-box');
            alertbox.classList.add('active');
            const alertTextbox = document.querySelector('#alert-in');
            AlertUtil.alertbox(alertTextbox, 'danger', "Username can't be Admin ...");
            return
        }
        else if (user_email == "") {
            const alertbox = document.querySelector('#alert-box');
            alertbox.classList.add('active');
            const alertTextbox = document.querySelector('#alert-in');
            AlertUtil.alertbox(alertTextbox, 'info', 'Pls enter the email address');
            return
        }
        else if (password == "") {
            const alertbox = document.querySelector('#alert-box');
            alertbox.classList.add('active');
            const alertTextbox = document.querySelector('#alert-in');
            AlertUtil.alertbox(alertTextbox, 'info', 'Pls enter the Password');
            return
        }
        else if (!agree) {
            const alertbox = document.querySelector('#alert-box');
            alertbox.classList.add('active');
            const alertTextbox = document.querySelector('#alert-in');
            AlertUtil.alertbox(alertTextbox, 'info', 'Pls agree the terms and conditions');
            return
        }
        // else if(confirmPassword == ""){
        //     alert("Pls enter the Confirm Pwd")
        //     return
        // }
        // else if(!(password === confirmPassword)){
        //     alert("password mismatch")
        //     return
        // }
        let url = "http://localhost:8082/App/Signup";
        let data = { "username": username, "useremail": user_email, "password": password };
        let type = "POST";

        AjaxUtil.ajax(url, data, type).then((data) => {
            console.log(data, data.isSuccess, data.isUniqueEmail, data.isUniqueUser);
            if (data.isSuccess == true) {
                const alertbox = document.querySelector('#alert-box');
                alertbox.classList.add('active');
                const alertTextbox = document.querySelector('#alert-in');
                AlertUtil.alertbox(alertTextbox, 'success', 'Successfully Signed in ...');
                return
            }
            else if (data.isUniqueUser == false) {
                const alertbox = document.querySelector('#alert-box');
                alertbox.classList.add('active');
                const alertTextbox = document.querySelector('#alert-in');
                AlertUtil.alertbox(alertTextbox, 'danger', 'Username already exist try a different username to Signup or try to Login ...');
                return
            }
            else if (data.isUniqueEmail == false) {
                const alertbox = document.querySelector('#alert-box');
                alertbox.classList.add('active');
                const alertTextbox = document.querySelector('#alert-in');
                AlertUtil.alertbox(alertTextbox, 'danger', 'Email address already exist try a different Email to Signup or try to Login ...');
                return
            }
            else {
                const alertbox = document.querySelector('#alert-box');
                alertbox.classList.add('active');
                const alertTextbox = document.querySelector('#alert-in');
                AlertUtil.alertbox(alertTextbox, 'danger', 'Error while registering your account, try again...');
                return
            }
        })


        // $.ajax({

        //     success: (data) => {
        //         alert(data)
        //         console.log(data)
        //         // if(data){
        //         //     alert("Signed up")
        //         // }else{
        //         //     alert("failed to signup")
        //         // }
        //     }
        // })
    },
    actions: {
        loginLinkAction() {
            const wrapper = document.querySelector('.wrapper');
            this.set('wrapper', wrapper);
            this.wrapper.classList.remove('active');
            const registerForm = document.querySelector('#registerForm');
            registerForm.reset();
        },
        signupuser() {
            this.signupUserFunc();
        }
    }
});
