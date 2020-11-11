const LaunchDarkly = require('launchdarkly-node-server-sdk');
const express = require('express');
const app = express();
require('dotenv').config();

app.use(function (req, res, next) {
    // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/api", (req, res, next) => {
    
    const ldclient = LaunchDarkly.init("sdk-7546b7a3-14eb-4664-a38c-4ffd0f796818");

    var user = {
        key: "sherron+test20@launchdarkly.com",
        firstName: "Simon",
        lastName: "Herron",
        country: "UK",
        city: "London",
        ip: "127.0.0.1",
        email: "sherron@launchdarkly.com",
        privateAttributeNames: ["email", "MRR"],
        custom: {
            groups: ["Beta", "Internal", "High Volume"],
            networkConnection: "4g",
            loyaltyMember: false,
            requestTime: Math.round(new Date().getTime() / 1000),
            LTV: "Z142456"
        }
    };


    ldclient.on("ready", function() {
        
        //Assign the Flag ID to a variable.
        const flagName = "Nov2020.SortOrder.Perm";

        //Assign Variation to a Variable & Variation Details to a Variable.
        ldclient.variationDetail(flagName, user, false, function (err, testFeature) {
            //Flag Conditional
            if (testFeature.value) {
                var userInfo = testFeature.value;
            } else {
                userInfo = [
                    {
                        id: 22,
                        image: "https://via.placeholder.com/256.png/0000FF",
                        name: "This is your default.",
                        size: '256 x 256',
                        price: "14.99"
                    }
                ];
            }
            res.json(userInfo);

            //Assignments Object to use for Analytics
            let assignmentDetails = {
                flagName: flagName,
                variationIndex: testFeature.variationIndex,
                value: testFeature.value,
                reason: testFeature.reason
            };

            console.group("Data Warehouse Example");
                console.log("UserID: " + user.key);
                console.log("City: " + user.city);
                console.log("Flag: " + assignmentDetails.flagName);
                console.log("Reason: " + assignmentDetails.reason.kind);
                if (assignmentDetails.variationIndex === 0) {
                    console.log("Variant: Control - 0");
                } else if (assignmentDetails.variationIndex === 1) {
                    console.log("Variant: Name - 1");
                } else if (assignmentDetails.variationIndex === 2) {
                    console.log("Variant: Price - 2");
                }
            console.groupEnd();

        });

    });
});

app.listen(8080, () => {
    console.log("Server running on port 8080");
})