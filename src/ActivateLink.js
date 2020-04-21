import React from 'react';
import { withLDConsumer} from 'launchdarkly-react-client-sdk';

const ActivateLink = ({ flags, ldClient }) => {
    const fcp = window.performance.getEntriesByName("first-contentful-paint")[0].startTime;
    const fcpOutput = parseFloat(fcp.toFixed(2) / 1000);
    ldClient.track("First Contentful Paint", null, fcpOutput);
    console.log(
        "%c First Contentful Paint: " + fcpOutput.toFixed(4) + " Seconds",
        "font-size: 15px; color: red;"
    );
    console.log("%c Click Event Fired.", "font-size: 15px; color: yellow;");
    return false;
};

export default withLDConsumer()(ActivateLink);