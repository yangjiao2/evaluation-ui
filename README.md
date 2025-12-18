# NVBot Evaluation UI

## Running Locally

### 1. Clone Repo


### 2. Install Dependencies

```bash
npm install
```

### 4. Run App

```bash
npm run dev
```


## Endpoints 


Dev, Stage Env: (rdlDOBYASPqgModybRvSuQYn_aamo_2kkdEcsQccQ9M)


Production Env:  (e5m5NwmeXpHiqDkeQIhFfjAUZNvejcKZK-AC9C7Vjcs)


# Build

docker build --build-arg "REGISTRY_TOKEN=$REGISTRY_TOKEN" --build-arg "CONFIG_ENV=dev" . -t eva-ui

docker run eva-ui:latest