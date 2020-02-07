/************************************************************************
 * This file is part of EspoCRM.
 *
 * EspoCRM - Open Source CRM application.
 * Copyright (C) 2014-2019 Yuri Kuznetsov, Taras Machyshyn, Oleksiy Avramenko
 * Website: https://www.espocrm.com
 *
 * EspoCRM is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * EspoCRM is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with EspoCRM. If not, see http://www.gnu.org/licenses/.
 *
 * The interactive user interfaces in modified source and object code versions
 * of this program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU General Public License version 3.
 *
 * In accordance with Section 7(b) of the GNU General Public License version 3,
 * these Appropriate Legal Notices must retain the display of the "EspoCRM" word.
 * 
 * SQL From Metadata - Open source plug in field for EspoCRM
 * Copyright (C) 2019-2020 Omar A Gonsenheim
************************************************************************/

define('data-dispatcher:utils', [], function () {

    var EnumFromSqlUtils = {
        
        camelCaseToUnderscore: function(string) {
            if (string === null) {
                return string;
            }
            return string.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
        },

        isJsonString: function (str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        },
        
        strpos: function (haystack, needle, offset) {
            var i = (haystack+'').indexOf(needle, (offset || 0));
            return i === -1 ? false : i;
        },

        findCustomPlaceholderNames: function (haystack,startNeedle,endNeedle) {
            var lastPos = 0;
            var placeholderNameStart = 0;
            var placeholderNameLength = 0;
            var placeholderName = '';
            var placeholderNames = [];
            while ((lastPos = this.strpos(haystack, startNeedle, lastPos)) !== false) {
                placeholderNameStart = lastPos + startNeedle.length;
                placeholderNameLength = this.strpos(haystack,endNeedle,lastPos) - placeholderNameStart;
                placeholderName = haystack.substring(placeholderNameStart,placeholderNameStart+placeholderNameLength);
                // avoid repeating field names
                if(placeholderNames.indexOf(placeholderName) === -1) {
                    placeholderNames.push(placeholderName);
                }
                lastPos = lastPos + startNeedle.length;
            }
            return placeholderNames;
        }
        
        
    };

    return EnumFromSqlUtils;

});
