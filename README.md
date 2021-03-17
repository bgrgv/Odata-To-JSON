# Odata-To-JSON

Initial version of a super simple OData to JSON converter. 

Example Input :
```
$top=10&$filter=CodeName eq 'Beta' and Code eq 818 and Primary eq true
```

Output :
```
{
  top: 10,
  filter: [
    [ 'Code', 'eq', 818 ],
    [ 'CodeName', 'eq', 'Beta' ],
    [ 'Primary', 'eq', true ]
  ]
}
```
