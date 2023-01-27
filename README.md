# POC-LOGS

```
cd api
docker build -t luizlipefs/jobs:1.0.0 . 
docker run --rm luizlipefs/jobs:1.0.0 renovacao-cesta

docker run --rm --log-driver=loki \
    --log-opt loki-url="http://192.168.1.10:3100/loki/api/v1/push" \
    --log-opt loki-tenant-id=vou \
    --log-opt loki-batch-size=1 \
    -e LOGGER_LEVEL=info \
    -e TENANT_NAME=vou \
    luizlipefs/jobs:1.0.4 transacoes-pendentes
```

https://medium.com/globant/setup-prometheus-and-grafana-monitoring-on-kubernetes-cluster-using-helm-3484efd85891