# API Portal Berita Sederhana

## Introduction
API ini terdiri dari 2 fitur yaitu fitur category dan news. Dalam API ini terdapat 2 role user yaitu role Admin dan role visitor. Role Admin memiliki hak akses untuk login dan logout, menambah data category dan data news, melihat data category dan data news, mengupdate data category dan data news, menghapus data category dan data news. Sedangkan untuk role visitor memiliki hak akses untuk login dan logout, melihat list news, melihat detail news dan melakukan search news berdasarkan title.

## Technology
Dalam pembuatan API ini menggunakan beberapa tech stack seperti :
* Node js
* Express js
* JWT
* MySql
* prisma ORM

## Documentation
### Route Login
### POST `/login`
Endpoint untuk mengelola user yang akan login ke sistem
### Pengujian
Jika user menginputkan email dan password yang sudah terdaftar seperti contoh dibawah, maka endpoint akan mengenerate sebuah token yang nantinya digunakan untuk membedakan user yang satu dengan lainnya. 
- **Request Body**
```json
{
    "email": "adhli212@gmail.com",
    "password": "password01"
}
```

- **Response**
```json
{
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJpYXQiOjE3MzAyNjE3MjYsImV4cCI6MTczMDI5MDUyNn0.UHl2CqFqTBCFAcL1QgmSNdNDw2ZFxPLCa4Do6huDDe4"
   "expiredAt": "2024-10-30T12:15:26.711Z"
}
```
<br>
Jika user menginputkan email atau password yang salah ataupun email dan password yang belum terdaftar, maka endpoint akan mengembalikkan pesan error <br>
<br>

- **Request Body**
```json
{
    "email": "adhli212@gmail.com",
    "password": "password02"
}
```

- **Response**
```json
{
    "message": "Email atau Password salah"
}
```
<br>

### Route Categories
### GET `/categories`
Endpoint ini digunakan untuk mengakses data categories
### Pengujian
Pada endpoint ini, membutuhkan token untuk authorization user. Token authorization diletakkan di bagian headers dengan key Authorization. Jika user yang login mempunyai role Admin, maka user tersebut dapat mengakses endpoint ini.
<br>
- **Request Headers**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJpYXQiOjE3MzAyODEyOTAsImV4cCI6MTczMDMxMDA5MH0.Tfmky7nWGBnSKywJY3B_WugbnljqR5vwaKaY4YPFVd4
```
- **Response**
```json
{
    "message": "Data Categories",
    "categories": [
        {
            "id": 1,
            "name": "Politics"
        },
        {
            "id": 2,
            "name": "Sports"
        },
        {
            "id": 4,
            "name": "Health"
        }
    ]
}
```
<br>
Jika user yang login mempunyai role visitor, maka endpoint akan mengembalikkan pesan error <br>
<br>

- **Request Header**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2LCJpYXQiOjE3MzAyODIxNDgsImV4cCI6MTczMDMxMDk0OH0.dd0V6_oHN7glqgNSDQ4YNTJVa11pEdNiKyDvXOTVldo
```

- **Response**
```json
{
    "message": "Forbidden"
}
```
<br>

### POST `/categories`
Endpoint ini digunakan untuk menambah data categories
### Pengujian
Pada endpoint ini, membutuhkan token untuk authorization user. Token authorization diletakkan di bagian headers dengan key Authorization. Jika user yang login mempunyai role Admin, maka user tersebut dapat mengakses endpoint ini.
<br>

- **Request Headers**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJpYXQiOjE3MzAyODEyOTAsImV4cCI6MTczMDMxMDA5MH0.Tfmky7nWGBnSKywJY3B_WugbnljqR5vwaKaY4YPFVd4
```

- **Response**
```json
{
   "message": "Created Data Successfully",
   "new_category": {
       "id": 5,
       "name": "Breaking News"
    }
}
```
<br>
Jika user yang login mempunyai role visitor, maka endpoint akan mengembalikkan pesan error <br>
<br>

- **Request Header**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2LCJpYXQiOjE3MzAyODIxNDgsImV4cCI6MTczMDMxMDk0OH0.dd0V6_oHN7glqgNSDQ4YNTJVa11pEdNiKyDvXOTVldo
```

- **Response**
```json
{
    "message": "Forbidden"
}
```
<br>