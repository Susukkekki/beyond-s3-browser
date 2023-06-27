# Beyond S3 Browser

- [Beyond S3 Browser](#beyond-s3-browser)
  - [패키지 설치](#패키지-설치)
  - [실행](#실행)
  - [npm 패키지](#npm-패키지)
  - [MinIO 테스트 환경 구성](#minio-테스트-환경-구성)
    - [Play MinIO](#play-minio)
    - [Windows](#windows)
    - [Mac](#mac)

## 패키지 설치

```bash
npm install electron --save-dev
```

## 실행

```bash
npm run start
```

## npm 패키지

```bash
npm i bootstrap@5.3.0
```

```bash
npm i bootstrap-icons@1.10.5
```

<!-- 
```bash
npm install jquery 
```
-->

## MinIO 테스트 환경 구성

### Play MinIO

설치하지 않아도 MinIO 에서 제공하는 테스트 서버를 사용할 수 있을 것 같다.

- https://play.min.io:9443
- Username: Q3AM3UQ867SPQQA43P2F
- Password: zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG

> - https://min.io/docs/minio/linux/administration/minio-console.html#id5:~:text=dynamic%20redirection%20behavior.-,Logging%20In,-Changed%20in%20version

### Windows

1. Windows WSL 에 K3s 설치

2. Helm 설치

3. Minio 설치

- https://github.com/minio/minio/tree/master/helm/minio

```bash
helm install --set resources.requests.memory=512Mi --set replicas=1 --set persistence.enabled=false --set mode=standalone --set rootUser=minio,rootPassword=minio1234 --generate-name minio/minio
```

minio-console 을 nodePort 설정하여 접속

```diff
spec:
  clusterIP: 10.43.237.73
  clusterIPs:
  - 10.43.237.73
  externalTrafficPolicy: Cluster
  ipFamilies:
  - IPv4
  ipFamilyPolicy: SingleStack
  ports:
  - name: http
+   nodePort: 30000
    port: 9001
    protocol: TCP
    targetPort: 9001
  selector:
    app: minio
    release: minio-1687681146
  sessionAffinity: None
+ type: NodePort
```

### Mac

> - https://min.io/docs/minio/macos/index.html

```bash
brew install minio/stable/minio
```

```bash
export MINIO_CONFIG_ENV_FILE=/etc/default/minio
minio server --console-address :9090
```

- https://127.0.0.1:9000
- minioadmin / minioadmin
