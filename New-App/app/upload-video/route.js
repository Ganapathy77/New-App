import Route from '@ember/routing/route';
import AjaxUtil from '../utils/ajax-util';
import AlertUtil from '../utils/alert-util';
import { inject as service } from '@ember/service';
export default Route.extend({
    loggedINDetails: service('login-details'),
    beforeModel(){
        if(!this.get('loggedINDetails').loginDetails.isLoggedIN){
            this.transitionTo('');
        }
    },
    uploadBtnAction: function () {
        let self = this;
        let video_title = document.querySelector('#video-title').value;
        let video_thumbnail = document.querySelector('#video-thumbnail').value;
        let video_summary = document.querySelector('#video-summary').value;
        let video_url = document.querySelector('#video-url').value;
        let private_public = document.querySelector('#private-public').value;


        if ((video_title == undefined || video_title == "" || video_title == null)) {
            const alertbox = document.querySelector('#alert-box');
            alertbox.classList.add('active');
            const alertTextbox = document.querySelector('#alert-in');
            AlertUtil.alertbox(alertTextbox, 'info', 'Please enter the video title');
            return
        }
        else if ((video_thumbnail == undefined || video_thumbnail == "" || video_thumbnail == null)) {
            const alertbox = document.querySelector('#alert-box');
            alertbox.classList.add('active');
            const alertTextbox = document.querySelector('#alert-in');
            AlertUtil.alertbox(alertTextbox, 'info', 'Please enter the video thumbnail url');
            return
        }
        else if ((video_summary == undefined || video_summary == "" || video_summary == null)) {
            const alertbox = document.querySelector('#alert-box');
            alertbox.classList.add('active');
            const alertTextbox = document.querySelector('#alert-in');
            AlertUtil.alertbox(alertTextbox, 'info', 'Please enter the video summary');
            return
        }
        else if ((video_url == undefined || video_url == "" || video_url == null)) {
            const alertbox = document.querySelector('#alert-box');
            alertbox.classList.add('active');
            const alertTextbox = document.querySelector('#alert-in');
            AlertUtil.alertbox(alertTextbox, 'info', 'Please enter the video url');
            return
        }
        else if ((private_public == undefined || private_public == "" || private_public == null)) {
            const alertbox = document.querySelector('#alert-box');
            alertbox.classList.add('active');
            const alertTextbox = document.querySelector('#alert-in');
            AlertUtil.alertbox(alertTextbox, 'info', 'Please select private/public');
            return
        }
        console.log(this.get("loggedINDetails").loginDetails.username)
        let url = "http://localhost:8082/App/Upload";
        let data = { "video-title": video_title, "video-url": video_url, "video-summary":video_summary, "video-thumbnail":video_thumbnail, "private-public":private_public, "username": this.get("loggedINDetails").loginDetails.username };
        let type = 'POST';

        AjaxUtil.ajax(url, data, type).then(function (data) {
            console.log(data)
            if (data.isSuccess == true) {
                const uploadForm = document.querySelector('#upload-form');
                uploadForm.reset();
                const alertbox = document.querySelector('#alert-box');
                alertbox.classList.add('active');
                const alertTextbox = document.querySelector('#alert-in');
                AlertUtil.alertbox(alertTextbox, 'success', 'Uploaded successfully ...');
            }
            else {
                const alertbox = document.querySelector('#alert-box');
                alertbox.classList.add('active');
                const alertTextbox = document.querySelector('#alert-in');
                AlertUtil.alertbox(alertTextbox, 'danger', "Video Title not available...")
            }
        })
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
        uploadBtnAction() {
            this.uploadBtnAction();
        }
    }
});
