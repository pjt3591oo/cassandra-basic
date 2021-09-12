
* node 0

```bash
$ docker run --name cassandra-node-0 -p 7000:7000 -p 7001:7001 -p 9042:9042 -p 9160:9160 -e CASSANDRA_CLUSTER_NAME=MyCluster -e CASSANDRA_ENDPOINT_SNITCH=GossipingPropertyFileSnitch -e CASSANDRA_DC=datacenter1 -d cassandra
```

* seed node ip

```bash
$ docker inspect --format='{{ .NetworkSettings.IPAddress}}' cassandra-node-0
```

* node 1

```bash
$ docker run --name cassandra-node-1 -p 17000:7000 -p 17001:7001 -p 19042:9042 -p 19160:9160 -e CASSANDRA_SEEDS="$(docker inspect --format='{{ .NetworkSettings.IPAddress}}' cassandra-node-0)" -e CASSANDRA_CLUSTER_NAME=MyCluster -e CASSANDRA_ENDPOINT_SNITCH=GossipingPropertyFileSnitch -e CASSANDRA_DC=datacenter1 -d cassandra
```

* node2

```bash
$ docker run --name equal-a-cassandra-node-2 -p 27000:7000 -p 27001:7001 -p 29042:9042 -p 29160:9160 -e CASSANDRA_SEEDS="$(docker inspect --format='{{ .NetworkSettings.IPAddress}}' cassandra-node-0)" -e CASSANDRA_CLUSTER_NAME=MyCluster -e CASSANDRA_ENDPOINT_SNITCH=GossipingPropertyFileSnitch -e CASSANDRA_DC=datacenter1 -d cassandra
```

* cql execute

```bash
$ docker run -it -e CQLSH_HOST=$(docker inspect --format='{{ .NetworkSettings.IPAddress}}' cassandra-node-0) --name cassandra-client --entrypoint=cqlsh cassandra
```

---

* keyspace(database) 목록

```sql
> desc keyspaces;
```

* table 목록

```sql
> desc tables;
```

* data_center 확인

```sql
> USE system;

> SELECT data_center FROM local;
```

* 기본개념

  ```sql
  > CREATE TABLE test_keyspace.user ( 
      email text, 
      name text, 
      age int, 
      description text, 
      PRIMARY KEY (email, name)
    );
  ```

  partition key(row key): email

  cluster key: name
  
  `primary key`는 하나의 partition key와 0개 이상의 cluster key 정의

  `partition key` 해싱하여 저장될 노드 선택하여 row 저장, 각 노드별 토큰 범위가 할당되어 있음

  `partition key`로 선택된 노드에서 `cluster key`로 정렬되어 저장
  
