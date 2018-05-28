# Schemas


 - [postTodoRequest](#posttodorequest)
 - [postTodoResponse](#posttodoresponse)

## postTodoRequest

### postTodoRequest@1.0.0


Todo item sent by the client

name | type | required | format | description
--- | --- | --- | --- | ---
`done` | boolean | ✔ |  | Is this todo item completed?
`text` | string | ✔ |  | Todo text, like "clean room"
`uuid` | string | ✔ | [uuid](#formats) | item random GUID


Example:

```json
{
  "done": false,
  "text": "do something",
  "uuid": "20514af9-2a2a-4712-9c1e-0510c288c9ec"
}
```


[🔝](#schemas)

## postTodoResponse

### postTodoResponse@1.0.0


Todo item saved by the server and returned to the client

name | type | required | format | description
--- | --- | --- | --- | ---
`done` | boolean | ✔ |  | Is this todo item completed?
`id` | integer | ✔ |  | Item server id
`text` | string | ✔ |  | Todo text, like "clean room"
`uuid` | string | ✔ | [uuid](#formats) | item random GUID


Example:

```json
{
  "done": false,
  "id": 2,
  "text": "do something",
  "uuid": "3372137d-b582-4e32-807d-af3021112efa"
}
```


[🔝](#schemas)

## formats


Custom formats defined to better represent our data.

name | regular expression | dynamic | default
--- | --- | --- | ---
uuid | `/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/` | ✔ | `"ffffffff-ffff-ffff-ffff-ffffffffffff"`


[🔝](#schemas)

