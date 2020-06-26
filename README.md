## Steps required to run this project

1. In config/keys.json in root project
2. Your keys.json file must be look like this
    module.exports = {
        mongoURI : PASTE YOUR MONGO DB CONNECTION STRING HERE
    }
3. Run `yarn install:all` to install all packages including server side and client side. You can also install packages separately by running command `yarn install` and then `yarn client-install` in root folder so that you don't have to get in client folder first and then install packages. But i would highly recommend to install packages by running `yarn install:all`

4. Run `yarn dev` to run both server side and client side code. You can also run them separately but `yarn dev` would be highly recommended