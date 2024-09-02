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
