# DELAWE
DELAWE is an app that helps restaurants manage their delivery team. It includes a Rails [API](https://github.com/fontesrp/delawe-api) and a mobile [app](https://github.com/fontesrp/delawe) built using React Native.

# Running Locally
Because DELAWE uses React Native, running it in your own computer should be pretty straight forward.

1. Follow the instructions [here](https://facebook.github.io/react-native/docs/getting-started.html) under "Building Projects with Native Code" and "iOS" to install the CLI.
2. Open Terminal, `cd` into the repository's root and run the following:
```bash
$ cd app/
$ yarn
$ yarn run lib-config
$ react-native run-ios
```
3. That's it! A simulator should open and start running the app.

Since the API is on the cloud, there is no need to run a Rails server locally. If that's what you want to do, you can check its repository for instructions and you should have used the `--recurse-submodules` flag when cloning this project. You will also have to edit the links in `app/app/lib/actionCable.js:3` and `app/app/lib/api.js:29` to point to your host.

To reproduce the screens bellow, it's better to have DELAWE running on two simulators and use this users:

| Type       | Username      | Password    |
| ---------- | ------------- | ----------- |
| Restaurant | er@apple.com  | supersecret |
| Courier    | jb@crosby.com | supersecret |

If you are having trouble with Xcode or a red screen is showing, check the [Troubleshooting](#troubleshooting) section.

# Usage
DELAWE has two types of users: restaurants and couriers; and we are going to follow the lifecycle of an order through their cellphones.

First, let's login as a restaurant. This screen should show up.

<img width="38%" alt="restaurant_home" src="https://imgur.com/YxKUwko.png">

Here the restaurant can see the locations of its store, currently open orders and couriers. These are all updated in real-time, so if a courier is driving, the store will see his marker moving.

Let's use another simulator to login as a courier. This is his home screen:

<img width="38%" alt="courier_home" src="https://i.imgur.com/mtNAVW1.png">

He can see his current location and his assigned orders. Once he logs in, DELAWE automatically starts sending his location to the API. Although, since it's using Web Sockets and callbacks for when the user position changes, this won't have too great an impact on the battery.

Now let's create our first order! We can click on the button at the bottom of the screen that says "REQUEST FOR PICKUP" and inform the value and address for the delivery and select a courier. The couriers are shown sorted by their current distance and time since their last pickup. The courier that is shown at a higher position is, therefore, suggested as a better option.

<img alt="restaurant_new_order_address" src="https://media.giphy.com/media/1wQNMrYMBEHdhBjTwD/giphy.gif">
<img alt="restaurant_new_order_courier" src="https://media.giphy.com/media/3rwzzHsUVZxrfgVCw5/giphy.gif">

Here is where DELAWE makes some magic. Because it's using Rails' ActionCable to implement Web Sockets, the new order has been automatically pushed to the courier's cellphone! On the courier simulator, we can see a notification show up and, if the address was inputed correctly, the order appear in his map.

<img alt="courier_new_order" src="https://media.giphy.com/media/3Glf9AZSoJYv6MUHI0/giphy.gif">

Once the courier arrives at the restaurant and collects the items, he can click the order and mark it as picked up. He can then get direction to the client's address, like so:

<img alt="courier_pickup" src="https://media.giphy.com/media/3bzJxEgXynEcB9W2Bs/giphy.gif">

After arriving at the correct address, the courier can go back to DELAWE and mark the order as completed. That is going to send a notification for the restaurant and transfer to the courier the credits for the delivery.

<img alt="courier_pickup" src="https://media.giphy.com/media/g0Biop0vCBKIwa3sa7/giphy.gif">

And here is the notification received by the store:

<img alt="courier_pickup" src="https://media.giphy.com/media/8BlnuEwtsvOWRh9Zss/giphy.gif">

# Other screens and more features

If you press the menu button on the top left corner, or swipe from left, you can see a lateral menu with a lot more screens. Most of them were made for an earlier version of DELAWE and haven't been updated yet. The user's wallet, for example, doesn't recognize the values of the transactions anymore, and the orders history is just a list with no functionality whatsoever for editing its items. All those screens will be working in the future, but for now only the home, login and settings pages are completed.

Some features to help the courier access his current delivery more easily are also on the road map.

Another thing that is missing is a Web client for managing the deliveries from a computer. That is coming later this year and is going use React to interface with the API.

# Troubleshooting

## Xcode
As the app is running on a simulator, Xcode doesn't usually complain about certificates and signing accounts. If it does, however, you can do this from the project root:
```bash
$ open app/ios/app.xcworkspace
```
That should open the project on Xcode. You can then use the "Project navigator" on the left and click on the first item that appears, a folder with name `app` and a blue icon. From there, you can go to the "General" tab and edit the "Signing" section.

## Red Screen
If, after logging in, a red screen is appearing, that can be the effect of the discrepancy between the used version of React Native and the one required by some of the project's dependencies. A shell script is included in the project to fix the lines that cause the error. If you ran `yarn run lib-config` after cloning the project, that should have run the script. If it hasn't, you will need to make sure the file is executable and then run it. From the project's root, do the following:
```bash
$ cd app
$ chmod +x fix_dependencies.sh
$ ./fix_dependencies.sh
```
Don't worry about running this more than once, it will only replace the lines that match exactly the ones that cause errors.

# Licence
It's free! See the [LICENSE](./LICENSE) file for details.
