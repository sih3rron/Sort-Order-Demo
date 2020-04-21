const LaunchDarkly = require('launchdarkly-node-server-sdk');
const express = require('express');
const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/api", (req, res, next) => {
    
    const ldclient = LaunchDarkly.init(process.env.SERVER_SIDE_SDK_ID);

    var user = {
        //key: "user" + Math.floor(Math.random() * 90000000) + 10000,
        key: "sherron+test@launchdarkly.com",
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
        const flagName = "sortorder";

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

            console.log(testFeature.reason.kind)
            console.group("%c Data Warehouse Example", "font-size: 15px;");
            console.log("%c UserID: " + user.key, "font-size: 15px;");
            console.log("%c City: " + user.city, "font-size: 15px;");
            console.log("%c Flag: " + assignmentDetails.flagName, "font-size: 15px;");
            console.log("%c Reason: " + assignmentDetails.reason.kind, "font-size: 15px;");
            if (assignmentDetails.variationIndex == "0") {
                console.log("%c Variant: Control", "font-size: 15px;");
            } else if (assignmentDetails.variationIndex == "1") {
                console.log("%c Variant: Price", "font-size: 15px;");
            } else if (assignmentDetails.variationIndex == "2") {
                console.log("%c Variant: Name", "font-size: 15px;");
            }
            console.groupEnd();

        });

    });
});

app.listen(8080, () => {
    console.log("Server running on port 8080");
})