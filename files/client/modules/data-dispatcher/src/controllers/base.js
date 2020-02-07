/************************************************************************
 * This file is part of EspoCRM.
 *
 * EspoCRM - Open Source CRM application.
 * Copyright (C) 2014-2020 Yuri Kuznetsov, Taras Machyshyn, Oleksiy Avramenko
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
 * SQL From Metadata - Open source plug in module for EspoCRM
 * Copyright (C) 2020 Omar A Gonsenheim
************************************************************************/
// SCRIPT NOT USED ANYWHERE YET, IN DEVELOPMENT
Espo.define('data-dispatcher:controllers/base', 'controller', function (Dep) {

    return Dep.extend({
        
        sqlString: "",
        
        // build an SQL statement based on the JSON data provided at clientDefs
        buildSelectSQL: function(sqlJSON) {
            this.sqlString = "SELECT ";
            var fields = sqlJSON.select;
            var group = sqlJSON.group;
            var joins = sqlJSON.joins;
            var innerJoin = sqlJSON.innerJoin;
            var leftJoin = sqlJSON.letfJoin;
            var rightJoin = sqlJSON.rightJoin;
            var sort = sqlJSON.sort;
            var whereConditions = sqlJSON.whereConditions;
            if(fields) {
                fields.forEach(function(field){
                    field.fieldAlias = field.fieldAlias || field.fieldReference;
                    if(field.fieldReference && field.fieldAlias) {
                        if(this.sqlString === "SELECT ") {
                            this.sqlString += field.fieldReference+" AS "+field.fieldAlias;        
                        } else {
                            this.sqlString += ", "+field.fieldReference+" AS "+field.fieldAlias;                
                        }
                    }    
                },this);
                this.sqlString += " FROM "+sqlJSON.from+" ";
                if(joins){
                    joins.forEach(function(currJoin){
                        if(currJoin.joinType && currJoin.tableName && currJoin.joinField1Ref && currJoin.equality && currJoin.joinField2Ref) {
                            this.sqlString += currJoin.joinType.toUpperCase()+" JOIN "+currJoin.tableName+" ON "+currJoin.joinField1Ref+" "+currJoin.equality+" "+currJoin.joinField2Ref+" ";
                        }
                    }, this);
                }
                if(whereConditions) {
                    var isFirstWhere = true;
                    whereConditions.forEach(function(currCondition) {
                        if(currCondition.fieldReference && currCondition.equality && currCondition.value) {
                            if(isFirstWhere) {
                                this.sqlString += "WHERE "+currCondition.fieldReference+" "+currCondition.equality+" "+"'"+currCondition.value+"' ";
                                isFirstWhere = false;
                            } else {
                                this.sqlString += currCondition.whereLogicOperand+" "+currCondition.fieldReference+" "+currCondition.equality+" "+"'"+currCondition.value+"' ";                            
                            }
                        }
                    },this);
                }
                if(group) {
                    var isFirstGroup = true;
                    group.forEach(function(currGroup) {
                        if(currGroup.by) {
                            if(isFirstGroup) {
                                this.sqlString += "GROUP BY "+currGroup.by+" ";
                                isFirstGroup = false;
                            } else {
                                this.sqlString += ", "+currGroup.by+" ";                                
                            }
                        }
                    },this);
                }
                if(sort) {
                    var isFirstSort = true;
                    sort.forEach(function(currSort) {
                        if(currSort.sortFieldRef) {
                            currSort.sortDirection = currSort.sortDirection || "ASC";
                            if(isFirstSort) {
                                this.sqlString += "ORDER BY "+currSort.sortFieldRef+" "+currSort.sortDirection+" ";
                                isFirstSort = false;
                            } else {
                                this.sqlString += ", "+currSort.sortFieldRef+" "+currSort.sortDirection+" ";                                
                            }
                        }
                    },this);
                    
                }
            }    
            //console.log("sqlString = "+this.sqlString);    
        },
        
        actionExecuteSQL: function(options) {
            if(typeof options !== 'object') {
                alert("No options object passed to front end controller metadata-sql:controllers/base");
                window.history.back();
            } else {
            
            // DO SOMETHING HERE    
                
            }
            
        }

    });
});
