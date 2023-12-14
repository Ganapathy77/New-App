import Component from '@ember/component';

export default Component.extend({

    actions: {
        closeBtnAction() {
            const wrapper = document.querySelector('.wrapper');
            this.set('wrapper', wrapper);
            // console.log(this.get('wrapper'));
            this.get('wrapper').classList.remove('active-popup');
            const loginForm = document.querySelector('#loginForm');
            const registerForm = document.querySelector('#registerForm');
            loginForm.reset();
            registerForm.reset();
            const main_content_wrapper = document.querySelector('.main_content_wrapper');
            main_content_wrapper.classList.remove('blur');
        }
    }
});
