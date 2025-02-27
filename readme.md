# Customer's Canvas integration React sample app

This is code example illustrating how to authenticate in Customer's Canvas Hub, display an editor on a React page, and submit results to the server to start rendering process. It is based on ReactJS as a frontend framework and basic NodeJS Express-based backend. 

## Get started

Run 

```
npm install
```

Then

```
npm run dev
```

The app will be opened at http://localhost:3000

## Backend

This app includes a backend part in the **src/server** folder. It exposes only two endpoints: 

- `GET /api/get-token/:userId`

As a `userId` you should send an ID of a user who starts the personalization session. For test purposes you can send something really simple like "123", but for a real-life code it should be a storefront user id (of some sort of GUID if you are working with anonymous users). You will get a token which should be passed to the editor.

- `POST /api/save-project` 

It is expected that you send the following structure as a body: 

``` json
{
    "privateDesignId": "...", // a design ID returned from the editor
    "userId": "123", // the same user ID as was set for the editor
    "orderId": "42" // an order ID you can use to "connect" a project with an order placed by the user.  
}
```
It is supposed that you call this code once the customer completes the order. 

All the integration code is implemented in **cchub-service.ts**. See comments in this file for details.

## Frontend 

The frontend app is located in the **src/client** folder. It is a React app which is organized as follows: 

- In **App.tsx** you can configure routing.
- The **Main** component (see the **components** folder) is a navigation between all code example components available in this project. It uses the `SAMPLES` structure defined in the **constants** to build this page.
- The **samples** folder contains the code example components which focus on various aspects of Workflow Elements usage. For example, **samples/SimpleEditor.tsx** contains a basic example of Simple Editor initialization. 

Feel free to create copies of the sample components to experiment or make modifications directly in the pages. 