---
method: GET
path: /todos
operationId: list-todos
tags: [Todos]
---

# List todos

Returns all todos, optionally filtered by completion status.

```omg.query
{
  completed?: boolean,
  limit?: integer @min(1) @max(100)
}
```

```omg.response.200
[{
  id: uuid,
  title: string,
  completed: boolean
}]
```
