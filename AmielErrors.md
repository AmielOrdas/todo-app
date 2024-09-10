# Introduction

This markdown file serves as a documentation for errors encountered by Amiel Mir O. Ordas

# Table of Contents

# 1. Git error because of file name differences

## Error description

The error that I encountered in September 1, 2024 is that

1. The file name of **"Todo.tsx" is "todo.tsx" in the remote repository in GitHub** while the file name of **"Todo.tsx" is "Todo.tsx" in my local repository**.
2. This difference lead to **Git not watching the changes in "Todo.tsx" in my local repository**.
3. This means that my changes cannot be pushed to the remote repository.

## Solving the error

These are the steps that I did to solve the error:

1. I manually changed the file name of **todo.tsx** to **"Todo.tsx"** in Github.
2. This leads to **Git watching the changes in "Todo.tsx" in my local repository**
3. I pushed my changes in the **amiel branch** to the **main branch** successfully.

# 2. Flex css property affecting the width of my component

## Error description

The error that I encountered in September 10, 2024 is that:

1. I have a component named "TodoForm.tsx" inside a `<div>` element as shown below:

```html
<div className="border-2 border-red-500 text-center">
  <TodoForm />
</div>
```

If I use flex here, the width of my TodoForm will be adjusted to the <input> width which means it will get smaller. This is because flex items have flex-shrink:1 by default and thats why it shrinks to the size of the input button.

## Solving the error

I solved the error in two ways:

1. First, I set the width of the form to be full like `w-full` in tailwind.
2. SEcond which is the one I implemented, I did not use flex, instead I used text-alignment: center or text-center in tailwind to solve the issue.
