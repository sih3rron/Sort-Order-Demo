# Experiment-Sort-Order-Demo
These are the steps and code needed to create your own product Sort-Order demo

# Why? #

The purpose of the demo is to illustrate several scenarios: 

- How we can use JSON to control content, so no need for DOM Manipulation. 
- How we can experiment with API endpoints.
- Experimenting on one part of an APP (in this case the API supplying our JSON) and measuring on the front-end (our React APP).


### Creating the JSON for your Feature Experiment ###
1. Choose the page that you want to scrape for JSON Data; Product Lists or Search Results are ideal.

Good examples are:
- [Carthartt-wip Sales Page](https://www.carhartt-wip.com/en/men-sale)
- [Macys Product Listings Page](https://www.macys.com/shop/mens-clothing/sale-clearance)
- [Ford Showroom](https://shop.ford.com/showroom/?gnav=header-shop&linktype=build#/)


2. Open your browsers _developer console_ and use the `productData.js` script to select the fields you want added to your JSON Object. You will need to adjust the Element selectors for each statement, thus overwrite: `<< element selector for xxxx >>`

3. If successful, you will have an array of objects output to the Console. 

> **Pro-Tip**: Check the first and last 5 records to ensure that your data has been passed into the array consistently.

### Sorting the JSON Arrays for use in your Variations ###

1. In the _developer console_ use the `compareValuesFn.js` to sort the data.
2. You will then be able to use the `.sort()` method on the `dataset` Array that you have created.
3. Run this to sort on the available attribute keys in whatever order to require e.g. 

```javascript
dataset.sort("name", "asc");
```

### Exporting the Array to a file from your console ###

1. In your `developer console` use the `console.save` script to enable your export.
2. `console.save()` each dataset you want to add as a variation in your Experiment.

> **Pro-Tip**: Remember your Control Version is going to be the data in its original form unsorted; then you have your additional sorted JSON datasets.


### Setting up your JSON Feature Flag for an Experiment ###

1. Create your JSON Feature Flag - I use a Control + 2 Variations (Current order, Sort by Name, Sort by Price)
2. Add a Click Metric to the class `.linky`

> **[OPTIONAL]** - I have included reference to a custom numeric metric called "First Contentful Paint" that passes back that performance metric when a panel is clicked.

3. Connect your Experiment pieces together, but don't start it.

### Deploying your experiment ###

Open your terminal and run the following to set up a project folder on your desktop.

```
cd desktop  
mkdir sortorder  
cd sortorder  
```

clone or download this repo to the `sortorder` folder.

Run `npm install`

In order to start the API you should run the cmd: `node server`. 
- This will run the API locally on localhost:8080/api

To run the React App you should run the cmd: `npx webpack-dev-server --mode development`. 
- This will run the app on localhost:3000.

Before you start

