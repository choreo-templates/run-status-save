# GitHub Action Status Save

```yaml
uses: choreo-templates/run-status-save@v1.0.0
with:
  baseUrl: status-save
  componentId: b2025881-39ae-4228-a9b1-5ae528c11567
  status: IN_PROGRESS
  runId: ${{ github.run_id }}
  ghActionType: CREATE_APP
```

##### Action Status

`QUEUED`, `IN_PROGRESS`, `COMPLETED`

##### Action Types

`CREATE_APP`, `BUILD_DEPLOY`
