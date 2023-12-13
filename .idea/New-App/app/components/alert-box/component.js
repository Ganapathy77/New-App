import Component from '@ember/component';

export default Component.extend({
    actions: {
        closeBtnAction() {
            const alertbox = document.querySelector('#alert-box');
            alertbox.classList.remove('active');
            const alertTextbox = document.querySelector('#alert-in');
            alertTextbox.textContent = "";
            const login_register_body = document.querySelector('.login-register-body');
            login_register_body.classList.remove('blur');
        }
    }
});
