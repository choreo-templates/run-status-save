const core = require('@actions/core');
const axios = require('axios').default;

const isActionEnabled = true;

if (isActionEnabled) {
    try {

        const baseURL = core.getInput('baseURL');
        const runId = core.getInput('runId');
        const componentId = core.getInput('componentId');
        const sequenceNo = core.getInput('statusSequenceNo');
        const ghActionType = core.getInput('ghActionType');
        const metadata = core.getInput('metadata');
        const token = core.getInput('token');
        const webhook_secret = core.getInput('webhook_secret');

        const url = `${baseURL}/component-utils/1.0.0/actions/runs/status`;
        const headers = {
            'Authorization': `Bearer ${token}`,
        }
        const payload = {
            componentId: componentId,
            runId: parseInt(runId),
            sequenceNo: parseInt(sequenceNo),
            ghActionType: ghActionType,
            token: webhook_secret
        };

        // Add metadata to payload only if it's provided
        if (metadata) {
            payload.metadata = metadata;
        }

        console.log("Payload : ", payload);
        axios.post(url, payload, {
            headers: headers
        }).then(
            () => {
                console.log("choreo-action-run-status", "saved");
            }
        ).catch((error => {
            console.error('Error', error);
            if (error.response) {
                console.log("choreo-status", error.response.status);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
                console.log("choreo-status", "failed");
            }
        }))
    } catch (e) {
        console.log("choreo-action-run-status-save", "failed");
        console.log("choreo-action-run-status-save", e.message);
    }
} else {
    console.log("choreo-action-run-status-save", "disabled");
}
