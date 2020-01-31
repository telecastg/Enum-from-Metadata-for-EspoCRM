# Enum-from-Metadata-for-EspoCRM
Enum (select) type field that is populated by data extracted from metadata.

With this plug-in is possible to get any unlinked entity field options to populate an enum element.

Usage instructions:

Instructions to use:

Go to Administration >> Entity Manager and select your target Entity, then click the "Fields" link.
Click "Add Field" and select "Enum from Metadata".
Clear cache and rebuild.

To specify the Entity, field and options ("control entity") where the information will be retrieved to populate a field type Enum in another Entity ("target entity"), go to the target entity's entityDefs metadata file and specify the following attributes: 

1.- "independentVariableEntity" - The name, or the javascript expression that will yield the name of the entity (the "control entity") from where the metadata information will be retrieved .

2.- "independentVariableField" - The name of the field, or the javascript expression that will yield the name of the field (the "control field") within the "control entity" containing the metadata information . 

3.- "independentVariableFieldAttribute" - The name of the "control field" attribute, or the javascript expression that will yield the name of the attribute  (the "control attribute") from where the values for the "target entity" Enum list will be retrieved.

Example: 

In the example below, the target entity is a custom entity that contains one (select) element called "invoiceItemCategory" which offers the following options: ["Laptops", "Tablets", "Power Supplies"]

That same target entity contains another enum (select) element called "SkuOptions" that depending on the selection made of "incoiveItemCategory" should list the "SkuOptions" correponding to the category chosen.

"Laptops", "Tablets", "Power Supplies" are different custom entities and they all contain a field called "sku" that has an attribute called "options" which is an array of the different skus available for that product category.

Values surrounded by placeholders "@@{{" and "/}}@@ will be evaluated as javascript expressions to return a value corresponding to the entity, field or attribute desired.

Custom Entity enityDefs:

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

When an "invoiceItemCategory" is chosen from the list, the select element (enum) "SkuOptions" will be populated with the values of the options for the "sku" field in the category custom entity.

