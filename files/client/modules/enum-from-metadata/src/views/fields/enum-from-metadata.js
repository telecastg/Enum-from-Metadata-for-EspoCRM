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
 * Enum From Metadata - Open source plug in field for EspoCRM
 * Copyright (C) 2019-2020 Omar A Gonsenheim
************************************************************************/

Espo.define('enum-from-metadata:views/fields/enum-from-metadata', ['views/fields/enum','data-dispatcher:utils'], function (Dep,ExeMgrUtils) {
    
    return Dep.extend({
        
        setup: function () {
            Dep.prototype.setup.call(this);
            this.listenTo(this.model, 'change', this.setupOptions, this); 
        },

        setupOptions: function () {
            // clear the existing list values and initialize variables
            var list = [];
            var translatedOptions = {};            
            this.params.options = list;
            this.reRender();
            var self = this;
            var entityGoodToGo = true; 
            var fieldGoodToGo = true;
            this.translatedOptions = translatedOptions;
            // get the placeholder names
            var independentVariableEntityPlaceholder = this.getMetadata().get('entityDefs.'+this.model.urlRoot+'.fields.'+this.name+'.independentVariableEntity') || '';
            var independentVariableFieldPlaceholder = this.getMetadata().get('entityDefs.'+this.model.urlRoot+'.fields.'+this.name+'.independentVariableField') || '';
            var independentVariableFieldAttribute = this.getMetadata().get('entityDefs.'+this.model.urlRoot+'.fields.'+this.name+'.independentVariableFieldAttribute') || '';
            // convert placeholder names to javascript expressions if their value is a placeholder
            if(ExeMgrUtils.strpos(independentVariableEntityPlaceholder,'@@{{') !== false) {
                var independentVariableEntity = ExeMgrUtils.findCustomPlaceholderNames(independentVariableEntityPlaceholder,'@@{{','}}/@@')[0]; 
                if(eval("this."+independentVariableEntity)) {
                    independentVariableEntity = eval("this."+independentVariableEntity);
                    entityGoodToGo = true;
                } else {
                    entityGoodToGo = false;                    
                }                
            } else {
                var independentVariableEntity = independentVariableEntityPlaceholder;
                entityGoodToGo = true;
            }
            if(ExeMgrUtils.strpos(independentVariableFieldPlaceholder,'@@{{') !== false) {
                var independentVariableField = ExeMgrUtils.findCustomPlaceholderNames(independentVariableFieldPlaceholder,'@@{{','}}/@@')[0]; 
                if(eval("this."+independentVariableField)) {
                    independentVariableField = eval("this."+independentVariableField);
                    fieldGoodToGo = true;
                } else {
                    fieldGoodToGo = false;                    
                }                
            } else {
                var independentVariableField = independentVariableFieldPlaceholder;
                fieldGoodToGo = true;
            }            
            if(entityGoodToGo===true && fieldGoodToGo===true) {
                // build the metadata string that will retrieve the appropriate values
                var metadataString = 'entityDefs.'+independentVariableEntity+'.fields.'+independentVariableField+'.'+independentVariableFieldAttribute; 
                // get the list options from metadata depending on the value of the selection made of entityType
                var metadataList = this.getMetadata().get(metadataString) || '';
                if(typeof(metadataList) === "object") {
                    // load the select element with the values retrieved from metadata and re-render
                    var list = [];
                    var translatedOptions = [];
                    this.translatedOptions = null;
                    translatedOptions[''] = '';
                    list.push('');
                    metadataList.forEach(function (item) {
                        if(item) {
                            list.push(item);
                            translatedOptions[item] = item;
                        }                                    
                    });
                    this.translatedOptions = translatedOptions;
                    this.params.options = list;
                    this.reRender(); 
                }    
            }    
        }
        
    });    
});
