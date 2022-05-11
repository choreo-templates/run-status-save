import * as core from '@actions/core';

const axios = require('axios').default;

try {
    const baseURL = core.getInput('baseURL');
    const runId = core.getInput('runId');
    const componentId = core.getInput('componentId');
    const sequenceNo = core.getInput('statusSequenceNo');
    const ghActionType = core.getInput('ghActionType');

    const url = `${baseURL}/action/run/status`;
    const payload = {
        componentId: componentId,
        runId: runId,
        sequenceNo: sequenceNo,
        ghActionType: ghActionType
    }

    axios.post(url, payload).then(
        () => {
            core.setOutput("choreo-action-run-status", "saved");
            console.log("choreo-action-run-status", "saved");
        }
    ).catch((error => {
        if (error.response) {
            core.setFailed(error.response.data);
            console.log(error.response.status);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
            core.setOutput("choreo-status", "failed");
            core.setFailed(error.message);
        }
    }))
} catch (e) {
    core.setOutput("choreo-action-run-status-save", "failed");
    core.setFailed(e.message);
    console.log("choreo-action-run-status-save", "failed");
    console.log(e.message);
}
