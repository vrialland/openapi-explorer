import Ember from 'ember';

export default Ember.Component.extend({
    requestService: Ember.inject.service(),
    requests:[],
    init(){
        let that = this;

        let savedRequests = localStorage['apiexplorer.requests'];
        try{
            if(savedRequests){
                this.set('requests', JSON.parse(savedRequests));
            }

        }catch(err){}

        this._super(...arguments);
        this.get("requestService").on('newRequest', function(){
            let request = that.get("requestService").get("lastNewRequest");

            let requestParams = {
                operation : request,
                tabClass: " "
            };

            that.requests.pushObject(requestParams);
            localStorage['apiexplorer.requests'] = JSON.stringify(that.get('requests'));
        });
    },
    actions:{
        closeTab(index){
            this.requests.removeAt(index);

            localStorage['apiexplorer.requests'] = JSON.stringify(this.get('requests'));
        }
    }
});