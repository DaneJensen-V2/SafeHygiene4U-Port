# Getting started

### Step 0: Cloning the Repo
Before any local development / building can take place, we need to get access to clone and manage the repo on our local system. 

The following steps are a first-shot at documenting this process for *Windows* (it should be much easeir on Mac/Unix machines, as bash/zsh are supported natively)

Windows instructions: [source](https://docs.gitlab.com/ee/user/ssh.html#add-an-ssh-key-to-your-gitlab-account):
- Install git-bash
	- Run commands:
        - `cd ~`
    	- `cd .ssh`
		- `ssh-keygen -t rsa -b 2048 -C "my_key"`
	- press enter to accept default file to save the key
	- enter a passphrase (twice)
	- Type: `cat ~/.ssh/id_rsa.pub | clip`
	- Sign in to GitLab.
	- On the top bar, in the top right corner, select your avatar. Select Preferences.
	- On the left sidebar, select SSH Keys.
	- In the Key box, paste the contents of your public key. (you can just do ctrl-v if you ran the command above)
	- In the Title box, type a description, like Work Laptop or Home Workstation.
	- Select Add key
	- Type:
		- `ssh -T git@gitlab.com`
	if it works, you should see "Welcom to GitLab, @username"

	- Navigate to the directory you want to clone the repo into
	- Type:
		- `git clone git@gitlab.com:repurpost-interns/mobile-app.git`

And you should be done! If you run into any issues with the above steps, check out the source link at the top for further instructions.

### Step 1: Install necessary dev tools
If you don't already have npm, nvm, and node installed, you're going to want to install those. 

[Here's a link](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to the npm docs on installing npm/nvm/node.

You can either
1. Follow steps to install these packages for Windows (for use with Powershell)
2. Install WSL (either 1 or 2) and follow the instructions for a Unix setup. Taster's choice on this one -- there isn't a major difference either way you want to go about this. 

==**You will also need to download the Expo Go app for your desired platform (Android/iOS).**== 
This is how we will test the app before publishing. 

### Step 2: Build the package locally.

- Navigate to wherever you have cloned the repo in whichever command-line interface you chose in Step 1. (Powershell or WSL terminal). 
- run `npm install` to install all of the required build and dev dependencies. 
- run `npm start` to start the server. 

And that's it! Scan the QR code that appears in the terminal with your phone and you're ready to go!

### Testing

For any changes we make, an effort for reaonable unit testing should be made (80%+ line coverage when possible). You can run tests using the `npm test` command, which also produces a coverage report. Feel free to make new testing scripts for various kinds of output you'd like to see. 

Some info on the testing libraries:
- Jest is the framework we will use to create unit tests.
- react-test-renderer will be used to headlessly render the components for unit tests, since it plays well with React Native
- Also installed is React-Native-Testing-Library, which allows us to write *really cool* tests and simulate our components being interacted with.
  - Examples of BOTH of these types of tests being written are available under `tst/components/` with testing done for the `Hello World` text component.
- Quick link to Jest `expect` assertions [here](https://jestjs.io/docs/expect)
  - [Expect matchers you can use with RNTL-based tests](https://www.npmjs.com/package/@testing-library/jest-native#matchers)
- [react-test-renderer](https://reactjs.org/docs/test-renderer.html);
- [React Native Testing Library exmaple](https://testing-library.com/docs/react-native-testing-library/example-intro)
  - [Firing events on components using Screen and FireEvent](https://testing-library.com/docs/dom-testing-library/api-events/)

### Writing Tests
The format for writing tests and organizing them into different test suites is really simple. 
Use `describe()` to describe the component being tested, and `it()` statements to describe behavior of the component. 
`beforeEach()`, `afterEach()`, `beforeAll()`, `afterAll()` , etc statements can be used to perform setup functions that are common to every test you want to run.
Both of these functions accept a string (to describe the test) and a callback function that runs the test, i.e:

```
describe('the XYZ component', () => {
	beforeEach( async () => {
		await //some async setup task, like rendering.
	});
	it('should do something', () => {
		//write the test to make sure that it does something here.
	});
})
```
