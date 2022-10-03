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