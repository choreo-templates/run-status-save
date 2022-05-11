# GitHub Action Status Save

```yaml
uses: choreo-templates/run-status-save@v1.0.0
with:
  baseUrl: status-save
  componentId: b2025881-39ae-4228-a9b1-5ae528c11567
  statusSequenceNo: 10
  runId: ${{ github.run_id }}
  ghActionType: CREATE_APP
```

##### Action Status Sequence No

`0`, `10`, `20`

##### Action Types

`CREATE_APP`, `BUILD_DEPLOY`
