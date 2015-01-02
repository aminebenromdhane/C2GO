'use strict';

angular.module('addicaid').controller('SignupController', ['userService', '$cordovaCamera', '$mdDialog',
function (userService, $cordovaCamera, $mdDialog) {
    var _this = this;
    this.user = {};
    this.loading = false;
    this.error = null;
    this.defaultPicture = 'img/upload.svg';
    this.customPicture = null;

    this.signup = function(){
        this.loading = true;
        /*userService.signup(this.user).then(
            function(){
                _this.loading = false;
                _this.error = null;
            },
            function(err){
                _this.error = err;
                _this.loading = false;
            }
        );*/
    };

    this.takePicture = function(){
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.FILE_URI,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
        this.callCamera(options);
    };

    this.uploadPicture = function(){
        var options = {
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            popoverOptions: CameraPopoverOptions
        };
        this.callCamera(options);
    };

    this.callCamera = function(options){
        $cordovaCamera.getPicture(options).then(function(imagePath) {
            _this.customPicture = imagePath;
        }, function(err) {
            console.log(err);
        });
    };

    this.uploadChoice = function(ev){
        $mdDialog.show({
            controller: 'UploadChoiceController',
            templateUrl: 'template/user/directives/choice.html',
            targetEvent: ev
        })
        .then(function(choice) {
            if(choice === 'upload'){
                _this.uploadPicture();
            }else if(choice === 'camera'){
                _this.takePicture();
            }
        });
    };

    this.getPicture = function(){
        if(this.customPicture === null){
            return this.defaultPicture;
        }
        return this.customPicture;
    };
}]);