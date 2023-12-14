import Component from '@ember/component';
import { inject as service } from '@ember/service';
export default Component.extend({
    loggedINDetails: service('login-details'),
    router: service(),
    init() {
        this._super(...arguments)
        this.set("isLoggedIN", false);
    },
    actions: {
        loginBtnAction() {
            const main_content_wrapper = document.querySelector('.main_content_wrapper');
            main_content_wrapper.classList.add('blur');
            const wrapper = document.querySelector('.wrapper');
            this.set('wrapper', wrapper);
            console.log(wrapper)
            this.wrapper.classList.add('active-popup');
            if (this.wrapper.classList.contains('active')) {
                this.wrapper.classList.remove('active');
            }
            console.log(this.get('loggedINDetails').loginDetails.isLoggedIN)
            this.get('loggedINDetails').setFalse();
        },
        logout() {
            const login_register_body = document.querySelector('.login-register-body');
            login_register_body.classList.remove('blur');
            this.get('loggedINDetails').setFalse();
            this.get('router').transitionTo('index')
        }
    }
});
