(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", loginController);
    
    function loginController(UserService, $location) {
        var vm = this;
        vm.login = login;
    }
})();