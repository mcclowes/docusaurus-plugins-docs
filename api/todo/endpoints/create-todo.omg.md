---
method: POST
path: /todos
operationId: create-todo
tags: [Todos]
---

# Create a todo

```omg.body
{
  title: string @minLength(1) @maxLength(200)
}
```

```omg.response.201
{
  id: uuid,
  title: string,
  completed: boolean
}
```
