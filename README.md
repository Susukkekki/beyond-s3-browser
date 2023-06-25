# Beyond S3 Browser

- [Beyond S3 Browser](#beyond-s3-browser)
  - [패키지 설치](#패키지-설치)
  - [실행](#실행)
  - [npm 패키지](#npm-패키지)
  - [MinIO 테스트 환경 구성](#minio-테스트-환경-구성)

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
