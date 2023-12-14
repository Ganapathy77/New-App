import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { inject } from '@ember/service';
import AjaxUtil from '../../utils/ajax-util';
import AlertUtil from '../../utils/alert-util';
export default Component.extend({
    loggedINDetails: service('login-details'),
    router:inject(),
    init() {
        this._super(...arguments)
    },

    loginUsersFunc: function () {
        let self = this;
        let useremail = document.querySelector('#useremail').value;
        let password = document.querySelector('#password').value;

        if ((useremail == undefined || useremail == "" || useremail == null)) {
            const alertbox = document.querySelector('#alert-box');
            alertbox.classList.add('active');
            const alertTextbox = document.querySelector('#alert-in');
            AlertUtil.alertbox(alertTextbox, 'info', 'Please enter the username');
            return
        }
        else if ((password == undefined || password == "" || password == null)) {
            const alertbox = document.querySelector('#alert-box');
            alertbox.classList.add('active');
            const alertTextbox = document.querySelector('#alert-in');
            AlertUtil.alertbox(alertTextbox, 'info', 'Please enter the password');
            return
        }
        let url = "http://localhost:8082/App/Login";
        let data = { "username": useremail, "password": password };
        let type = 'POST';

        AjaxUtil.ajax(url, data, type).then(function (data) {
            console.log(data)
            if (data.isLoginSuccess == true) {
                self.get('loggedINDetails').setTrue(data.username, data.email);
                console.log(self.get('loggedINDetails').loginDetails);
                const wrapper = document.querySelector('.wrapper');
                const loginForm = document.querySelector('#loginForm');
                loginForm.reset();
                self.set('wrapper', wrapper);
                self.get('wrapper').classList.remove('active-popup');
                const alertbox = document.querySelector('#alert-box');
                alertbox.classList.add('active');
                const alertTextbox = document.querySelector('#alert-in');
                AlertUtil.alertbox(alertTextbox, 'success', 'Successfully logged in...');
                self.get('router').transitionTo('home');
            }
            else {
                const alertbox = document.querySelector('#alert-box');
                alertbox.classList.add('active');
                const alertTextbox = document.querySelector('#alert-in');
                AlertUtil.alertbox(alertTextbox, 'danger', "Uername/Password doesn't match...")
            }
        })
        // $.ajax({
        //     url: "http://localhost:8082/App/Login",
        //     data: { "username": useremail, "password": password },
        //     type: 'POST',
        //     success: (data) => {
        //         this.set('data', data);
        //         console.log(this.get('data'))
        //         console.log(data.isLoginSuccess)
        //         if (data.isLoginSuccess == true) {
        //             this.get('loggedINDetails').setTrue(data.username, data.email);
        //             console.log(this.get('loggedINDetails').loginDetails);
        //             const wrapper = document.querySelector('.wrapper');
        //             const loginForm = document.querySelector('#loginForm');
        //             loginForm.reset();
        //             this.set('wrapper', wrapper);
        //             this.get('wrapper').classList.remove('active-popup');
        //             alert("Successfully logged in...")
        //         }
        //         else {
        //             alert("Uername/Password doesn't match...")
        //         }
        //     }
        // })
    },

    alertUtil: function (alertTextbox, classAdded, textContent) {
        if (alertTextbox.classList.contains('success')) {
            alertTextbox.classList.remove('success')
        }
        if (alertTextbox.classList.contains('info')) {
            alertTextbox.classList.remove('info')
        }
        if (alertTextbox.classList.contains('danger')) {
            alertTextbox.classList.remove('danger')
        }
        alertTextbox.classList.add(classAdded)
        alertTextbox.textContent = textContent;
        const login_register_body = document.querySelector('.login-register-body');
        login_register_body.classList.add('blur');
    },

    actions: {
        registerLinkAction() {
            const wrapper = document.querySelector('.wrapper');
            this.set('wrapper', wrapper);
            this.wrapper.classList.add('active');
            const loginForm = document.querySelector('#loginForm');
            loginForm.reset();
        },
        loginUsers() {
            this.loginUsersFunc();
        }
    }
});
