1 What is the difference between var, let, and const?

var: This is the old way of doing things. It’s a bit "loose" because you can declare the same variable name multiple times, which often leads to annoying bugs in your code.

let: This is the modern and disciplined version. You can change its value later (like updating a score), but you aren't allowed to re-declare it in the same block.

const: Think of this as a person of their word. Once you set a value, it stays that way forever and cannot be changed.

2 What is the spread operator (...)?

The spread operator is like a magic tool that unpacks everything from a bag (an array or object) and pours it into a new one. It’s super helpful when you want to copy data or merge multiple lists into one without messing up the original.
3 What is the difference between map(), filter(), and forEach()?

map(): This is like a factory machine. You feed it a list, it processes every single item, and hands you back a brand-new list with the results.

filter(): This acts as a strainer. You give it a condition, and it catches only the items that match, giving you a new list with just those specific parts.

forEach(): This is just a worker that goes through the list one by one to do a task (like logging to the console), but it doesn't create or return anything new.

4 What is an arrow function?

It’s a sleek, shorthand way of writing functions in modern JavaScript. Instead of typing out the whole word function, you just use a cool "arrow" symbol () => {}, which makes your code look much cleaner and easier to read.
5 What are template literals?

These are a lifesaver for writing strings. Instead of using quotes and plus signs to join text and variables, you use backticks (`) and just drop your variables directly inside ${}. It makes handling dynamic text much smoother.