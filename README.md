# MeetTheTeam
This code is a Vue.js application that displays a list of users and allows the user to toggle between a card view and a list view. The MeetTheTeam.vue component is the main component that contains three child components: TopBar, CardTemplate, and ListTemplate. The TopBar component contains the search input field, sorting button, and view toggle button. The CardTemplate and ListTemplate components display the user data in either card or list form.

The MeetTheTeam.vue component fetches user data from an API and stores it in an array. The component then filters and sorts the user data based on user input and state changes. The TopBar component emits events when the user inputs search criteria, sorts users, or toggles the view mode. The parent component (MeetTheTeam.vue) listens to these events and updates the state and displayed data accordingly.

```
path: /meetTheTeam
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
### Tests
```
npm run test
