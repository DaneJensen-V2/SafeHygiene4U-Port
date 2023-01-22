Prettier --write is great for formatting everything, but for a big project it might take a little while. 
•	You may run prettier --write app/ to format a certain directory
•	Or for example, prettier --write app/components/Button.js to format a certain file.
•	Or use a glob like prettier --write "app/**/*.test.js" to format all tests in a directory
•	Use pretty-quick --staged if you want to only use staged files to format, and they will be re-staged after formatting. 
