# Schemas


 - [postTodoRequest](#posttodorequest)
 - [postTodoResponse](#posttodoresponse)

## postTodoRequest

### postTodoRequest@1.0.0


Todo item sent by the client

name | type | required | description
--- | --- | --- | ---
`done` | boolean | ✔ | Is this todo item completed?
`text` | string | ✔ | Todo text, like "clean room"


Example:

```json
{
  "done": false,
  "text": "do something"
}
```


[🔝](#schemas)

## postTodoResponse

### postTodoResponse@1.0.0


Todo item saved by the server and returned to the client

name | type | required | description
--- | --- | --- | ---
`done` | boolean | ✔ | Is this todo item completed?
`id` | integer | ✔ | Item server id
`text` | string | ✔ | Todo text, like "clean room"


Example:

```json
{
  "done": false,
  "id": 2,
  "text": "do something"
}
```


[🔝](#schemas)

