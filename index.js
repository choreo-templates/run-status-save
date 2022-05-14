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

        const url = `${baseURL}/actions/runs`;
        const payload = {
            componentId: componentId,
            runId: parseInt(runId),
            sequenceNo: parseInt(sequenceNo),
            ghActionType: ghActionType
        }
        console.log("Payload : ", payload);
        axios.post(url, payload).then(
            () => {
                core.setOutput("choreo-action-run-status", "saved");
                console.log("choreo-action-run-status", "saved");
            }
        ).catch((error => {
            console.error('Error', error);
            if (error.response) {
                core.setOutput("choreo-status",error.response.data);
                console.log(error.response.status);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
                core.setOutput("choreo-status", "failed");
            }
        }))
    } catch (e) {
        core.setOutput("choreo-action-run-status-save", "failed");
        console.log("choreo-action-run-status-save", "failed");
        console.log("choreo-action-run-status-save", e.message);
    }
} else {
    core.setOutput("choreo-action-run-status-save", "disabled");
    console.log("choreo-action-run-status-save", "disabled");
}
