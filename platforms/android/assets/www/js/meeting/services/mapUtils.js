'use strict';

angular.module('addicaid').factory('mapUtils', ['filterUtils',
function(filterUtils) {
    var serviceAPI = {
        mapId: null,
        createClusterMarker: function(cluster){
            var c = ' marker-cluster-';
            if (cluster.count < 10) {
                c += 'small';
            } else if (cluster.count < 100) {
                c += 'medium';
            } else {
                c += 'large';
            }
            var marker = {
                isCluster: true,
                isOneLocation: cluster.isOneLocation,
                cluster: cluster,
                maxBounds: cluster.maxBounds,
                lat   : cluster.center.latitude,
                lng   : cluster.center.longitude,
                icon  : {
                    type: 'div',
                    iconSize: [40, 40],
                    html: '<div><span>' + cluster.count + '</span></div>',
                    className: 'marker-cluster' + c,
                    popupAnchor:  [0, 0]
                }
            };
            return marker;
        },
        createMeetingMarker: function(meeting) {
            meeting.isSoon = this.isSoon(meeting);
            var marker = {
                isCluster: false,
                isClicked: false,
                meeting: meeting,
                lat: meeting.latitude,
                lng: meeting.longitude
            };
            marker.icon = this.getMarkerIcon(meeting);
            return marker;
        },
        getMarkerIcon: function(meeting){
            var iconName = this.getIconName(meeting.fellowship.abbrevName);
            console.log(iconName);
            var icon = {
                type: 'div',
                iconSize: [40, 40],
                html: '<p>'+ iconName +'</p>',
                className: 'triangle-border',
                popupAnchor:  [0, 0]
            };
            if(meeting.isSoon){
                icon.className = 'triangle-border';
            }else if(meeting.isClicked){
                //icon.className += ' active';
                icon.className = 'triangle-border';
            }
            return icon;
        },
        getIconName: function(selectedFilter){
            var toReturn = '';
            angular.forEach(filterUtils.fellowshipFilterItems, function(filter){
                var currentFilter = filter.filter.toString();
                if(currentFilter == selectedFilter){
                    toReturn = filter.icon;
                    return;
                }
            });
            return toReturn;
        },
        generatePointsCircle: function(count, center){
            var res = [];
            var circumference = 50 * (2 + count);
            var legLength = circumference / (Math.PI * 2);
            var angleStep = (Math.PI * 2) / count;
            var startAngle = Math.PI / 6;
            var angle;

            for (var i = 0; i < count; i++) {
                angle = startAngle + i * angleStep;
                res.push(new L.Point(center.x + legLength * Math.cos(angle),center.y + legLength * Math.sin(angle)));
            }
            return res;
        },
        isSoon: function(meeting){
            var today = new Date();
            if(today.getDay() !== meeting.dayNumber){
                return false;
            }
            var timeParts = meeting.time.split(':');
            var hours = parseInt(timeParts[0],10);
            var minutes = parseInt(timeParts[1],10);
            if(hours - today.getHours() > 4 || hours - today.getHours() < 1){
                return false;
            }
            if(hours - today.getHours() === 0 && minutes > today.getMinutes()){
                return false;
            }
            return true;
        }
    };
    return serviceAPI;
}]);