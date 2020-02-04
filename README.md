# Enum-from-Metadata-for-EspoCRM
Enum (select) type field that is populated by data extracted from metadata.

With this plug-in is possible to get from metadata, any linked or unlinked entity field options to populate an enum element.

## Usage instructions:

Go to Administration >> Entity Manager and select your target Entity, then click the "Fields" link.
Click "Add Field" and select "Enum from Metadata".
Clear cache and rebuild.

To specify the Entity, field and options ("control entity") where the information will be retrieved to populate a field type Enum in another Entity ("target entity"), go to the target entity's entityDefs metadata file and specify the following attributes: 

1.- "independentVariableEntity" - The name, or the javascript expression that will yield the name of the entity (the "control entity") from where the metadata information will be retrieved .

2.- "independentVariableField" - The name of the field, or the javascript expression that will yield the name of the field (the "control field") within the "control entity" containing the metadata information . 

3.- "independentVariableFieldAttribute" - The name of the "control field" attribute, or the javascript expression that will yield the name of the attribute  (the "control attribute") from where the values for the "target entity" Enum list will be retrieved.

## Example: 

In the example below, the target entity ("CustomOrder") is a custom entity that contains one enum (select) element called "invoiceItemCategory" which offers the following options: ["Laptops", "Tablets", "Power Supplies"] and another enum (select) element called "skuOptions".

"Laptops", "Tablets", "Power Supplies" are themselves different custom entities and they all have a field called "sku" that has an attribute called "options" which is an array of the different skus available for that product category.

Depending on the option chosen for enum "invoiceItemcategory", the enum "skuOptions" should only dislay the "sku" options avalable for the "invoiceItemCategory" entity.

For example, if entity "Laptops" has "sku" options ["Chrome","Windows","MacOs","Linux"] when "Laptops" is selected in the "invoiceItemCategory" enum, then "skuOptions" enum options will display "Chrome","Windows","MacOs" and "Linux".

See the example entityDefs script below, values surrounded by placeholders "@@{{" and "/}}@@" will be evaluated as javascript expressions to return a value corresponding to the entity, field or attribute desired.

CustomOrder entityDefs:

"fields": {

    "invoiceItemCategory": {

    "type": "enum",
	 
    "required": true,
	 
    "options": ["Laptops", "Tablets", "Power Supplies"]
	 
    },
   
    "SkuOptions": {
	 
      "type": "enum-from-metadata",
			
      "required": true,
			
      "options": [],
			
      "isCustom": true,
			
      "independentVariableEntity": "@@{{model.attributes.invoiceItemCategory}}/@@",
      
      "independentVariableField": "sku",
      
      "independentVariableFieldAttribute": "options"
			 
    }  
	 
}   

