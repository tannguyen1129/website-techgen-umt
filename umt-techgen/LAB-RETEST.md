# Lab Retest

Muc tieu cua stack nay la tao mot moi truong lab tach biet de retest CVE ma khong anh huong production.

## Chay lab

```bash
cd /root/website-techgen-umt/umt-techgen
docker compose -f docker-compose.lab.yml up -d --build
```

## Dia chi lab

- Frontend qua Nginx lab: `http://localhost:8088`
- Frontend container truc tiep: `http://localhost:3300`
- Backend container truc tiep: `http://localhost:4400`

## Luu y

- Stack lab dung database rieng: `umt_techgen_lab_db`
- Nginx lab khong nap cac lop chan CVE trong production config
- Chi duoc dung trong may lab, khong expose Internet

## Dung lab

```bash
cd /root/website-techgen-umt/umt-techgen
docker compose -f docker-compose.lab.yml down
```
