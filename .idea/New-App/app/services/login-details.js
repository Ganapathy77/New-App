import Service from '@ember/service';

export default Service.extend({
    loginDetails : {
        isLoggedIN : false
    },
    init(){
        this._super(...arguments);
        this.set('loginDetails.isLoggedIN', false);
        this.set('loginDetails.username', "");
        this.set('loginDetails.email', "");
    },

    setTrue(username,email){
        this.set('loginDetails.isLoggedIN', true);
        this.set('loginDetails.username', username);
        this.set('loginDetails.email', email);
    },
    setFalse(){
        this.set('loginDetails.isLoggedIN', false);
        this.set('loginDetails.username', "");
        this.set('loginDetails.email', "");
    }
});
