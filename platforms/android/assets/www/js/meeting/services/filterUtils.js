'use strict';

angular.module('addicaid').factory('filterUtils', [
function() {
    var serviceAPI = {
        dayFilterItems: [{
            display: 'm',
            filter: 1
        }, {
            display: 't',
            filter: 2
        }, {
            display: 'w',
            filter: 3
        }, {
            display: 't',
            filter: 4
        }, {
            display: 'f',
            filter: 5
        }, {
            display: 's',
            ngClass: 'weekend',
            filter: 6
        }, {
            display: 's',
            ngClass: 'weekend',
            filter: 0
        }],

        fellowshipFilterItems: [{
            display: 'Narcotics',
            filter: 'NA',
            icon: 'NA',
            subCategory: 'substances'
        }, {
            display: 'Alcohol',
            filter: 'AA',
            icon: 'AA',
            subCategory: 'substances'
        }, {
            display: 'Meth',
            filter: 'CMA',
            icon: 'CMA',
            subCategory: 'substances'
        }, {
            display: 'Marijuana',
            filter: 'MA',
            icon: 'MA',
            subCategory: 'substances'
        }, {
            display: 'Nicotine',
            filter: 'NicA',
            icon: 'NicA',
            subCategory: 'substances'
        }, {
            display: 'Cocaine',
            filter: 'CA',
            icon: 'CA',
            subCategory: 'substances'
        }, {
            display: 'Overeaters',
            filter: 'OA',
            icon: 'OA',
            subCategory: 'processes'
        }, {
            display: 'Eating',
            filter: 'EDA',
            icon: 'EDA',
            subCategory: 'processes'
        }, {
            display: 'Codependents',
            filter: 'CODA',
            icon: 'CODA',
            subCategory: 'friends'
        }, {
            display: 'Al-Anon',
            filter: 'Al-Anon',
            icon: 'AlAnon',
            subCategory: 'friends'
        }, {
            display: 'Sex',
            filter: 'SAA',
            icon: 'SAA',
            subCategory: 'processes'
        }, {
            display: 'Gambling',
            filter: 'GA',
            icon: 'GA',
            subCategory: 'processes'
        }, {
            display: 'Sex and Love',
            filter: 'SLAA',
            icon: 'SLAA',
            subCategory: 'processes'
        }, {
            display: 'Debt',
            filter: 'DA',
            icon: 'DA',
            subCategory: 'processes'
        },  {
            display: 'Alateen',
            filter: 'Alateen',
            icon: 'Alateen',
            subCategory: 'friends'
        }, {
            display: 'Adult Children of Alcoholics',
            filter: 'ACA',
            icon: 'ACA',
            subCategory: 'friends'
        }, {
            display: 'Self Help Substance Abuse & Addiction Recovery',
            filter: 'SMART',
            icon: 'SMART',
            subCategory:['substances','processes']
        }, {
            display: 'Codependents of Sexual Addicts',
            filter: 'COSA',
            icon: 'COSA',
            subCategory: 'friends'
        }, {
            display: 'Sexaholics',
            filter: 'SA',
            icon: 'SA',
            subCategory: 'processes'
        }, {
            display: 'Sexual Compulsive',
            filter: 'SCA',
            icon: 'SCA',
            subCategory: 'processes'
        }],

        timeFilterItems: [{
            display: '6 - 11AM',
            filter: 'morning'
        },{
            display: '12 - 4PM',
            filter: 'afternoon'
        },{
            display: '4 - 8PM',
            filter: 'evening'
        },{
            display: '8PM - 6AM',
            filter: 'night'
        }]

    };
    return serviceAPI;
}]);