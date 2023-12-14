import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AjaxUtil from '../utils/ajax-util';
export default Route.extend({
    loggedINDetails: service('login-details'),
    isPopupClosed: service('index-popup'),
    
    setupController(controller, model){
        this._super(controller,model);
        this.getIndexPageData(controller);
    },
    getIndexPageData: function(controller){
        let self = this;
        let url = "http://localhost:8082/App/IndexVideoDetails";
        let data = {};
        let type = 'POST'

        AjaxUtil.ajax(url,data,type).then(function(data){
            if(data.isSuccess == true){
                controller.set('videoDetails', data.resultData);
                console.log(data.resultData)
                console.log(data)
                // return data.resultData;
            }
            else{
                console.log(data)
            }
        })
    },
    // model(){
    //     return [{
    //         id:1,
    //         thumbnail: 'https://www.pcclean.io/wp-content/uploads/2020/4/mYv2Ir.jpg',
    //         title: 'Nature never goes out of style',
    //         summary: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit ducimus optio accusamus ',
    //     },{
    //         id:2,
    //         thumbnail: 'https://wallpapercave.com/wp/wp4854984.jpg',
    //         title: 'Beauty Of The Nature',
    //         summary: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit ducimus optio accusamus libero ut tempore obcaecati nisi eum at pariatur.',
    //     },{
    //         id:3,
    //         thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFico9sefb0LCMJaMS8wNslHqcB7YopimcoAGwACIt&s',
    //         title: 'In my happy place',
    //         summary: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit ducimus optio accusamus libero ut tempore obcaecati nisi eum at pariatur.',
    //     },{
    //         id:4,
    //         thumbnail: 'https://wallpaperaccess.com/full/1143632.jpg',
    //         title: 'Let your canopy be the stars in the sky',
    //         summary: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit ducimus optio accusamus libero ut tempore obcaecati nisi eum at pariatur.',
    //     },{
    //         id:5,
    //         thumbnail: 'https://wallpaperaccess.com/full/1143629.jpg',
    //         title: 'Standing at the shore is where I must be',
    //         summary: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit ducimus optio accusamus libero ut tempore obcaecati nisi eum at pariatur.',
    //     },
    //     {
    //         id:6,
    //         thumbnail: 'https://4kwallpapers.com/images/wallpapers/windows-11-landscape-scenery-sunrise-stock-day-light-2560x1080-5661.jpg',
    //         title: 'Let your canopy be the stars in the sky',
    //         summary: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit ducimus optio accusamus libero ut tempore obcaecati nisi eum at pariatur.',
    //     },
    //     {
    //         id:7,
    //         thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQznFg7Opb6o6hsrGRafzyZYdIQf9ienrstgUlLlibGvCgfXn8Z6KwVi1WDYHNrIC3hNz0&usqp=CAU',
    //         title: 'Breathe deep',
    //         summary: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit ducimus optio accusamus libero ut tempore obcaecati nisi eum at pariatur.',
    //     },
    //     {
    //         id:8,
    //         thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiNR1bqS0C0ClhgTGkSeNVoACbXmeyN5ncXazQXdUI0fO5I30SZrBTJ-tTgWbIDmc6NtQ&usqp=CAU',
    //         title: 'This view never gets old',
    //         summary: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit ducimus optio accusamus libero ut tempore obcaecati nisi eum at pariatur.',
    //     },
    //     {
    //         id:9,
    //         thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiNR1bqS0C0ClhgTGkSeNVoACbXmeyN5ncXazQXdUI0fO5I30SZrBTJ-tTgWbIDmc6NtQ&usqp=CAU',
    //         title: 'This view never gets old',
    //         summary: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit ducimus optio accusamus libero ut tempore obcaecati nisi eum at pariatur.',
    //     }]
    //     // this.loadDaata();
    // },
    afterModel(){
        this.removeIndexAlertPopup();
        
    },
    // loadData: function(){
        
    // },

    removeIndexAlertPopup: function(){
        setTimeout(() => {
            const alertboxCont = document.querySelector('#index-alert');
            const alertbox = document.querySelector('#index-alert-box');
            alertboxCont.classList.remove('active');
            alertbox.classList.remove('active');
            alertbox.style.animation="none";
            const alertTextbox = document.querySelector('#index-alert-in');
            alertTextbox.textContent = "";
            // const login_register_body = document.querySelector('.login-register-body');
            // login_register_body.classList.remove('blur-1');
        }, 10000);
    },
    
    actions: {
        closeBtnAction() {
            const alertboxCont = document.querySelector('#index-alert');
            const alertbox = document.querySelector('#index-alert-box');
            alertboxCont.classList.remove('active');
            alertbox.classList.remove('active');
            alertbox.style.animation="none";
            // alertbox.style.transform = scale(0)
            const alertTextbox = document.querySelector('#index-alert-in');
            alertTextbox.textContent = "";
            // const login_register_body = document.querySelector('.login-register-body');
            // login_register_body.classList.remove('blur-1');
        }
    }
});
